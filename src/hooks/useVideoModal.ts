"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import type { BeltMove } from "@/lib/belt-data";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

interface VideoModalRouter {
  push: (href: string, options?: { scroll?: boolean }) => void;
  replace: (href: string, options?: { scroll?: boolean }) => void;
}

interface SearchParamsLike {
  get: (name: string) => string | null;
}

interface UseVideoModalOptions {
  allMoves: BeltMove[];
  currentPathname: string;
  searchParams: SearchParamsLike | null;
  searchParamsString: string;
  router: VideoModalRouter;
}

interface UseVideoModalResult {
  activeMove: BeltMove | null;
  activeEmbedUrl: string | null;
  closeVideoModal: () => void;
  openVideoModal: (videoId: string) => void;
  mainRef: RefObject<HTMLElement | null>;
  dialogRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}

export function useVideoModal({
  allMoves,
  currentPathname,
  searchParams,
  searchParamsString,
  router,
}: UseVideoModalOptions): UseVideoModalResult {
  const mainRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

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
    const nextUrl = nextQuery
      ? `${currentPathname}?${nextQuery}`
      : currentPathname;
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
      router.push(`${currentPathname}?${nextParams.toString()}`, {
        scroll: false,
      });
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
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(selectors.join(",")),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true",
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

  return {
    activeMove,
    activeEmbedUrl,
    closeVideoModal,
    openVideoModal,
    mainRef,
    dialogRef,
    closeButtonRef,
  };
}
