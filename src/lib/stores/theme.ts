import { writable } from "svelte/store";

export type Theme =
  | "light"
  | "dark"
  | "amoled"
  | "nord"
  | "catppuccin"
  | "one-dark"
  | "gruvbox"
  | "terminal";

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (
      stored === "light" ||
      stored === "dark" ||
      stored === "amoled" ||
      stored === "nord" ||
      stored === "catppuccin" ||
      stored === "one-dark" ||
      stored === "gruvbox" ||
      stored === "terminal"
    ) {
      return stored;
    }
  }
  return "dark";
};

const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  // Set theme-color meta tag to background color
  setTimeout(() => {
    const bgColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", bgColor);
  }, 0);
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

// Helper function to toggle between themes
export const toggleTheme = () => {
  theme.update((current) => {
    if (current === "light") return "dark";
    if (current === "dark") return "amoled";
    if (current === "amoled") return "nord";
    if (current === "nord") return "catppuccin";
    if (current === "catppuccin") return "one-dark";
    if (current === "one-dark") return "gruvbox";
    if (current === "gruvbox") return "terminal";
    if (current === "terminal") return "light";
    return "dark";
  });
};

// Helper to set specific theme
export const setTheme = (newTheme: Theme) => {
  theme.set(newTheme);
};
