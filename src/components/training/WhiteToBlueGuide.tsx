import {
  OnThisPageLinks,
  TrainingCallout,
  TrainingHero,
  TrainingPageFrame,
  TrainingPlanGrid,
  TrainingSection,
} from "@/components/training/TrainingGuidePrimitives";
import { whiteToBlueGuideContent } from "@/lib/training-guide-content";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface WhiteToBlueGuideProps {
  title: string;
  primaryTheme: TrackPrimaryTheme;
}

export default function WhiteToBlueGuide({ title, primaryTheme }: WhiteToBlueGuideProps) {
  const content = whiteToBlueGuideContent;

  return (
    <TrainingPageFrame activeSlug="white-to-blue" activeNavClassName={primaryTheme.activeNavClass}>
      <TrainingHero
        title={title}
        intro={content.heroIntro}
        primaryTheme={primaryTheme}
        backHref="/white-to-blue"
        backLabel="Back to Curriculum"
        boxShadow="0 12px 30px rgba(37, 99, 235, 0.08)"
      />

      <OnThisPageLinks links={content.onPageLinks} />

      <TrainingSection id="overview" title="Overview">
        {content.overview.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            {paragraph}
          </p>
        ))}

        <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Common Mistakes</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
          {content.overview.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Training Structure</h3>
        <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{content.overview.trainingStructure}</p>

        <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Session Flow</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
          {content.overview.sessionFlow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <TrainingCallout
          className="mt-5"
          accentColor={content.overview.nonNegotiable.accentColor}
          text={content.overview.nonNegotiable.content}
        />

        <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">What to Write Down</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
          {content.overview.writeDown.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">How to Ask Better Questions</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
          {content.overview.betterQuestions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="mt-5 text-base leading-8 text-[var(--text-muted)]">{content.overview.closing}</p>
      </TrainingSection>

      <TrainingSection id="plan-30-day" title="30-Day Plan">
        <TrainingPlanGrid phases={content.thirtyDayPlan} markerClassName="marker:text-blue-600" />
      </TrainingSection>

      <TrainingSection id="shark-tank" title="Shark Tank Strategy">
        <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">{content.sharkTank.paragraph}</p>
        <TrainingCallout
          accentColor={content.sharkTank.callout.accentColor}
          text={content.sharkTank.callout.content}
        />
        <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Priorities</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
          {content.sharkTank.priorities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TrainingSection>
    </TrainingPageFrame>
  );
}
