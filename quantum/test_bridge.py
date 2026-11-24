import unittest
from unittest.mock import Mock

from qiskit.providers.fake_provider import GenericBackendV2
from qiskit_ibm_runtime import SamplerV2

from quantum.bridge import CIRCUITS, WORKLOADS, circuit_request, read_job, simulate, submit


class QuantumBridgeTest(unittest.TestCase):
    def test_local_sampler_and_limits(self):
        self.assertEqual(set(CIRCUITS), set(WORKLOADS))
        result = simulate("bell-pair", 128)
        self.assertEqual(result["execution"], "local-simulation")
        self.assertEqual(sum(result["counts"].values()), 128)
        self.assertLessEqual(set(result["counts"]), {"00", "11"})
        for shots in (0, 4097):
            with self.assertRaises(ValueError):
                circuit_request("bell-pair", shots)

    def test_runtime_adapter_transpiles_and_reads_a_local_backend_job(self):
        backend = GenericBackendV2(2, seed=73, noise_info=False)
        jobs = []
        class LocalSampler:
            def __init__(self, mode):
                self.sampler = SamplerV2(mode=mode)
            def run(self, *args, **kwargs):
                job = self.sampler.run(*args, **kwargs)
                jobs.append(job)
                return job
        submission = submit("bell-pair", 64, backend, LocalSampler)
        self.assertEqual(submission["job_id"], jobs[0].job_id())
        jobs[0].result()
        result = read_job(jobs[0], True)
        self.assertEqual(result["shots"], 64)
        self.assertLessEqual(set(result["counts"]), {"00", "11"})

    def test_pending_status_does_not_wait_or_resubmit(self):
        job = Mock()
        job.job_id.return_value = "test-job"
        job.status.return_value = "QUEUED"
        self.assertNotIn("counts", read_job(job, True))
        job.result.assert_not_called()


if __name__ == "__main__":
    unittest.main()
