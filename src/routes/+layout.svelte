<script lang="ts">
  import "../app.css";
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  import { darkMode } from "$lib/stores/theme";
  import { prefersDarkMode } from "$lib/utils/theme";
  import { onMount } from "svelte";

  import { setSearchState } from "$lib/stores/SearchState.svelte";
  import { setViewportWidthState } from "$lib/stores/ViewportWidthState.svelte";

  setSearchState();
  setViewportWidthState();

  onMount(() => {
    if (prefersDarkMode()) {
      darkMode.set(true);
    } else {
      darkMode.set(false);
    }
    
    // Set initial viewport height, useful for mobile browsers
    function setViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    window.addEventListener("resize", setViewportHeight);
    setViewportHeight();
  });

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

{@render children()}
