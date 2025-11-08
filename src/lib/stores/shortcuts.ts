import { writable } from "svelte/store";
function getInitialValue() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("shortcuts");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
}

export const shortcuts = writable(getInitialValue());

shortcuts.subscribe((value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("shortcuts", JSON.stringify(value));
  }
});
