import { writable } from "svelte/store";

// init
const getInitialValue = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("defaultBang");
    if (stored && stored.startsWith("!")) {
      return stored;
    }
  }
  return "!g";
};

export const selectedBang = writable(getInitialValue());

// save to localstorage
if (typeof window !== "undefined") {
  selectedBang.subscribe((value) => {
    localStorage.setItem("defaultBang", value);
  });
}