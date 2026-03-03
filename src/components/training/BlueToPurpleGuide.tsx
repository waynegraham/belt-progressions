import Link from "next/link";
import {
  OnThisPageLinks,
  TrainingCallout,
  TrainingHero,
  TrainingPageFrame,
  TrainingPlanGrid,
  TrainingSection,
} from "@/components/training/TrainingGuidePrimitives";
import { blueToPurpleGuideContent } from "@/lib/training-guide-content";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface BlueToPurpleGuideProps {
  title: string;
  primaryTheme: TrackPrimaryTheme;
}

export default function BlueToPurpleGuide({ title, primaryTheme }: BlueToPurpleGuideProps) {
  const content = blueToPurpleGuideContent;

  return (
    <TrainingPageFrame activeSlug="blue-to-purple" activeNavClassName={primaryTheme.activeNavClass}>
      <TrainingHero
        title={title}
        intro={content.heroIntro}
        primaryTheme={primaryTheme}
        backHref="/blue-to-purple"
        backLabel="Back to Curriculum"
        boxShadow="0 12px 30px rgba(109, 40, 217, 0.12)"
        bodyPaddingClassName="mt-3 max-w-3xl pb-4 text-base leading-8 text-[var(--text-muted)]"
      />

      <OnThisPageLinks links={content.onPageLinks} />

      <TrainingSection id="overview" title="Overview">
        {content.overview.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            {paragraph}
          </p>
        ))}
        <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">This test asks:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
          {content.overview.asks.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TrainingSection>

      <TrainingSection id="technique" title="Technique Portion">
        {content.technique.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            {paragraph}
          </p>
        ))}
      </TrainingSection>

      <TrainingSection id="show-your-game" title="Show Your Game">
        {content.showYourGame.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            {paragraph}
          </p>
        ))}

        <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">For every position, define:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
          {content.showYourGame.defineForEveryPosition.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <TrainingCallout accentColor={content.showYourGame.callout.accentColor} text={content.showYourGame.callout.content} className="mt-5" />

        <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Example Structure</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {content.showYourGame.exampleStructure.map((position) => (
            <section
              key={position.title}
              className="rounded-xl border p-4"
              style={{ borderColor: "var(--border-1)", backgroundColor: "var(--panel-soft)" }}
            >
              <h4 className="text-lg font-semibold text-[var(--foreground)]">{position.title}</h4>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--text-muted)] marker:text-purple-600">
                {position.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">How to Train Show Your Game</h3>
        <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{content.showYourGame.trainingLead}</p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
          {content.showYourGame.trainingSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">{content.showYourGame.trainingClosing}</p>
      </TrainingSection>

      <TrainingSection id="plan-30-day" title="30-Day Plan">
        <TrainingPlanGrid phases={content.thirtyDayPlan} markerClassName="marker:text-purple-600" />
      </TrainingSection>

      <TrainingSection id="shark-tank" title="Shark Tank Strategy">
        <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">{content.sharkTank.paragraph}</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
          {content.sharkTank.priorities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <TrainingCallout
          accentColor={content.sharkTank.callout.accentColor}
          text={content.sharkTank.callout.content}
        />
      </TrainingSection>

      <div className="pb-2">
        <Link
          href="/blue-to-purple"
          className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-colors ${primaryTheme.buttonClass}`}
        >
          Back to Curriculum
        </Link>
      </div>
    </TrainingPageFrame>
  );
}
