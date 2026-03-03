import Link from "next/link";
import TrackNav from "@/components/TrackNav";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface WhiteToBlueGuideProps {
  title: string;
  primaryTheme: TrackPrimaryTheme;
}

const whiteToBlueThirtyDayPlan = [
  {
    week: "Week 1 - Organize",
    items: [
      "Watch videos to associate names with techniques.",
      "Drill techniques in order with the 3x session flow.",
      "Focus on slow, clean reps.",
      "Write down trouble points each session.",
      "Ask at least one technical question.",
    ],
  },
  {
    week: "Week 2 - Smoothness",
    items: [
      "Perform 10-15 techniques in sequence without stopping.",
      "Track repeated weak spots.",
      "Ask technical questions and refine details.",
    ],
  },
  {
    week: "Week 3 - Simulation",
    items: [
      "Run one mock test early in the week.",
      "Run one full mock test at the end of the week.",
      "Film and review if possible.",
      "Prioritize after-class rolls and open mat.",
    ],
  },
  {
    week: "Week 4 - Calm Rehearsal",
    items: [
      "Complete two full mock tests at controlled pace.",
      "Use live rolls for cardio and composure.",
      "Prioritize breathing and defensive discipline.",
    ],
  },
];

export default function WhiteToBlueGuide({ title, primaryTheme }: WhiteToBlueGuideProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
      <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
        <header className="space-y-4">
          <TrackNav activeSlug="white-to-blue" activeClassName={primaryTheme.activeNavClass} />
        </header>

        <section
          className="rounded-2xl border p-6 md:p-7"
          style={{
            borderColor: "var(--border-1)",
            backgroundColor: "var(--surface-1)",
            boxShadow: "0 12px 30px rgba(37, 99, 235, 0.08)",
          }}
        >
          <h1
            className={`bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl ${primaryTheme.headingGradientClass}`}
          >
            Test Preparation Guide
          </h1>
          <p className={`mt-2 text-xl font-semibold tracking-tighter ${primaryTheme.textClass}`}>{title}</p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--text-muted)]">
            Congratulations, you got <strong>&ldquo;the email&rdquo;</strong> (or your instructor told you)
            that it is time to prepare for your test. You already know the moves. This guide helps
            structure practice sessions so you can ease nerves and perform with control and composure.
          </p>
          <div className="mt-5">
            <Link
              href="/white-to-blue"
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
            <a
              className="inline-flex h-8 items-center rounded-full border px-3 text-sm hover:brightness-110"
              style={{ borderColor: "var(--border-1)" }}
              href="#overview"
            >
              Overview
            </a>
            <a
              className="inline-flex h-8 items-center rounded-full border px-3 text-sm hover:brightness-110"
              style={{ borderColor: "var(--border-1)" }}
              href="#plan-30-day"
            >
              30-Day Plan
            </a>
            <a
              className="inline-flex h-8 items-center rounded-full border px-3 text-sm hover:brightness-110"
              style={{ borderColor: "var(--border-1)" }}
              href="#shark-tank"
            >
              Shark Tank Strategy
            </a>
          </div>
        </section>

        <article
          id="overview"
          className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Overview</h2>
          <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            Almost everyone at this stage feels some imposter syndrome. This test is meant to show
            how much you have learned and that you can perform while being observed.
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            The test has two parts: technique and a shark tank. You are being evaluated on clean
            execution, order, control, and composure.
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            Select a uke who is close to your size, has completed this test, and can support your
            prep sessions and test-day logistics.
          </p>

          <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Common Mistakes</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
            <li>Rushing through techniques</li>
            <li>Skipping key positional moments</li>
          </ul>

          <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Training Structure</h3>
          <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">
            Train in the exact order of the list since the test follows this sequence. Repeating
            the order builds muscle memory.
          </p>

          <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Session Flow</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
            <li>Say the technique name out loud</li>
            <li>Perform it slowly (about 50% speed)</li>
            <li>Reset and repeat 3 times</li>
            <li>Move to the next technique</li>
            <li>Write down exactly what is giving you trouble</li>
          </ul>

          <div
            className="mt-5 rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]"
            style={{ borderLeftColor: "#2563eb" }}
          >
            <strong>Non-negotiable:</strong> After each session, bring specific questions to a higher
            belt or instructor so errors are corrected quickly.
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">What to Write Down</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
            <li>Where you hesitated</li>
            <li>What felt awkward</li>
            <li>Where you lose pressure</li>
            <li>Anything you consistently forget</li>
          </ul>

          <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">How to Ask Better Questions</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
            <li>Where should my weight be during this transition?</li>
            <li>Why do I lose my balance here?</li>
          </ul>

          <p className="mt-5 text-base leading-8 text-[var(--text-muted)]">
            This test is meant to be uplifting. Train slowly, reflect honestly, and keep it simple.
            Calm is confidence.
          </p>
        </article>

        <article
          id="plan-30-day"
          className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">30-Day Plan</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {whiteToBlueThirtyDayPlan.map((phase) => (
              <div
                key={phase.week}
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border-1)", backgroundColor: "var(--panel-soft)" }}
              >
                <h3 className="text-xl font-semibold text-[var(--foreground)]">{phase.week}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)] marker:text-blue-600">
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
          <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            After the technique portion, expect two 10-minute rounds with a new partner roughly every
            30 seconds. The goal is composure and defensive ability, not domination.
          </p>
          <div
            className="mt-4 rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]"
            style={{ borderLeftColor: "#2563eb" }}
          >
            <strong>You do not get a medal for not tapping.</strong>
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Priorities</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-blue-600">
            <li>Frames first</li>
            <li>Guard retention</li>
            <li>Inside position</li>
            <li>Grip discipline</li>
            <li>Controlled breathing</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
