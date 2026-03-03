import Link from "next/link";
import TrackNav from "@/components/TrackNav";
import { blueToPurpleGuideContent } from "@/lib/training-guide-content";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface BlueToPurpleGuideProps {
  title: string;
  primaryTheme: TrackPrimaryTheme;
}

export default function BlueToPurpleGuide({ title, primaryTheme }: BlueToPurpleGuideProps) {
  const content = blueToPurpleGuideContent;

  return (
    <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
      <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
        <header className="space-y-4">
          <TrackNav activeSlug="blue-to-purple" activeClassName={primaryTheme.activeNavClass} />
        </header>

        <section
          className="rounded-2xl border p-6 md:p-7"
          style={{
            borderColor: "var(--border-1)",
            backgroundColor: "var(--surface-1)",
            boxShadow: "0 12px 30px rgba(109, 40, 217, 0.12)",
          }}
        >
          <h1
            className={`bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl ${primaryTheme.headingGradientClass}`}
          >
            Test Preparation Guide
          </h1>
          <p className={`mt-2 text-xl font-semibold tracking-tighter ${primaryTheme.textClass}`}>{title}</p>
          <p className="mt-3 max-w-3xl pb-4 text-base leading-8 text-[var(--text-muted)]">
            {content.heroIntro}
          </p>

          <div className="pb-2">
            <Link
              href="/blue-to-purple"
              className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-colors ${primaryTheme.buttonClass}`}
            >
              Back to Curriculum
            </Link>
          </div>
        </section>

        <section
          className="rounded-xl border p-4"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-subtle)]">
            On This Page
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {content.onPageLinks.map((link) => (
              <a
                key={link.href}
                className="inline-flex h-8 items-center rounded-full border px-3 text-sm hover:brightness-110"
                style={{ borderColor: "var(--border-1)" }}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <article
          id="overview"
          className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Overview</h2>
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
        </article>

        <article
          id="technique"
          className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Technique Portion</h2>
          {content.technique.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-8 text-[var(--text-muted)]">
              {paragraph}
            </p>
          ))}
        </article>

        <article
          id="show-your-game"
          className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Show Your Game</h2>
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

          <div
            className="mt-5 rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]"
            style={{ borderLeftColor: content.showYourGame.callout.accentColor }}
          >
            {content.showYourGame.callout.content}
          </div>

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
        </article>

        <article
          id="plan-30-day"
          className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">30-Day Plan</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {content.thirtyDayPlan.map((phase) => (
              <div
                key={phase.week}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border-1)", backgroundColor: "var(--panel-soft)" }}
              >
                <h3 className="text-xl font-semibold text-[var(--foreground)]">{phase.week}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)] marker:text-purple-600">
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article
          id="shark-tank"
          className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Shark Tank Strategy</h2>
          <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">{content.sharkTank.paragraph}</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
            {content.sharkTank.priorities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div
            className="mt-4 rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]"
            style={{ borderLeftColor: content.sharkTank.callout.accentColor }}
          >
            <strong>{content.sharkTank.callout.content}</strong>
          </div>
        </article>

        <div className="pb-2">
          <Link
            href="/blue-to-purple"
            className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-colors ${primaryTheme.buttonClass}`}
          >
            Back to Curriculum
          </Link>
        </div>
      </div>
    </main>
  );
}
