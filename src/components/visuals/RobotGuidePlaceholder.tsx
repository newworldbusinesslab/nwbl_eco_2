import { Bot } from "lucide-react";

export function RobotGuidePlaceholder() {
  return (
    <div className="fixed bottom-5 right-5 z-40 hidden rounded-3xl border border-cyan-300/25 bg-zinc-950/85 p-4 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.16)] backdrop-blur-xl md:block">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
          <Bot className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Robot Guide Slot</p>
          <p className="text-xs text-zinc-400">Future interactive Lab assistant.</p>
        </div>
      </div>
    </div>
  );
}
