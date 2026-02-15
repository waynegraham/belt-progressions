import Link from "next/link";
import { beltTrackList } from "@/lib/belt-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-slate-900 to-zinc-800 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-6 text-zinc-100">
          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
            BJJ Progressions
          </p>
          <h1 className="mt-1 text-3xl font-bold">Choose a Belt Path</h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-300">
            Each path includes move order tracking, search, YouTube video modal, test mode,
            and a dedicated training recommendation page.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {beltTrackList.map((track) => (
            <article
              key={track.slug}
              className="rounded-2xl border border-zinc-700 bg-zinc-900/60 p-5 text-zinc-100"
            >
              <h2 className="text-xl font-semibold">{track.label}</h2>
              <p className="mt-2 text-sm text-zinc-300">{track.subtitle}</p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/${track.slug}`}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-semibold text-zinc-900"
                >
                  Open Moves
                </Link>
                <Link
                  href={`/${track.slug}/training`}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-500 px-4 text-sm font-semibold text-zinc-100"
                >
                  Training
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
