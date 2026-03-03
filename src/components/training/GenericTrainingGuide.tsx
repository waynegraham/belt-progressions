import Link from "next/link";
import TrackNav from "@/components/TrackNav";
import type { BeltTrack } from "@/lib/belt-data";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface GenericTrainingGuideProps {
  track: BeltTrack;
  title: string;
  primaryTheme: TrackPrimaryTheme;
}

export default function GenericTrainingGuide({ track, title, primaryTheme }: GenericTrainingGuideProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="space-y-4">
          <TrackNav activeSlug={track.slug} activeClassName={primaryTheme.activeNavClass} />
        </header>
        <header
          className="rounded-2xl border p-6 shadow-[0_0_60px_var(--glow-a)] backdrop-blur"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-subtle)]">Preparation</p>
          <h1
            className={`mt-1 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl ${primaryTheme.headingGradientClass}`}
          >
            Test Preparation Guide
          </h1>
          <p className={`mt-2 text-xl font-semibold tracking-tighter ${primaryTheme.textClass}`}>{title}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Use this page to structure weekly sessions and prepare for evaluation.
          </p>
          <Link
            href={`/${track.slug}`}
            className={`mt-4 inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold text-white transition-colors ${primaryTheme.buttonClass}`}
          >
            Back to Move List
          </Link>
        </header>

        <section
          className="rounded-2xl border p-4 backdrop-blur md:p-6"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <ul className="space-y-4">
            {track.trainingRecommendations.map((recommendation) => (
              <li
                key={recommendation.title}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel-strong)" }}
              >
                <h2 className="text-xl font-semibold text-[var(--foreground)]">{recommendation.title}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
                  {recommendation.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
