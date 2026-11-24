# Extending New World Business Lab

The homepage, published detail routes, Puka’s directory, and cross-venture lessons read the same catalog. The original six scenes are in `src/data/tour.ts`.

## Add a business or feature

1. Add a card to the matching file in `src/data/catalog/`. Use a stable `id`, a plain-language description, visibility, and a status the team can substantiate. Use the ventures group and its separate `website` field for independent businesses. Add a group to `cardGroups` if the existing groups do not fit.
2. Give a public entry a unique local `route`. The catalog builds the card, detail page and Puka topic from it. Future entries are discoverable as previews and link back to their card. Internal entries stay out of visitor views.
3. Put reusable findings in `src/data/lessons.ts`. Record the source venture, receiving entries and a test. A verified record also requires the observed result and a public, approved evidence link. Keep client records in the project desk.

## Add motion to existing art

Add `video` to an asset in `src/data/visualSlots.ts` or `src/data/tour.ts`. Keep its existing `assetPath` as the poster. Put the approved clips and captions under `public/`.

```ts
{
  assetPath: "/images/hero/landing-opening.webp",
  video: [
    { src: "/motion/entrance.webm", type: "video/webm" },
    { src: "/motion/entrance.mp4", type: "video/mp4" },
  ],
  captions: "/motion/entrance.en.vtt",
}
```

The example paths represent future assets. Add captions for meaningful speech or sound. Video plays on request, uses native controls, and falls back to the still on failure. The walkthrough loads one scene at a time. Pausing, selecting a scene, leaving the viewport, or requesting reduced motion stops automatic advancement.

## Puka’s question path

`POST /api/guide` accepts `{"question":"How do I start?"}` and an optional previous topic ID. Replies include an answer, mode, and catalog links. Directory mode works without a model account. Configure the server-only variables `PUKA_API_KEY` and `PUKA_MODEL` to enable OpenAI Responses. The server sends the current question and relevant public topic descriptions. It sends no chat history or project-desk records. The page labels live and directory replies.

On Next.js, live requests are capped at ten per minute per running instance. Set a spending limit appropriate to the deployment. The Sites Worker uses its existing database for a shared daily limit of 60 live requests. A provider error or exhausted allowance returns the directory answer. Provider API details are in the [Responses API reference](https://developers.openai.com/api/reference/resources/responses/methods/create).

## Quantum workloads

The browser's Bell-pair example samples the ideal distribution locally. The operator CLI uses Qiskit to execute the circuit in a local statevector simulator or submit it to IBM hardware. AI applications can call the CLI as a subprocess and consume one JSON record. Hardware submissions run on the operator host. Use simulation to qualify a workload before deciding whether to spend device time.

```sh
python -m venv .venv
.venv/bin/python -m pip install -r quantum/requirements.txt
.venv/bin/python -m quantum.bridge simulate --workload bell-pair --shots 128
.venv/bin/python -m pip install 'qiskit-aer>=0.17,<1'  # Local IBM backend test dependency
.venv/bin/python -m unittest quantum.test_bridge
```

For hardware, supply `IBM_QUANTUM_API_KEY` and the instance CRN in `IBM_QUANTUM_INSTANCE` on the operator host. Specify the backend explicitly. The submit command uses SamplerV2 after transpiling to that backend. Keep the returned job ID. Check the IBM workload history after an ambiguous submission response before retrying.

```sh
.venv/bin/python -m quantum.bridge submit --backend BACKEND_NAME --shots 128
.venv/bin/python -m quantum.bridge status JOB_ID
.venv/bin/python -m quantum.bridge result JOB_ID
```

Register additional named workloads in `quantum/workloads.json` and implement the circuit factory in `quantum/bridge.py`. The current sampler expects a classical register named `meas`. Record a classical baseline and a comparison metric when adding a business application. IBM documents [account setup](https://quantum.cloud.ibm.com/docs/en/guides/initialize-account) and [sampling on a backend](https://quantum.cloud.ibm.com/docs/en/guides/migrate-from-sampler-to-executor).

## Verify a change

Run `npm ci`, `npm run test:lab`, `npm run build`, and `npm run typecheck`. The catalog tests cover references, posters, optional video, public guide context, and provider fallback. The Python tests cover both the local sampler and the IBM adapter against a local test backend.

## Keep Sites aligned

From a checkout of the reviewed GitHub branch, run `node scripts/sync-sites.mjs /path/to/nwbl-site`. Add `--check` to compare without copying. The script copies the tracked catalog, artwork, components, shared homepage, and guide implementation. The Sites checkout owns its intake routes, Worker adapter, database bindings, and hosting configuration. Build and test both targets before publishing.
