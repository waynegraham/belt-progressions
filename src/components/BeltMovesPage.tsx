"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import MoveTestMode from "@/components/MoveTestMode";
import type { BeltTrack } from "@/lib/belt-data";

interface BeltMovesPageProps {
  track: BeltTrack;
}

export default function BeltMovesPage({ track }: BeltMovesPageProps) {
  const [query, setQuery] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [testMode, setTestMode] = useState(false);

  const filteredMoves = useMemo(() => {
    const cleaned = query.trim().toLowerCase();
    const allMoves = [...track.moves].sort((a, b) => a.order - b.order);

    if (!cleaned) {
      return allMoves;
    }

    return allMoves.filter((move) => {
      const tags = move.tags.join(" ").toLowerCase();
      return (
        move.name.toLowerCase().includes(cleaned) ||
        move.summary.toLowerCase().includes(cleaned) ||
        tags.includes(cleaned)
      );
    });
  }, [query, track.moves]);

  return (
    <main className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header
          className="rounded-2xl border p-6 shadow-[0_0_60px_var(--glow-a)] backdrop-blur"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[var(--muted-subtle)]">
                Belt Track
              </p>
              <h1 className="text-3xl font-bold text-[var(--foreground)]">{track.label}</h1>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{track.subtitle}</p>
            </div>
            <Link
              href={`/${track.slug}/training`}
              className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-semibold text-white transition-colors ${track.theme.accent}`}
            >
              Training Recommendations
            </Link>
          </div>
        </header>

        <section
          className="rounded-2xl border p-4 backdrop-blur"
          style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="w-full md:max-w-md">
              <span className="mb-2 block text-sm font-medium text-[var(--text-muted)]">Search moves</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, summary, or tag"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none ring-sky-400 focus:ring"
                style={{
                  borderColor: "var(--input-border)",
                  backgroundColor: "var(--input-bg)",
                  color: "var(--input-text)",
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => setTestMode((value) => !value)}
              className={`h-10 rounded-md px-4 text-sm font-semibold text-white transition-colors ${track.theme.accent}`}
            >
              {testMode ? "Exit Test Mode" : "Enter Test Mode"}
            </button>
          </div>
        </section>

        {testMode ? (
          <MoveTestMode moves={filteredMoves} theme={track.theme} />
        ) : (
          <section
            className="rounded-2xl border p-4 backdrop-blur"
            style={{ borderColor: "var(--border-1)", backgroundColor: "var(--surface-1)" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Moves</h2>
              <span className="text-sm text-[var(--muted-subtle)]">
                Showing {filteredMoves.length} of {track.moves.length}
              </span>
            </div>

            {filteredMoves.length === 0 ? (
              <p
                className="rounded-lg border border-dashed p-4 text-sm"
                style={{
                  borderColor: "var(--input-border)",
                  backgroundColor: "var(--panel-soft)",
                  color: "var(--text-muted)",
                }}
              >
                No moves match that search.
              </p>
            ) : (
              <ul className="space-y-3">
                {filteredMoves.map((move) => (
                  <li
                    key={move.id}
                    className="rounded-lg border p-4"
                    style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel-strong)" }}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-subtle)]">
                          #{move.order}
                        </p>
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">{move.name}</h3>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">{move.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {move.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${track.theme.accentMuted}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setVideoUrl(move.youtubeUrl)}
                        className={`inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-semibold text-white transition-colors ${track.theme.accent}`}
                      >
                        Watch Video
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>

      {videoUrl ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "var(--overlay)" }}>
          <div
            className="w-full max-w-3xl rounded-xl border p-4 shadow-2xl"
            style={{ borderColor: "var(--panel-border)", backgroundColor: "var(--panel-strong)" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">YouTube Demo</h2>
              <button
                type="button"
                onClick={() => setVideoUrl(null)}
                className="rounded-md border px-3 py-1.5 text-sm font-medium hover:brightness-110"
                style={{
                  borderColor: "var(--button-secondary-border)",
                  backgroundColor: "var(--button-secondary-bg)",
                  color: "var(--button-secondary-text)",
                }}
              >
                Close
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-lg border" style={{ borderColor: "var(--panel-border)" }}>
              <iframe
                className="h-full w-full"
                src={toEmbedUrl(videoUrl)}
                title="Move video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function toEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }
    const id = parsed.searchParams.get("v");
    if (id) {
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return url;
  }
  return url;
}
