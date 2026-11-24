import { answerGuide } from "@/lib/guide-server";

// Each application instance has a bounded allowance. Set a project budget on the model account.
let windowStart = 0;
let used = 0;
async function allowLive() {
  if (Date.now() - windowStart >= 60_000) { windowStart = Date.now(); used = 0; }
  if (used >= 10) return false;
  used += 1;
  return true;
}

export function POST(request: Request) {
  return answerGuide(request, { PUKA_API_KEY: process.env.PUKA_API_KEY, PUKA_MODEL: process.env.PUKA_MODEL }, allowLive);
}
