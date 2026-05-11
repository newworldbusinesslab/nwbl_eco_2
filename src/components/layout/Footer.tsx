export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-zinc-500">
      <p>Built from the ground up with cutting-edge AI by New World Business Lab.</p>

      <nav
        className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs"
        aria-label="Footer navigation"
      >
        <a className="hover:text-cyan-200" href="/privacy">
          Privacy
        </a>
        <a className="hover:text-cyan-200" href="/terms">
          Terms
        </a>
        <a className="hover:text-cyan-200" href="/disclaimer">
          Disclaimer
        </a>
        <a className="hover:text-cyan-200" href="/accessibility">
          Accessibility
        </a>
      </nav>
    </footer>
  );
}
