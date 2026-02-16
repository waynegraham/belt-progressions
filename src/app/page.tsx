import Link from "next/link";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { beltTrackList } from "@/lib/belt-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <header
          className="rounded-2xl border p-4 backdrop-blur"
          style={{
            borderColor: "var(--border-1)",
            backgroundColor: "var(--surface-1)",
            boxShadow: "0 0 60px var(--glow-a)",
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold tracking-wide md:text-lg">BJJ PROGRESSIONS</p>
            <div className="flex items-center gap-4">
              <nav className="hidden gap-6 text-sm md:flex" style={{ color: "var(--nav-text)" }}>
                <a href="#paths" className="hover:text-[var(--foreground)]">
                  Belt Paths
                </a>
                <a href="#training" className="hover:text-[var(--foreground)]">
                  Training Notes
                </a>
                <a href="#test-mode" className="hover:text-[var(--foreground)]">
                  Test Mode
                </a>
              </nav>
              <ThemeToggleButton />
            </div>
          </div>
        </header>

        <section
          className="mt-6 grid gap-6 rounded-3xl border p-6 md:grid-cols-2 md:p-8"
          style={{
            borderColor: "var(--border-1)",
            backgroundColor: "var(--surface-2)",
            boxShadow: "0 0 80px var(--glow-a)",
          }}
        >
          <div className="space-y-5">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Test Prep for Your{" "}
              <span className="belt-color-cycle">
                Next Belt
              </span>
            </h1>
            <p className="max-w-xl text-base md:text-xl" style={{ color: "var(--text-muted)" }}>
              A focused prep framework for what to drill, how to review, and how to train for
              your promotion test.
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
                className="inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold"
                style={{
                  borderColor: "var(--button-secondary-border)",
                  backgroundColor: "var(--button-secondary-bg)",
                  color: "var(--button-secondary-text)",
                }}
              >
                Watch Demo
              </a>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Built to help athletes prepare with clarity and intent.
            </p>
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
            Choose Your{" "}
            <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent">
              Test Prep Track
            </span>
          </h2>
          <p className="max-w-2xl text-lg" style={{ color: "var(--text-muted)" }}>
            Select your current belt and use this structure to guide drilling, study, and test-day
            readiness.
          </p>
        </section>

        <section id="test-mode" className="mt-6 grid gap-4 md:grid-cols-3">
          {beltTrackList.map((track) => (
            <article
              key={track.slug}
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
            >
              <div className={`h-7 w-full bg-gradient-to-r ${track.theme.trackBar}`} />
              <div className="p-5">
                <h2 className="text-3xl font-semibold">{track.label}</h2>
                <p className="mt-3 min-h-16 text-base" style={{ color: "var(--text-muted)" }}>
                  {track.subtitle}
                </p>
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

        <section
          id="training"
          className="mt-10 rounded-2xl border p-6"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <h3 className="text-2xl font-bold">Training Notes Included</h3>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            Every track includes a dedicated recommendations page and test mode for move recall
            under pressure.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {beltTrackList.map((track) => (
              <Link
                key={track.slug}
                href={`/${track.slug}/training`}
                className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold"
                style={{
                  borderColor: "var(--button-secondary-border)",
                  backgroundColor: "var(--button-secondary-bg)",
                  color: "var(--button-secondary-text)",
                }}
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
