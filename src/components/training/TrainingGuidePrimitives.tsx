import Link from "next/link";
import type { ReactNode } from "react";
import TrackNav from "@/components/TrackNav";
import type { BeltSlug } from "@/lib/belt-data";
import type { GuideNavLink, GuidePhase } from "@/lib/training-guide-content";
import type { TrackPrimaryTheme } from "@/lib/track-ui";

interface TrainingPageFrameProps {
  activeSlug: BeltSlug;
  activeNavClassName: string;
  children: ReactNode;
}

export function TrainingPageFrame({ activeSlug, activeNavClassName, children }: TrainingPageFrameProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
      <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
        <header className="space-y-4">
          <TrackNav activeSlug={activeSlug} activeClassName={activeNavClassName} />
        </header>
        {children}
      </div>
    </main>
  );
}

interface TrainingHeroProps {
  title: string;
  intro: string;
  primaryTheme: TrackPrimaryTheme;
  backHref: string;
  backLabel: string;
  boxShadow: string;
  bodyPaddingClassName?: string;
}

export function TrainingHero({
  title,
  intro,
  primaryTheme,
  backHref,
  backLabel,
  boxShadow,
  bodyPaddingClassName = "mt-3 max-w-3xl text-base leading-8 text-[var(--text-muted)]",
}: TrainingHeroProps) {
  return (
    <section
      className="rounded-2xl border p-6 md:p-7"
      style={{
        borderColor: "var(--border-1)",
        backgroundColor: "var(--surface-1)",
        boxShadow,
      }}
    >
      <h1
        className={`bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl ${primaryTheme.headingGradientClass}`}
      >
        Test Preparation Guide
      </h1>
      <p className={`mt-2 text-xl font-semibold tracking-tighter ${primaryTheme.textClass}`}>{title}</p>
      <p className={bodyPaddingClassName}>{intro}</p>
      <div className="mt-5">
        <Link
          href={backHref}
          className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-colors ${primaryTheme.buttonClass}`}
        >
          {backLabel}
        </Link>
      </div>
    </section>
  );
}

interface OnThisPageLinksProps {
  links: GuideNavLink[];
}

export function OnThisPageLinks({ links }: OnThisPageLinksProps) {
  return (
    <section
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-subtle)]">On This Page</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((link) => (
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
  );
}

interface TrainingSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function TrainingSection({ id, title, children }: TrainingSectionProps) {
  return (
    <article
      id={id}
      className="scroll-mt-24 rounded-2xl border p-6 md:p-7"
      style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
    >
      <h2 className="text-4xl font-bold text-[var(--foreground)] md:text-5xl">{title}</h2>
      {children}
    </article>
  );
}

interface TrainingCalloutProps {
  text: string;
  accentColor: string;
  className?: string;
}

export function TrainingCallout({ text, accentColor, className = "mt-4" }: TrainingCalloutProps) {
  return (
    <div
      className={`${className} rounded-lg border-l-4 bg-[var(--panel-soft)] p-4 text-base text-[var(--text-muted)]`}
      style={{ borderLeftColor: accentColor }}
    >
      {text}
    </div>
  );
}

interface TrainingPlanGridProps {
  phases: GuidePhase[];
  markerClassName: string;
}

export function TrainingPlanGrid({ phases, markerClassName }: TrainingPlanGridProps) {
  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {phases.map((phase) => (
        <div
          key={phase.week}
          className="rounded-xl border p-4"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--panel-soft)" }}
        >
          <h3 className="text-xl font-semibold text-[var(--foreground)]">{phase.week}</h3>
          <ul className={`mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--text-muted)] ${markerClassName}`}>
            {phase.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
