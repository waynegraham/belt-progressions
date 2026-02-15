"use client";

import { useMemo, useState } from "react";
import type { BeltMove, BeltTheme } from "@/lib/belt-data";

interface MoveTestModeProps {
  moves: BeltMove[];
  theme: BeltTheme;
}

export default function MoveTestMode({ moves, theme }: MoveTestModeProps) {
  const sortedMoves = useMemo(
    () => [...moves].sort((a, b) => a.order - b.order),
    [moves],
  );
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);

  if (sortedMoves.length === 0) {
    return (
      <section className={`rounded-xl border p-6 ${theme.cardBg} ${theme.border}`}>
        <h2 className={`text-xl font-semibold ${theme.text}`}>Test Mode</h2>
        <p className="mt-3 text-sm text-zinc-300">No moves available for this belt yet.</p>
      </section>
    );
  }

  const activeMove = sortedMoves[index];

  const handlePrev = () => {
    setReveal(false);
    setIndex((current) => (current === 0 ? sortedMoves.length - 1 : current - 1));
  };

  const handleNext = () => {
    setReveal(false);
    setIndex((current) => (current === sortedMoves.length - 1 ? 0 : current + 1));
  };

  const handleRandom = () => {
    if (sortedMoves.length < 2) {
      return;
    }
    let next = index;
    while (next === index) {
      next = Math.floor(Math.random() * sortedMoves.length);
    }
    setReveal(false);
    setIndex(next);
  };

  return (
    <section className={`rounded-xl border p-6 ${theme.cardBg} ${theme.border}`}>
      <div className="flex items-center justify-between gap-2">
        <h2 className={`text-xl font-semibold ${theme.text}`}>Test Mode</h2>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${theme.accentMuted}`}>
          {index + 1}/{sortedMoves.length}
        </span>
      </div>
      <p className="mt-3 text-sm text-zinc-300">
        Try recalling details before revealing the answer.
      </p>

      <div className={`mt-4 rounded-lg border bg-zinc-900/90 p-5 ${theme.border}`}>
        <p className="text-xs font-semibold tracking-wide text-zinc-400">Move Prompt</p>
        <p className="mt-2 text-lg font-semibold text-zinc-100">{activeMove.name}</p>

        {reveal ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-zinc-200">{activeMove.summary}</p>
            <div className="flex flex-wrap gap-2">
              {activeMove.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">Hidden until revealed.</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handlePrev}
          className="rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleRandom}
          className="rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
        >
          Random
        </button>
        <button
          type="button"
          onClick={() => setReveal((value) => !value)}
          className={`rounded-md px-3 py-2 text-sm font-medium text-white ${theme.accent}`}
        >
          {reveal ? "Hide Details" : "Reveal Details"}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800"
        >
          Next
        </button>
      </div>
    </section>
  );
}
