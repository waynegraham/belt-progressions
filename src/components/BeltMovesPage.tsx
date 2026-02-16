"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import MoveTestMode from "@/components/MoveTestMode";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import type { BeltTrack } from "@/lib/belt-data";

interface BeltMovesPageProps {
  track: BeltTrack;
}

const primaryThemeByTrack = {
  "white-to-blue": {
    textClass: "text-blue-700",
    linkClass: "text-blue-700 hover:underline",
    activeNavClass: "font-semibold text-blue-700 underline underline-offset-4",
    buttonClass:
      "bg-blue-700 hover:bg-blue-600 shadow-[0_8px_22px_rgba(29,78,216,0.35)]",
  },
  "blue-to-purple": {
    textClass: "text-purple-700",
    linkClass: "text-purple-700 hover:underline",
    activeNavClass: "font-semibold text-purple-700 underline underline-offset-4",
    buttonClass:
      "bg-purple-700 hover:bg-purple-600 shadow-[0_8px_22px_rgba(126,34,206,0.35)]",
  },
  "purple-to-brown": {
    textClass: "text-amber-800",
    linkClass: "text-amber-800 hover:underline",
    activeNavClass: "font-semibold text-amber-800 underline underline-offset-4",
    buttonClass:
      "bg-amber-800 hover:bg-amber-700 shadow-[0_8px_22px_rgba(146,64,14,0.35)]",
  },
} as const;

export default function BeltMovesPage({ track }: BeltMovesPageProps) {
  const [query, setQuery] = useState("");
  const [testMode, setTestMode] = useState(false);
  const cleanedQuery = query.trim().toLowerCase();
  const primaryTheme = primaryThemeByTrack[track.slug];

  const allMoves = useMemo(() => [...track.moves].sort((a, b) => a.order - b.order), [track.moves]);

  const filteredMoves = useMemo(() => {
    if (!cleanedQuery) {
      return allMoves;
    }

    return allMoves.filter((move) => moveMatchesQuery(move.name, move.summary, move.tags, cleanedQuery));
  }, [allMoves, cleanedQuery]);

  const normalizedCategories = useMemo(() => {
    if (track.moveCategories?.length) {
      return track.moveCategories;
    }
    return [
      {
        id: "techniques",
        label: "Techniques",
        moves: allMoves,
      },
    ];
  }, [allMoves, track.moveCategories]);

  const filteredCategories = useMemo(
    () =>
      normalizedCategories
        .map((category) => ({
          ...category,
          moves: category.moves
            .filter((move) => moveMatchesQuery(move.name, move.summary, move.tags, cleanedQuery))
            .sort((a, b) => a.order - b.order),
        }))
        .filter((category) => category.moves.length > 0),
    [cleanedQuery, normalizedCategories],
  );

  return (
    <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
      <div className="mx-auto max-w-4xl space-y-5">
        <header className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <nav className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--nav-text)" }}>
              <TrackLink
                active={track.slug === "white-to-blue"}
                href="/white-to-blue"
                activeClassName={primaryTheme.activeNavClass}
              >
                White to Blue
              </TrackLink>
              <TrackLink
                active={track.slug === "blue-to-purple"}
                href="/blue-to-purple"
                activeClassName={primaryTheme.activeNavClass}
              >
                Blue to Purple
              </TrackLink>
              <TrackLink
                active={track.slug === "purple-to-brown"}
                href="/purple-to-brown"
                activeClassName={primaryTheme.activeNavClass}
              >
                Purple to Brown
              </TrackLink>
            </nav>
            <ThemeToggleButton />
          </div>

          <h1 className={`text-5xl font-bold leading-tight md:text-7xl ${primaryTheme.textClass}`}>
            {track.label} <span className="text-2xl align-middle md:text-3xl">Curriculum</span>
          </h1>

          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-subtle)]">Techniques</h2>
          <p className={`text-3xl font-semibold md:text-4xl ${primaryTheme.textClass}`}>
            {toRequirementTitle(track.label)}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setTestMode((value) => !value)}
              className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-white transition-colors ${primaryTheme.buttonClass}`}
            >
              {testMode ? "Exit Test Mode" : "Test Mode"}
            </button>
            <Link
              href={`/${track.slug}/training`}
              className="inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-medium hover:bg-slate-50"
              style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
            >
              Test Preparation Guide
            </Link>
          </div>
          <p className={`text-sm underline underline-offset-2 ${primaryTheme.textClass}`}>Reference</p>

          <label className="block max-w-2xl">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="w-full rounded-md border px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
              style={{
                borderColor: "var(--input-border)",
                backgroundColor: "var(--input-bg)",
                color: "var(--input-text)",
              }}
            />
          </label>
        </header>

        {testMode ? (
          <MoveTestMode moves={filteredMoves} theme={track.theme} />
        ) : filteredMoves.length === 0 ? (
          <section
            className="rounded-lg border border-dashed p-4 text-sm"
            style={{
              borderColor: "var(--input-border)",
              backgroundColor: "var(--panel-soft)",
              color: "var(--text-muted)",
            }}
          >
            No moves match that search.
          </section>
        ) : (
          <section className="space-y-5">
            {filteredCategories.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-24">
                <h3 id={category.id} className="text-3xl font-semibold">
                  {category.label}
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-base marker:text-[var(--foreground)]">
                  {category.moves.map((move) => (
                    <li key={move.id}>
                      <a
                        href={move.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`font-medium ${primaryTheme.linkClass}`}
                      >
                        {move.name}
                      </a>
                      {" - "}
                      <span style={{ color: "var(--text-muted)" }}>{move.summary}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

interface TrackLinkProps {
  active: boolean;
  href: string;
  activeClassName: string;
  children: React.ReactNode;
}

function TrackLink({ active, href, activeClassName, children }: TrackLinkProps) {
  return (
    <Link
      href={href}
      className={active ? activeClassName : "font-semibold hover:underline"}
    >
      {children}
    </Link>
  );
}

function toRequirementTitle(label: string): string {
  const [from, to] = label.split(" to ").map((part) => part.trim());
  if (!from || !to) {
    return `${label} Test Requirements`;
  }
  return `${to} Belt Test Requirements`;
}

function moveMatchesQuery(name: string, summary: string, tags: string[], query: string): boolean {
  if (!query) {
    return true;
  }

  const loweredTags = tags.join(" ").toLowerCase();
  return (
    name.toLowerCase().includes(query) ||
    summary.toLowerCase().includes(query) ||
    loweredTags.includes(query)
  );
}
