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

// bang localstorage
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

// suggestions localstorage
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

// titlemode localstorage
if (typeof window !== "undefined") {
  titleMode.subscribe((value) => {
    localStorage.setItem("titleMode", String(value));
  });
}

// init clock font
const getInitialFontValue = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("clockFont");
    if (stored) {
      return stored;
    }
  }
  return "none";
};

export const clockFont = writable(getInitialFontValue());

// clock font localstorage
if (typeof window !== "undefined") {
  clockFont.subscribe((value) => {
    localStorage.setItem("clockFont", value);
  });
}

// init show date
const getInitialDateValue = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("showDate");
    if (stored === "true") {
      return true;
    }
  }
  return false;
};

export const showDate = writable(getInitialDateValue());

// show date localstorage
if (typeof window !== "undefined") {
  showDate.subscribe((value) => {
    localStorage.setItem("showDate", String(value));
  });
}

//init title text
const getInitialTitleTextValue = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("titleText");
    if (stored) {
      return stored;
    }
  }
  return "unduck $L";
};

export const titleText = writable(getInitialTitleTextValue());

// title text localstorage
if (typeof window !== "undefined") {
  titleText.subscribe((value) => {
    localStorage.setItem("titleText", value);
  });
}
