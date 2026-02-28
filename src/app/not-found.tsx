import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-stone-50 relative overflow-hidden">
      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-display text-[20rem] md:text-[35rem] text-zinc-900/[0.02] leading-none">
          迷
        </span>
      </div>

      {/* Red tick */}
      <div className="w-[3px] h-10 bg-red-600 mb-10" />

      {/* Kanji label */}
      <span className="font-mono text-[10px] text-red-600 uppercase tracking-[0.3em] mb-4">
        迷 — Lost
      </span>

      {/* 404 */}
      <h1 className="font-display text-7xl md:text-9xl font-light tracking-tighter text-zinc-900 mb-4">
        404
      </h1>

      <p className="text-zinc-400 text-sm mb-12 font-mono">
        This page does not exist.
      </p>

      <Link
        href="/"
        className="font-mono text-xs text-zinc-400 hover:text-red-600 transition-colors duration-300 underline underline-offset-4 decoration-zinc-300 hover:decoration-red-600 uppercase tracking-widest"
      >
        Return home
      </Link>
    </div>
  );
}
