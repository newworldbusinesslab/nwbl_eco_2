"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
const Panel = dynamic(() => import("./GuidePanel").then(module => module.GuidePanel), {
  loading: () => <p role="status">Opening the guide…</p>,
});

export function GuideLauncher({ stops }: { stops: { title: string; href: string }[] }) {
  const path = usePathname()?.replace(/\/$/, "");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [opened, setOpened] = useState(false);
  if (["/guide", "/admin", "/start"].includes(path)) return null;
  return <>
    <button ref={trigger} type="button" aria-haspopup="dialog" onClick={() => { setOpened(true); dialog.current?.showModal(); }}
      className="fixed bottom-4 right-4 z-40 rounded-full border border-cyan-300/50 bg-zinc-950 px-5 py-3 font-semibold text-cyan-200 shadow-xl">
      Ask Puka
    </button>
    <dialog ref={dialog} aria-labelledby="puka-title" onClose={() => trigger.current?.focus({ preventScroll: true })}
      onClick={event => { if (event.target instanceof Element && event.target.closest("a[href]")) dialog.current?.close(); }}
      className="m-auto max-h-[85dvh] w-[min(92vw,29rem)] overflow-y-auto rounded-2xl border border-cyan-300/35 bg-zinc-950 p-5 text-zinc-100 backdrop:bg-black/70">
      <header className="mb-4 flex items-center justify-between gap-3">
        <h2 id="puka-title" className="text-xl font-bold">Puka · Lab guide</h2>
        <button type="button" onClick={() => dialog.current?.close()} className="rounded-lg border border-white/20 px-3 py-2">Close</button>
      </header>
      {opened && <Panel stops={stops} />}
    </dialog>
  </>;
}
