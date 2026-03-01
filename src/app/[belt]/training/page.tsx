import Link from "next/link";
import { notFound } from "next/navigation";
import { beltSlugs, beltTracks, isBeltSlug } from "@/lib/belt-data";

interface BeltTrainingPageProps {
  params: Promise<{ belt: string }>;
}

export function generateStaticParams() {
  return beltSlugs.map((belt) => ({ belt }));
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

const blueToPurpleThirtyDayPlan = [
  {
    week: "Week 1 - Organize",
    items: ["Drill technique clusters in order.", "Write out positional blueprints."],
  },
  {
    week: "Week 2 - System Build",
    items: [
      "Positional sparring from required test positions.",
      "Light-resistance chaining.",
      "Half mock technique run.",
    ],
  },
  {
    week: "Week 3 - Integration",
    items: ["Full mock technique test.", "Two full show your game simulations.", "Before- and after-class rolls."],
  },
  {
    week: "Week 4 - Pressure",
    items: ["Two full mock tests.", "Three full positional chain simulations.", "Before- and after-class rolls."],
  },
];

export default async function BeltTrainingPage({ params }: BeltTrainingPageProps) {
  const resolvedParams = await params;
  if (!isBeltSlug(resolvedParams.belt)) {
    notFound();
  }

  const track = beltTracks[resolvedParams.belt];

  if (track.slug === "white-to-blue") {
    return (
      <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
        <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
          <nav className="px-1 text-sm">
            <div className="flex flex-wrap items-center gap-6" style={{ color: "var(--nav-text)" }}>
              <Link href="/white-to-blue" className="font-semibold text-[var(--foreground)] underline underline-offset-4">
                White to Blue
              </Link>
              <Link href="/blue-to-purple" className="font-semibold text-[var(--foreground)] hover:underline">
                Blue to Purple
              </Link>
              <Link href="/purple-to-brown" className="font-medium text-[var(--foreground)] hover:underline">
                Purple to Brown
              </Link>
            </div>
          </nav>

          <section
            className="rounded-2xl border p-6 md:p-7"
            style={{
              borderColor: "var(--border-1)",
              backgroundColor: "var(--surface-1)",
              boxShadow: "0 12px 30px rgba(37, 99, 235, 0.08)",
            }}
          >
            <h1 className="text-4xl font-bold leading-tight text-[var(--foreground)] md:text-6xl">Test Preparation Guide</h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--text-muted)]">
              Congratulations, you got <strong>&ldquo;the email&rdquo;</strong> (or your instructor told you)
              that it is time to prepare for your test. You already know the moves. This guide helps
              structure practice sessions so you can ease nerves and perform with control and composure.
            </p>
            <div className="mt-5">
              <Link
                href="/white-to-blue"
                className="inline-flex h-11 items-center justify-center rounded-full bg-blue-700 px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(29,78,216,0.45)] transition-colors hover:bg-blue-600"
              >
                Back to Curriculum
              </Link>
            </div>
          </section>

          <section
            className="rounded-xl border p-4"
            style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-subtle)]">On This Page</p>
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

            <div className="mt-5 rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]" style={{ borderLeftColor: "#2563eb" }}>
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
            <div className="mt-4 rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]" style={{ borderLeftColor: "#2563eb" }}>
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

  if (track.slug === "blue-to-purple") {
    return (
      <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
        <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
          <nav className="px-1 text-sm">
            <div className="flex flex-wrap items-center gap-6" style={{ color: "var(--nav-text)" }}>
              <Link href="/white-to-blue" className="font-medium text-[var(--foreground)] hover:underline">
                White to Blue
              </Link>
              <Link href="/blue-to-purple" className="font-semibold text-[var(--foreground)] underline underline-offset-4">
                Blue to Purple
              </Link>
              <Link href="/purple-to-brown" className="font-medium text-[var(--foreground)] hover:underline">
                Purple to Brown
              </Link>
            </div>
          </nav>

          <section
            className="rounded-2xl border p-6 md:p-7"
            style={{
              borderColor: "var(--border-1)",
              backgroundColor: "var(--surface-1)",
              boxShadow: "0 12px 30px rgba(109, 40, 217, 0.12)",
            }}
          >
            <h1 className="text-4xl font-bold leading-tight text-[var(--foreground)] md:text-6xl">Test Preparation Guide</h1>
            <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--text-muted)]">
              Congratulations, you got <strong>&ldquo;the email&rdquo;</strong> (or your instructor told you)
              that it is time to prepare for your test. This guide gives some tips to help you structure
              practice sessions to ease your nerves for test day.
            </p>
          </section>

          <section
            className="rounded-xl border p-4"
            style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-subtle)]">On This Page</p>
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
                href="#technique"
              >
                Technique
              </a>
              <a
                className="inline-flex h-8 items-center rounded-full border px-3 text-sm hover:brightness-110"
                style={{ borderColor: "var(--border-1)" }}
                href="#show-your-game"
              >
                Show Your Game
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
                Shark Tank
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
              The test is structured much like the White-to-Blue test: you will demonstrate proficiency in
              the same techniques, plus a few more advanced ones. In addition to the techniques, you will
              also be asked to <strong>show your game</strong>.
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
              At this point in your journey, the &ldquo;test&rdquo; is not about adding a few more moves.
              It is about showing how well you connect and apply them.
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">This test asks:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
              <li>Do you have a system?</li>
              <li>Can you transition with intention?</li>
              <li>Do you react appropriately?</li>
            </ul>
          </article>

          <article
            id="technique"
            className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
            style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
          >
            <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Technique Portion</h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
              The structure is similar to White-to-Blue, but expectations shift. At blue belt, you need to
              do the move at purple belt. You need to own the move. Be intentional, smooth, and detail-oriented.
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
              You will likely demonstrate all White-to-Blue techniques first, then move to the purple-belt additions.
            </p>
          </article>

          <article
            id="show-your-game"
            className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
            style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
          >
            <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">Show Your Game</h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
              This will happen after the technique section and is meant to show that you understand positional
              advancement, attacking sequences, and appropriate reactions to your opponent&rsquo;s movement.
              Demonstrate a clear game plan and execute it under pressure.
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
              You will be asked to show your game from specific positions and present your attack chains from each.
              Build a blueprint for Guard, Half Guard, Side Control, Mount, and Back Control as well as standing.
              Work with your uke so they can feed realistic reactions that let you demonstrate your system.
            </p>

            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">For every position, define:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
              <li>Primary attack</li>
              <li>Secondary attack</li>
              <li>Reaction if defended</li>
              <li>Transition to the next dominant position</li>
            </ul>

            <div className="mt-5 rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]" style={{ borderLeftColor: "#7c3aed" }}>
              This creates decision trees. <strong>You are not improvising.</strong> You are executing a system.
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">Example Structure</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <section
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border-1)", backgroundColor: "var(--panel-soft)" }}
              >
                <h4 className="text-lg font-semibold text-[var(--foreground)]">Closed Guard</h4>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--text-muted)] marker:text-purple-600">
                  <li>Primary choke (for example, cross collar).</li>
                  <li>Sweep if posture breaks (for example, scissor or flower).</li>
                  <li>Back take if they defend.</li>
                  <li>Open guard transition if stacked.</li>
                </ol>
              </section>
              <section
                className="rounded-xl border p-4"
                style={{ borderColor: "var(--border-1)", backgroundColor: "var(--panel-soft)" }}
              >
                <h4 className="text-lg font-semibold text-[var(--foreground)]">Cross Body</h4>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--text-muted)] marker:text-purple-600">
                  <li>Primary attack (for example, kimura).</li>
                  <li>Secondary option if they hide the arm (for example, americana).</li>
                  <li>Switch to the opposite side as needed.</li>
                  <li>Transition to mount.</li>
                </ol>
              </section>
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-[var(--foreground)]">How to Train Show Your Game</h3>
            <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">Twice per week (open mat helps):</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
              <li>Start in one required position.</li>
              <li>Roll only from that position.</li>
              <li>Exhaust your options.</li>
              <li>Reset and move to the next required position.</li>
              <li>Make notes on what is working for you.</li>
            </ul>
            <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">
              By week 3, run the full positional sequence in order.
            </p>
          </article>

          <article
            id="plan-30-day"
            className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
            style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
          >
            <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">30-Day Plan</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {blueToPurpleThirtyDayPlan.map((phase) => (
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
            <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
              You are not being evaluated here. This is to prove you can handle pressure and keep composure.
              It is not about winning.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-[var(--text-muted)] marker:text-purple-600">
              <li>No frantic scrambles.</li>
              <li>Defense first.</li>
              <li>Heavy top pressure when available.</li>
              <li>Intelligent guard recovery.</li>
              <li>Structure over strength.</li>
            </ul>
            <div className="mt-4 rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]" style={{ borderLeftColor: "#7c3aed" }}>
              <strong>Control your breathing.</strong>
            </div>
          </article>

          <div className="pb-2">
            <Link
              href="/blue-to-purple"
              className="inline-flex h-11 items-center justify-center rounded-full bg-purple-700 px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(126,34,206,0.45)] transition-colors hover:bg-purple-600"
            >
              Back to Curriculum
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header
          className="rounded-2xl border p-6 shadow-[0_0_60px_var(--glow-a)] backdrop-blur"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-subtle)]">Preparation</p>
          <h1 className="mt-1 text-3xl font-bold text-[var(--foreground)]">
            {track.label} Training Recommendations
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Use this page to structure weekly sessions and prepare for evaluation.
          </p>
          <Link
            href={`/${track.slug}`}
            className="mt-4 inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-semibold hover:brightness-110"
            style={{
              borderColor: "var(--button-secondary-border)",
              backgroundColor: "var(--button-secondary-bg)",
              color: "var(--button-secondary-text)",
            }}
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

