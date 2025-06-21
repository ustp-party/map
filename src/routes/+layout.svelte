<script lang="ts">
  import "../app.css";
  import "$styles/custom-tooltip.scss";
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  import { darkMode } from "$lib/stores/theme";
  import { prefersDarkMode } from "$lib/utils/theme";
  import { onMount } from "svelte";

  import { setSearchState } from "$lib/stores/SearchState.svelte";
  import { setAppState } from "$lib/stores/appState.svelte";
  import { setLocalStorageState } from "$lib/stores/localStorage.svelte";
  import { getLocalStorageState } from "$lib/stores/localStorage.svelte";
  import { setMapState } from "$lib/stores/map.svelte";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";

  setSearchState();
  setAppState();
  setLocalStorageState();
  setMapState();

  let localStorageState = getLocalStorageState();

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

    if (localStorageState.firstVisit) {
      collapsedSidebar.set(false);
    }
  });

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>USTP CDO Campus Map</title>
  <meta name="description" content="Interactive campus map of USTP." />
  <meta
    name="keywords"
    content="USTP, map, campus, university, university of science and technology of southern philippines, cdo, cagayan de oro"
  />
  <meta property="og:title" content="map.ustp.party" />
  <meta property="og:description" content="Interactive campus map of USTP." />
  <meta property="og:image" content="/images/social-preview.png" />
  <meta property="og:url" content="https://map.ustp.party" />
  <meta property="og:type" content="website" />
  <meta name="author" content="ustp.party" />
</svelte:head>

{@render children()}
