import { writable } from "svelte/store";

// init default bang
const getInitialBangValue = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("defaultBang");
    if (stored && stored.startsWith("!")) {
      return stored;
    }
  }
  return "!g";
};

export const selectedBang = writable(getInitialBangValue());

// save to localstorage
if (typeof window !== "undefined") {
  selectedBang.subscribe((value) => {
    localStorage.setItem("defaultBang", value);
  });
}

// init suggestions
const getInitialSuggestionsValue = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("useSuggestions");
    if (stored === "false") {
      return false;
    }
  }
  return true;
};

export const useSuggestions = writable(getInitialSuggestionsValue());

// save to localstorage
if (typeof window !== "undefined") {
  useSuggestions.subscribe((value) => {
    localStorage.setItem("useSuggestions", String(value));
  });
}

//init title mode
const getInitialTitleValue = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("titleMode");
    if (stored) {
      return stored;
    }
  }
  return "clock";
};

export const titleMode = writable(getInitialTitleValue());

// save to localstorage
if (typeof window !== "undefined") {
  titleMode.subscribe((value) => {
    localStorage.setItem("titleMode", String(value));
  });
}
