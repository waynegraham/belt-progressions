"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BeltMovesHeader from "@/components/belt/BeltMovesHeader";
import MoveCategoryList from "@/components/belt/MoveCategoryList";
import VideoModal from "@/components/belt/VideoModal";
import MoveTestMode from "@/components/MoveTestMode";
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
  "blue-to-purple": {
    completionRankLabel: "purple",
    jumpLabel: "Jump to Brown",
  },
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

  const allMoves = useMemo(
    () => [...track.moves].sort((a, b) => a.order - b.order),
    [track.moves],
  );

  const filteredMoves = useMemo(() => {
    if (!cleanedQuery) {
      return allMoves;
    }

    return allMoves.filter((move) =>
      moveMatchesQuery(move.name, move.summary, move.tags, cleanedQuery),
    );
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
            .filter((move) =>
              moveMatchesQuery(
                move.name,
                move.summary,
                move.tags,
                cleanedQuery,
              ),
            )
            .sort((a, b) => a.order - b.order),
        }))
        .filter((category) => category.moves.length > 0),
    [cleanedQuery, normalizedCategories],
  );
  const {
    activeMove,
    activeEmbedUrl,
    closeVideoModal,
    openVideoModal,
    mainRef,
    dialogRef,
    closeButtonRef,
  } = useVideoModal({
    allMoves,
    currentPathname,
    searchParams,
    searchParamsString,
    router,
  });

  return (
    <>
      <main
        ref={mainRef}
        className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8"
      >
        <div className="mx-auto max-w-4xl space-y-5">
          <BeltMovesHeader
            track={track}
            primaryTheme={primaryTheme}
            query={query}
            onQueryChange={setQuery}
            testMode={testMode}
            onToggleTestMode={() => setTestMode((value) => !value)}
          />

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
            <MoveCategoryList
              categories={filteredCategories}
              currentPathname={currentPathname}
              linkClassName={primaryTheme.linkClass}
              onOpenVideo={openVideoModal}
            />
          )}
        </div>
      </main>

      <VideoModal
        activeMove={activeMove}
        activeEmbedUrl={activeEmbedUrl}
        onClose={closeVideoModal}
        dialogRef={dialogRef}
        closeButtonRef={closeButtonRef}
      />
    </>
  );
}

function moveMatchesQuery(
  name: string,
  summary: string,
  tags: string[],
  query: string,
): boolean {
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
