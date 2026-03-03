"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MoveTestMode from "@/components/MoveTestMode";
import TrackNav from "@/components/TrackNav";
import { useVideoModal } from "@/hooks/useVideoModal";
import type { BeltTrack } from "@/lib/belt-data";
import { primaryThemeByTrack } from "@/lib/track-ui";

interface BeltMovesPageProps {
  track: BeltTrack;
}

const testModeCopyByTrack: Record<
  BeltTrack["slug"],
  { completionRankLabel: string; jumpLabel: string }
> = {
  "white-to-blue": { completionRankLabel: "blue", jumpLabel: "Jump to Purple" },
  "blue-to-purple": { completionRankLabel: "purple", jumpLabel: "Jump to Brown" },
  "purple-to-brown": { completionRankLabel: "brown", jumpLabel: "Jump Ahead" },
};

export default function BeltMovesPage({ track }: BeltMovesPageProps) {
  const [query, setQuery] = useState("");
  const [testMode, setTestMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPathname = pathname ?? `/${track.slug}`;
  const searchParamsString = searchParams?.toString() ?? "";
  const cleanedQuery = query.trim().toLowerCase();
  const primaryTheme = primaryThemeByTrack[track.slug];
  const testModeCopy = testModeCopyByTrack[track.slug];

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
  const { activeMove, activeEmbedUrl, closeVideoModal, openVideoModal, mainRef, dialogRef, closeButtonRef } =
    useVideoModal({
      allMoves,
      currentPathname,
      searchParams,
      searchParamsString,
      router,
    });

  return (
    <>
      <main ref={mainRef} className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
        <div className="mx-auto max-w-4xl space-y-5">
          <header className="space-y-4">
            <TrackNav activeSlug={track.slug} activeClassName={primaryTheme.activeNavClass} />

            <h1
              className={`bg-clip-text text-7xl font-extrabold leading-tight text-transparent md:text-7xl print:bg-none print:text-black ${primaryTheme.headingGradientClass}`}
            >
              {track.label} 
            </h1>

            {/* <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-subtle)]">Curriculum Techniques</h2> */}
            <p className={`inline-block mb-8 text-2xl font-semibold tracking-tighter ${primaryTheme.textClass}`}>
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
            <p>
              <a target="_blank" rel="nofollow" href="https://waynegraham.github.io/bjj-study-guide/gracie-jiu-jitsu_compress.pdf" className={`text-sm underline underline-offset-2 ${primaryTheme.textClass}`}>Reference</a>
            </p>
            <label className="block">
              <span className="sr-only">Search techniques</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search"
                aria-label="Search techniques"
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
            <MoveTestMode
              moves={allMoves}
              theme={track.theme}
              completionRankLabel={testModeCopy.completionRankLabel}
              jumpLabel={testModeCopy.jumpLabel}
              onExit={() => setTestMode(false)}
            />
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
                  <h3 className="my-3 text-xl print:my-0 text-gray-900 dark:text-gray-300">
                    {category.label}
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-base marker:text-[var(--foreground)]">
                    {category.moves.map((move) => (
                      <li key={move.id}>
                        <a
                          href={`${currentPathname}?video=${move.id}`}
                          onClick={(event) => {
                            event.preventDefault();
                            openVideoModal(move.id);
                          }}
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

      {activeMove ? (
        <div className="fixed inset-0 z-50 bg-black/70 p-0 md:p-6" onClick={closeVideoModal}>
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeMove.name} video`}
            onClick={(event) => event.stopPropagation()}
            className="mx-auto flex h-full w-full flex-col bg-black md:h-auto md:max-w-5xl md:rounded-xl"
          >
            <div className="flex items-center justify-between px-4 py-3 text-white">
              <p className="truncate pr-4 text-sm font-semibold md:text-base">{activeMove.name}</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeVideoModal}
                className="rounded border border-white/40 px-3 py-1 text-sm hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="flex-1">
              {activeEmbedUrl ? (
                <iframe
                  src={activeEmbedUrl}
                  title={activeMove.name}
                  className="h-full w-full md:aspect-video md:h-auto"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-white md:min-h-[360px]">
                  <div>
                    <p>Unable to embed this video.</p>
                    <a href={activeMove.youtubeUrl} target="_blank" rel="noreferrer" className="underline">
                      Open on YouTube
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
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
