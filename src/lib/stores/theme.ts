import { writable } from "svelte/store";

export type Theme = "light" | "dark" | "nord" | "catppuccin" | "one-dark" | "gruvbox";

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "nord" || stored === "catppuccin" || stored === "one-dark" || stored === "gruvbox") {
      return stored;
    }
  }
  return "dark";
};

const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
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
    if (current === "dark") return "nord";
    if (current === "nord") return "catppuccin";
    if (current === "catppuccin") return "one-dark";
    if (current === "one-dark") return "gruvbox";
    if (current === "gruvbox") return "light";
    return "dark";
  });
};

// Helper to set specific theme
export const setTheme = (newTheme: Theme) => {
  theme.set(newTheme);
};
