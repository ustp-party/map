import { writable } from "svelte/store";
import { onMount } from "svelte";

export function createViewportWidth() {
  const width = writable<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  function update() {
    width.set(window.innerWidth);
  }

  onMount(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  });

  return width;
}
