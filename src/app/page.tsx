import Link from "next/link";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { beltTrackList } from "@/lib/belt-data";

export default function Home() {
  const buttonGlowByTrack = {
    "white-to-blue": "0 0 24px rgba(29, 78, 216, 0.55)",
    "blue-to-purple": "0 0 24px rgba(126, 34, 206, 0.5)",
    "purple-to-brown": "0 0 24px rgba(113, 63, 18, 0.5)",
  } as const;

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
            <p className="text-sm font-semibold tracking-wide md:text-lg">BJJ Test Prep</p>
            <div className="flex items-center gap-4">
              <nav className="hidden gap-6 text-sm md:flex" style={{ color: "var(--nav-text)" }}>
                {beltTrackList.map((track) => (
                  <Link key={track.slug} href={`/${track.slug}`} className="hover:text-[var(--foreground)]">
                    {track.label}
                  </Link>
                ))}
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
            <div className="grid gap-3 sm:grid-cols-3">
              {beltTrackList.map((track) => (
                <Link
                  key={track.slug}
                  href={`/${track.slug}`}
                  className={`inline-flex h-11 items-center justify-center rounded-md px-4 text-sm font-semibold text-white transition-all hover:brightness-110 ${track.theme.accent}`}
                  style={{ boxShadow: buttonGlowByTrack[track.slug] }}
                >
                  {track.label}
                </Link>
              ))}
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              A community resource to help you prepare with clarity and intent. 
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
      </div>
    </main>
  );
}
