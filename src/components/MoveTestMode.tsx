"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BeltMove, BeltTheme } from "@/lib/belt-data";

interface MoveTestModeProps {
  moves: BeltMove[];
  theme: BeltTheme;
  onExit: () => void;
  completionRankLabel?: string;
  jumpLabel?: string;
}

type WakeLockSentinelLike = {
  release: () => Promise<void>;
};

type WakeLockLike = {
  request: (type: "screen") => Promise<WakeLockSentinelLike>;
};

type SpeechRecognitionEventLike = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionErrorEventLike = {
  error?: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

const voiceCommands = {
  next: [/next move/, /\bnext\b/, /\bgo next\b/, /\bforward\b/],
  previous: [/last move/, /\bprevious\b/, /\bgo back\b/, /\bback\b/],
  exit: [/tap out/, /\bexit\b/, /\bquit\b/, /\bstop\b/, /leave test mode/],
};

export default function MoveTestMode({
  moves,
  theme,
  onExit,
  completionRankLabel = "purple",
  jumpLabel = "Jump to Purple",
}: MoveTestModeProps) {
  const voiceSupported =
    typeof window !== "undefined" &&
    Boolean(
      (
        window as Window & {
          SpeechRecognition?: SpeechRecognitionCtor;
          webkitSpeechRecognition?: SpeechRecognitionCtor;
        }
      ).SpeechRecognition ||
      (
        window as Window & {
          SpeechRecognition?: SpeechRecognitionCtor;
          webkitSpeechRecognition?: SpeechRecognitionCtor;
        }
      ).webkitSpeechRecognition,
    );
  const sortedMoves = useMemo(
    () => [...moves].sort((a, b) => a.order - b.order),
    [moves],
  );
  const jumpIndex = useMemo(
    () =>
      sortedMoves.findIndex((move) =>
        move.tags.some(
          (tag) => tag.toLowerCase() === "standing defenses from the front",
        ),
      ),
    [sortedMoves],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banner, setBanner] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [fullscreenFailed, setFullscreenFailed] = useState(false);
  const [wakeLockSupported, setWakeLockSupported] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wakeLockRef = useRef<WakeLockSentinelLike | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const shouldKeepListeningRef = useRef(false);
  const manualStopRef = useRef(false);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restartVoiceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const isComplete = currentIndex >= sortedMoves.length;
  const currentMove = isComplete ? null : (sortedMoves[currentIndex] ?? null);

  const showBanner = useCallback((message: string) => {
    setBanner(message);
    if (bannerTimerRef.current) {
      clearTimeout(bannerTimerRef.current);
    }
    bannerTimerRef.current = setTimeout(() => {
      setBanner(null);
    }, 2200);
  }, []);

  const goPrevious = useCallback(() => {
    setCurrentIndex((value) => {
      if (sortedMoves.length === 0) {
        return 0;
      }
      if (value === 0) {
        return sortedMoves.length - 1;
      }
      if (value >= sortedMoves.length) {
        return sortedMoves.length - 1;
      }
      return value - 1;
    });
  }, [sortedMoves.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((value) => {
      if (sortedMoves.length === 0) {
        return 0;
      }
      if (value >= sortedMoves.length - 1) {
        return sortedMoves.length;
      }
      return value + 1;
    });
  }, [sortedMoves.length]);

  const stopVoice = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }
    shouldKeepListeningRef.current = false;
    manualStopRef.current = true;
    try {
      recognitionRef.current.stop();
    } catch {
      // Ignore browser-specific stop errors.
    }
    setIsListening(false);
    showBanner("Voice listening stopped.");
  }, [showBanner]);

  const handleExit = useCallback(() => {
    stopVoice();
    onExit();
  }, [onExit, stopVoice]);

  const parseVoiceCommand = useCallback(
    (transcript: string) => {
      const test = (patterns: RegExp[]) =>
        patterns.some((pattern) => pattern.test(transcript));
      if (test(voiceCommands.next)) {
        goNext();
        return;
      }
      if (test(voiceCommands.previous)) {
        goPrevious();
        return;
      }
      if (test(voiceCommands.exit)) {
        handleExit();
      }
    },
    [goNext, goPrevious, handleExit],
  );

  const getRecognition = useCallback(() => {
    if (recognitionRef.current) {
      return recognitionRef.current;
    }
    const maybeWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const Recognition =
      maybeWindow.SpeechRecognition ?? maybeWindow.webkitSpeechRecognition;
    if (!Recognition) {
      return null;
    }

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const latestResult = event.results[event.results.length - 1];
      const transcript = latestResult?.[0]?.transcript?.toLowerCase?.();
      if (transcript) {
        parseVoiceCommand(transcript);
      }
    };

    recognition.onerror = (event) => {
      if (
        event?.error === "not-allowed" ||
        event?.error === "service-not-allowed"
      ) {
        setPermissionDenied(true);
        shouldKeepListeningRef.current = false;
        setIsListening(false);
        showBanner("Microphone permission denied. Enable access to use voice.");
        return;
      }
      showBanner("Voice recognition error. Retrying...");
    };

    recognition.onend = () => {
      if (manualStopRef.current) {
        manualStopRef.current = false;
        return;
      }
      if (!shouldKeepListeningRef.current || permissionDenied) {
        setIsListening(false);
        return;
      }
      restartVoiceTimerRef.current = setTimeout(() => {
        try {
          recognition.start();
        } catch {
          // Ignore browser-specific start errors.
        }
      }, 600);
    };

    recognitionRef.current = recognition;
    return recognition;
  }, [parseVoiceCommand, permissionDenied, showBanner]);

  const startVoice = useCallback(() => {
    const recognition = getRecognition();
    if (!recognition) {
      showBanner("Voice control not supported on this browser.");
      return;
    }

    setPermissionDenied(false);
    shouldKeepListeningRef.current = true;
    manualStopRef.current = false;

    try {
      recognition.start();
      setIsListening(true);
      showBanner("Voice listening started.");
    } catch {
      showBanner("Voice recognition error. Retrying...");
    }
  }, [getRecognition, showBanner]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) {
      return;
    }

    const requestImmersiveMode = async () => {
      if (document.fullscreenElement !== root) {
        try {
          await root.requestFullscreen();
        } catch {
          setFullscreenFailed(true);
        }
      }

      const nav = navigator as Navigator & { wakeLock?: WakeLockLike };
      if (!nav.wakeLock) {
        setWakeLockSupported(false);
        return;
      }

      try {
        wakeLockRef.current = await nav.wakeLock.request("screen");
      } catch {
        setWakeLockSupported(false);
      }
    };

    void requestImmersiveMode();

    return () => {
      if (wakeLockRef.current) {
        void wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
      if (document.fullscreenElement === root) {
        void document.exitFullscreen();
      }
    };
  }, []);

  useEffect(
    () => () => {
      if (bannerTimerRef.current) {
        clearTimeout(bannerTimerRef.current);
      }
      if (restartVoiceTimerRef.current) {
        clearTimeout(restartVoiceTimerRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore browser-specific stop errors.
        }
      }
    },
    [],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleExit();
        return;
      }
      if (event.key === "ArrowRight" || event.key === "ArrowUp") {
        goNext();
        return;
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
        goPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrevious, handleExit]);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    const start = touchStartRef.current;
    if (!start) {
      return;
    }
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const horizontal = Math.abs(deltaX);
    const vertical = Math.abs(deltaY);

    if (horizontal < 40 && vertical < 40) {
      return;
    }

    if (horizontal >= vertical) {
      if (deltaX > 0) {
        goNext();
      } else {
        goPrevious();
      }
      return;
    }

    if (deltaY < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  const toggleVoice = isListening ? stopVoice : startVoice;
  const jumpEnabled = jumpIndex >= 0;
  const palette = useMemo(() => getPalette(theme), [theme]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col ${palette.baseScreen} text-white`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {banner ? (
        <div
          className={`absolute top-4 left-1/2 z-20 w-[92%] max-w-xl -translate-x-1/2 rounded-full border px-6 py-3 text-center text-sm text-white shadow-lg backdrop-blur ${palette.banner}`}
        >
          {banner}
        </div>
      ) : null}

      {sortedMoves.length === 0 ? (
        <div
          className={`flex flex-1 flex-col items-center justify-center px-6 ${palette.emptyScreen}`}
        >
          <p className="text-2xl font-semibold">No moves available.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={toggleVoice}
              className="rounded-full border border-white/30 px-5 py-2 text-white transition hover:bg-white/10"
            >
              {isListening ? "Stop Voice" : "Start Voice"}
            </button>
            <button
              type="button"
              onClick={handleExit}
              className="rounded-full border border-white/30 px-5 py-2 text-white transition hover:bg-white/10"
            >
              Exit Fullscreen
            </button>
          </div>
        </div>
      ) : isComplete ? (
        <div
          className={`flex flex-1 items-center justify-center px-6 text-center ${palette.completionScreen}`}
        >
          <button
            type="button"
            onClick={handleExit}
            className="absolute top-6 right-6 rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Exit Fullscreen
          </button>
          <div className="absolute top-6 left-6 flex items-center gap-3">
            {jumpEnabled ? (
              <button
                type="button"
                onClick={() => setCurrentIndex(jumpIndex)}
                className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                {jumpLabel}
              </button>
            ) : null}
            <button
              type="button"
              onClick={toggleVoice}
              className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              {isListening ? "Stop Voice" : "Start Voice"}
            </button>
          </div>

          <div className="max-w-3xl">
            <p
              className={`text-sm tracking-[0.3em] uppercase ${palette.badge}`}
            >
              Completion
            </p>
            <h1 className="mt-6 text-4xl font-bold md:text-6xl">
              {`Congratulations, you're now a ${completionRankLabel} belt.`}
            </h1>
            <p
              className={`mt-6 text-lg md:text-2xl ${palette.completionSubheading}`}
            >
              Swipe down or left to review the last move, up or right to restart
              the sequence.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setCurrentIndex(0)}
                className={`rounded-full px-6 py-3 text-sm font-semibold text-slate-900 transition ${palette.primaryButton}`}
              >
                Restart
              </button>
              <button
                type="button"
                onClick={goPrevious}
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Previous Move
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-6 py-6">
            <div
              className={`text-xs tracking-[0.35em] uppercase ${palette.badge}`}
            >
              Test Mode
            </div>
            <div className="flex items-center gap-3">
              {jumpEnabled ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(jumpIndex)}
                  className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  {jumpLabel}
                </button>
              ) : null}
              <button
                type="button"
                onClick={toggleVoice}
                className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                {isListening ? "Stop Voice" : "Start Voice"}
              </button>
              <button
                type="button"
                onClick={handleExit}
                className="rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                Exit Fullscreen
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-6">
            <div className="w-full max-w-4xl">
              <p
                className={`text-sm tracking-[0.3em] uppercase ${palette.sectionLabel}`}
              >
                {currentMove?.tags[0] ?? "Section"}
              </p>
              <h1
                className={`mt-6 text-4xl font-bold md:text-6xl ${palette.moveTitle}`}
              >
                {currentMove?.name}
              </h1>
              <p className="mt-6 text-lg text-slate-200 md:text-2xl">
                {currentMove?.summary?.trim()
                  ? currentMove.summary
                  : "Perform the move with control and intent."}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {currentMove ? (
                  <a
                    href={currentMove.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full px-6 py-3 text-sm font-semibold text-white transition ${palette.videoButton}`}
                  >
                    Watch Video
                  </a>
                ) : null}
                <div className="text-sm text-slate-300">
                  Swipe up or right for next, down or left for previous.
                </div>
                <div className="text-sm text-slate-300">
                  {voiceSupported
                    ? "Tap Start Voice to enable voice commands."
                    : "Voice control not supported on this browser."}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-sm text-slate-300">
            <span>
              Move {currentIndex + 1} of {sortedMoves.length}
            </span>
            <span>
              {permissionDenied
                ? "Microphone access blocked."
                : fullscreenFailed
                  ? "Fullscreen request blocked."
                  : wakeLockSupported
                    ? "Screen stays awake."
                    : "Wake Lock not supported."}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function getPalette(theme: BeltTheme) {
  if (theme.accent.includes("blue")) {
    return {
      baseScreen: "bg-slate-950",
      banner: "border-white/20 bg-slate-900/90",
      emptyScreen: "bg-slate-950",
      completionScreen:
        "bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900",
      completionSubheading: "text-blue-100",
      primaryButton: "bg-white hover:bg-blue-100",
      badge: "text-blue-200",
      sectionLabel: "text-blue-300",
      moveTitle: "text-white",
      videoButton: "bg-blue-600 hover:bg-blue-500",
    };
  }
  if (theme.accent.includes("yellow")) {
    return {
      baseScreen: "bg-stone-950",
      banner: "border-white/20 bg-stone-900/90",
      emptyScreen: "bg-stone-950",
      completionScreen:
        "bg-gradient-to-br from-stone-950 via-yellow-950 to-stone-900",
      completionSubheading: "text-yellow-100",
      primaryButton: "bg-white hover:bg-yellow-100",
      badge: "text-yellow-200",
      sectionLabel: "text-yellow-300",
      moveTitle: "text-white",
      videoButton: "bg-yellow-700 hover:bg-yellow-600",
    };
  }
  return {
    baseScreen: "bg-slate-950",
    banner: "border-white/20 bg-slate-900/90",
    emptyScreen: "bg-slate-950",
    completionScreen:
      "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900",
    completionSubheading: "text-purple-100",
    primaryButton: "bg-white hover:bg-purple-100",
    badge: "text-purple-200",
    sectionLabel: "text-purple-300",
    moveTitle: "text-white",
    videoButton: "bg-purple-500 hover:bg-purple-400",
  };
}
