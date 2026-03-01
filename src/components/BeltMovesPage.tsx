"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPathname = pathname ?? `/${track.slug}`;
  const searchParamsString = searchParams?.toString() ?? "";
  const cleanedQuery = query.trim().toLowerCase();
  const primaryTheme = primaryThemeByTrack[track.slug];
  const mainRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

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
  const activeVideoIdFromUrl = searchParams?.get("video") ?? null;
  const activeMove = useMemo(() => {
    if (!activeVideoIdFromUrl) {
      return null;
    }
    return allMoves.find((move) => move.id === activeVideoIdFromUrl) ?? null;
  }, [activeVideoIdFromUrl, allMoves]);

  const activeEmbedUrl = useMemo(() => {
    if (!activeMove) {
      return null;
    }
    return toYouTubeEmbedUrl(activeMove.youtubeUrl);
  }, [activeMove]);

  const closeVideoModal = useCallback(() => {
    const nextParams = new URLSearchParams(searchParamsString);
    nextParams.delete("video");
    const nextQuery = nextParams.toString();
    const nextUrl = nextQuery ? `${currentPathname}?${nextQuery}` : currentPathname;
    router.replace(nextUrl, { scroll: false });
  }, [currentPathname, router, searchParamsString]);

  const openVideoModal = useCallback(
    (videoId: string) => {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        lastFocusedElementRef.current = activeElement;
      }
      const nextParams = new URLSearchParams(searchParamsString);
      nextParams.set("video", videoId);
      router.push(`${currentPathname}?${nextParams.toString()}`, { scroll: false });
    },
    [currentPathname, router, searchParamsString],
  );

  useEffect(() => {
    if (!activeMove) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeMove]);

  useEffect(() => {
    if (!activeMove) {
      return;
    }
    closeButtonRef.current?.focus();
  }, [activeMove]);

  useEffect(() => {
    if (!activeMove) {
      lastFocusedElementRef.current?.focus();
      return;
    }

    const footer = document.querySelector("footer");
    const main = mainRef.current;
    if (main) {
      main.setAttribute("inert", "");
      main.setAttribute("aria-hidden", "true");
    }
    if (footer instanceof HTMLElement) {
      footer.setAttribute("inert", "");
      footer.setAttribute("aria-hidden", "true");
    }
    return () => {
      if (main) {
        main.removeAttribute("inert");
        main.removeAttribute("aria-hidden");
      }
      if (footer instanceof HTMLElement) {
        footer.removeAttribute("inert");
        footer.removeAttribute("aria-hidden");
      }
    };
  }, [activeMove]);

  useEffect(() => {
    if (!activeMove) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeVideoModal();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const selectors = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
      ];
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(selectors.join(","))).filter(
        (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeMove, closeVideoModal]);

  return (
    <>
      <main ref={mainRef} className="min-h-screen bg-[var(--background)] p-4 text-[var(--foreground)] md:p-8">
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
                  <h3 className="text-3xl font-semibold">
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
      aria-current={active ? "page" : undefined}
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

function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    let videoId: string | null = null;
    let startSeconds: number | null = null;
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      videoId = parsed.pathname.slice(1);
      startSeconds = parseStartSeconds(parsed);
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
        startSeconds = parseStartSeconds(parsed);
      } else if (parsed.pathname.startsWith("/embed/")) {
        videoId = parsed.pathname.split("/")[2] ?? null;
        startSeconds = parseStartSeconds(parsed);
      } else if (parsed.pathname.startsWith("/shorts/")) {
        videoId = parsed.pathname.split("/")[2] ?? null;
        startSeconds = parseStartSeconds(parsed);
      }
    }

    if (!videoId) {
      return null;
    }

    const startParam = startSeconds && startSeconds > 0 ? `&start=${startSeconds}` : "";
    return `https://www.youtube.com/embed/${videoId}?rel=0${startParam}`;
  } catch {
    return null;
  }
}

function parseStartSeconds(url: URL): number | null {
  const directStart = url.searchParams.get("start");
  if (directStart) {
    const numericStart = Number.parseInt(directStart, 10);
    if (Number.isFinite(numericStart) && numericStart >= 0) {
      return numericStart;
    }
  }

  const tParam = url.searchParams.get("t");
  if (tParam) {
    const parsedT = parseYouTubeTimeString(tParam);
    if (parsedT !== null) {
      return parsedT;
    }
  }

  const hash = url.hash.replace(/^#/, "");
  const hashTime = hash.startsWith("t=") ? hash.slice(2) : hash;
  if (hashTime) {
    const parsedHash = parseYouTubeTimeString(hashTime);
    if (parsedHash !== null) {
      return parsedHash;
    }
  }

  return null;
}

function parseYouTubeTimeString(value: string): number | null {
  const plainNumber = Number.parseInt(value, 10);
  if (/^\d+$/.test(value) && Number.isFinite(plainNumber) && plainNumber >= 0) {
    return plainNumber;
  }

  const timeMatch = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!timeMatch) {
    return null;
  }

  const hours = Number.parseInt(timeMatch[1] ?? "0", 10);
  const minutes = Number.parseInt(timeMatch[2] ?? "0", 10);
  const seconds = Number.parseInt(timeMatch[3] ?? "0", 10);

  if (![hours, minutes, seconds].every((num) => Number.isFinite(num) && num >= 0)) {
    return null;
  }

  return (hours * 60 + minutes) * 60 + seconds;
}
