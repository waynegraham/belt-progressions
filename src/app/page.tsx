import Link from "next/link";
import { beltTrackList } from "@/lib/belt-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#04070f] text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <header className="rounded-2xl border border-[#1d2d4a] bg-[#0a1322]/85 p-4 shadow-[0_0_60px_rgba(14,165,233,0.12)] backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-wide text-zinc-200 md:text-lg">
              BJJ PROGRESSIONS
            </p>
            <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
              <a href="#paths" className="hover:text-white">
                Belt Paths
              </a>
              <a href="#training" className="hover:text-white">
                Training Notes
              </a>
              <a href="#test-mode" className="hover:text-white">
                Test Mode
              </a>
            </nav>
          </div>
        </header>

        <section className="mt-6 grid gap-6 rounded-3xl border border-[#1d2d4a] bg-[#070f1d]/80 p-6 shadow-[0_0_80px_rgba(14,165,233,0.16)] md:grid-cols-2 md:p-8">
          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              The Roadmap to Your{" "}
              <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">
                Next Belt
              </span>
            </h1>
            <p className="max-w-xl text-base text-zinc-300 md:text-xl">
              Structured move progressions for each rank with built-in search, video review,
              test mode, and training recommendations.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#paths"
                className="inline-flex h-11 items-center justify-center rounded-md bg-sky-500 px-5 text-sm font-semibold text-white hover:bg-sky-400"
              >
                Choose Your Path
              </a>
              <a
                href="#test-mode"
                className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-500 bg-zinc-900/80 px-5 text-sm font-semibold text-zinc-100 hover:bg-zinc-800"
              >
                Watch Demo
              </a>
            </div>
            <p className="text-sm text-zinc-400">Used by athletes building promotion readiness.</p>
          </div>

          <div className="rounded-2xl border-2 border-sky-500 bg-[#09162b] p-3 shadow-[0_0_45px_rgba(14,165,233,0.55)]">
            <div
              role="img"
              aria-label="Brazilian Jiu Jitsu training partners drilling"
              className="h-full min-h-[260px] w-full rounded-xl bg-cover bg-center md:min-h-[420px]"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=1200&q=80')",
              }}
            />
          </div>
        </section>

        <section id="paths" className="mt-10 space-y-4">
          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Level Up Your{" "}
            <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">
              Jiu Jitsu
            </span>
          </h2>
          <p className="max-w-2xl text-lg text-zinc-300">
            Select your current path and progress through the curriculum for your next promotion.
          </p>
        </section>

        <section id="test-mode" className="mt-6 grid gap-4 md:grid-cols-3">
          {beltTrackList.map((track) => (
            <article
              key={track.slug}
              className="overflow-hidden rounded-2xl border border-[#1f2f4b] bg-[#0d1729]/85"
            >
              <div className={`h-7 w-full bg-gradient-to-r ${track.theme.trackBar}`} />
              <div className="p-5">
                <h2 className="text-3xl font-semibold">{track.label}</h2>
                <p className="mt-3 min-h-16 text-base text-zinc-300">{track.subtitle}</p>
                <div className="mt-5 flex gap-2">
                  <Link
                    href={`/${track.slug}`}
                    className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold text-white ${track.theme.accent}`}
                  >
                    Start Preparation
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section id="training" className="mt-10 rounded-2xl border border-[#1f2f4b] bg-[#0a1324]/80 p-6">
          <h3 className="text-2xl font-bold text-zinc-100">Training Notes Included</h3>
          <p className="mt-2 text-zinc-300">
            Every track includes a dedicated recommendations page and test mode for move recall
            under pressure.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {beltTrackList.map((track) => (
              <Link
                key={track.slug}
                href={`/${track.slug}/training`}
                className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-500 bg-zinc-900/60 px-4 text-sm font-semibold text-zinc-100 hover:bg-zinc-800"
              >
                {track.label} Notes
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
