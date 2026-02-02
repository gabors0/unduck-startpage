import { writable } from "svelte/store";

export type Theme =
  | "light"
  | "dark"
  | "amoled"
  | "nord"
  | "catppuccin"
  | "catppuccin-light"
  | "one-dark"
  | "gruvbox"
  | "terminal"
  | "ayu-light"
  | "ayu-dark"
  | "ayu-mirage"
  | "steam"
  | "steam-old";

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (
      stored === "light" ||
      stored === "dark" ||
      stored === "amoled" ||
      stored === "nord" ||
      stored === "catppuccin" ||
      stored === "catppuccin-light" ||
      stored === "one-dark" ||
      stored === "gruvbox" ||
      stored === "terminal" ||
      stored === "ayu-light" ||
      stored === "ayu-dark" ||
      stored === "ayu-mirage" ||
      stored === "steam" ||
      stored === "steam-old"
    ) {
      return stored;
    }
  }
  return "dark";
};

const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  // set theme-color meta tag to accent color
  setTimeout(() => {
    const bgColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", bgColor);
  }, 100);
};

export const theme = writable<Theme>(getInitialTheme());

if (typeof window !== "undefined") {
  applyTheme(getInitialTheme());

  // Subscribe to theme changes
  theme.subscribe((value) => {
    localStorage.setItem("theme", value);
    applyTheme(value);
  });
}