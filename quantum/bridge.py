"""Operator-side quantum workloads. Each command emits one JSON record."""
import argparse
import json
import os
import sys
from pathlib import Path

from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler
from qiskit.transpiler import generate_preset_pass_manager

WORKLOADS = json.loads(Path(__file__).with_name("workloads.json").read_text())


class BridgeInputError(ValueError):
    """A validation message safe to return to the caller."""


def bell_pair():
    circuit = QuantumCircuit(2)
    circuit.h(0)
    circuit.cx(0, 1)
    circuit.measure_all()
    return circuit


CIRCUITS = {"bell-pair": bell_pair}


def circuit_request(name, shots):
    spec = WORKLOADS[name]
    shots = spec["defaultShots"] if shots is None else shots
    if not 1 <= shots <= spec["maxShots"]:
        raise BridgeInputError(f"Shots must be within 1 and {spec['maxShots']}.")
    return CIRCUITS[name](), shots


def simulate(name, shots):
    circuit, shots = circuit_request(name, shots)
    counts = StatevectorSampler().run([circuit], shots=shots).result()[0].data.meas.get_counts()
    return {"execution": "local-simulation", "workload": name, "shots": shots, "counts": counts}


def ibm_service():
    from qiskit_ibm_runtime import QiskitRuntimeService

    token = os.environ.get("IBM_QUANTUM_API_KEY")
    instance = os.environ.get("IBM_QUANTUM_INSTANCE")
    if not token or not instance:
        raise BridgeInputError("Configure IBM_QUANTUM_API_KEY and IBM_QUANTUM_INSTANCE on the operator host.")
    return QiskitRuntimeService(channel="ibm_quantum_platform", token=token, instance=instance)


def submit(name, shots, backend, sampler_factory):
    circuit, shots = circuit_request(name, shots)
    isa_circuit = generate_preset_pass_manager(backend=backend, optimization_level=1).run(circuit)
    job = sampler_factory(mode=backend).run([isa_circuit], shots=shots)
    return {"execution": "ibm-qpu", "backend": backend.name, "workload": name,
            "shots": shots, "job_id": job.job_id(), "status": "submitted"}


def read_job(job, include_result):
    status = job.status()
    state = getattr(status, "name", str(status))
    info = {"execution": "ibm-qpu", "job_id": job.job_id(), "status": state}
    if include_result and state.upper() == "DONE":
        counts = job.result()[0].data.meas.get_counts()
        info.update(counts=counts, shots=sum(counts.values()))
    return info


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="action", required=True)
    for name in ("simulate", "submit"):
        cmd = commands.add_parser(name)
        cmd.add_argument("--workload", choices=sorted(CIRCUITS), default="bell-pair")
        cmd.add_argument("--shots", type=int)
        if name == "submit":
            cmd.add_argument("--backend", required=True, help="IBM QPU name")
    for name in ("status", "result"):
        commands.add_parser(name).add_argument("job_id")
    args = parser.parse_args()
    try:
        if args.action == "simulate":
            record = simulate(args.workload, args.shots)
        elif args.action == "submit":
            from qiskit_ibm_runtime import SamplerV2
            circuit_request(args.workload, args.shots)
            backend = ibm_service().backend(args.backend)
            if backend.configuration().simulator:
                raise BridgeInputError("Select an IBM hardware backend for submit.")
            record = submit(args.workload, args.shots, backend, SamplerV2)
        else:
            record = read_job(ibm_service().job(args.job_id), args.action == "result")
    except BridgeInputError as error:
        record = {"error": str(error)}
        print(json.dumps(record), file=sys.stderr)
        return 1
    except Exception as error:
        print(json.dumps({"error": type(error).__name__, "action": args.action,
                          "detail": "Check the IBM instance and workload history before retrying."}), file=sys.stderr)
        return 1
    print(json.dumps(record, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
