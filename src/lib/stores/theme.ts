import { writable } from "svelte/store";

export type Theme = "light" | "dark" | "system";

// Get initial theme from localStorage or default to system
const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  }
  return "system";
};

// Determine if dark mode should be applied
const shouldUseDarkMode = (theme: Theme): boolean => {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  // system theme
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// Apply or remove the dark class on document element
const applyTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;

  const isDark = shouldUseDarkMode(theme);
  document.documentElement.classList.toggle("dark", isDark);
};

// Create the theme store
export const theme = writable<Theme>(getInitialTheme());

// Initialize theme on client
if (typeof window !== "undefined") {
  // Apply initial theme immediately to avoid FOUC
  applyTheme(getInitialTheme());

  // Subscribe to theme changes
  theme.subscribe((value) => {
    localStorage.setItem("theme", value);
    applyTheme(value);
  });

  // Listen for system theme changes when using system preference
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = () => {
    theme.subscribe((currentTheme) => {
      if (currentTheme === "system") {
        applyTheme("system");
      }
    })();
  };

  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleSystemThemeChange);
  } else {
    // Fallback for older browsers
    mediaQuery.addListener(handleSystemThemeChange);
  }
}

// Helper function to toggle between themes
export const toggleTheme = () => {
  theme.update((current) => {
    if (current === "light") return "dark";
    if (current === "dark") return "system";
    return "light";
  });
};

// Helper to set specific theme
export const setTheme = (newTheme: Theme) => {
  theme.set(newTheme);
};
