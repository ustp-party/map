<script lang="ts">
  import "../app.css";
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  import { darkMode } from "$lib/stores/theme";
  import { prefersDarkMode } from "$lib/utils/theme";
  import { onMount } from "svelte";

  import { setSearchbarInputState } from "$lib/stores/SearchInputState.svelte";

  setSearchbarInputState();

  onMount(() => {
    if (prefersDarkMode()) {
      darkMode.set(true);
    } else {
      darkMode.set(false);
    }
  });

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

{@render children()}
