"use client";

import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] transition-colors hover:brightness-110"
      style={{ borderColor: "var(--button-secondary-border)" }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? (
        <IoSunny className="h-5 w-5" aria-hidden="true" />
      ) : (
        <IoMoon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(STORAGE_KEY, theme);
}
