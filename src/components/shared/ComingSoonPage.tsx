export function ComingSoonPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-24 text-zinc-100">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.035] p-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300">
          Coming Soon
        </p>
        <h1 className="mt-4 text-4xl font-bold text-white">{title}</h1>
        <p className="mt-4 text-zinc-300">{description}</p>
        <a
          href="/"
          aria-label="Back to New World Business Lab homepage"
          className="mt-8 inline-flex rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          Back to NWBL
        </a>
      </div>
    </main>
  );
}
