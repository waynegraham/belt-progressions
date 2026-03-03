import Link from "next/link";
import {
  TrainingPageFrame,
  TrainingSection,
} from "@/components/training/TrainingGuidePrimitives";
import type { BeltTrack } from "@/lib/belt-data";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface GenericTrainingGuideProps {
  track: BeltTrack;
  title: string;
  primaryTheme: TrackPrimaryTheme;
}

export default function GenericTrainingGuide({ track, title, primaryTheme }: GenericTrainingGuideProps) {
  return (
    <TrainingPageFrame activeSlug={track.slug} activeNavClassName={primaryTheme.activeNavClass}>
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

      <TrainingSection id="recommendations" title="Training Recommendations">
        <ul className="mt-5 space-y-4">
          {track.trainingRecommendations.map((recommendation) => (
            <li
              key={recommendation.title}
              className="rounded-xl border p-5"
              style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel-strong)" }}
            >
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{recommendation.title}</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)]">
                {recommendation.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </TrainingSection>
    </TrainingPageFrame>
  );
}
