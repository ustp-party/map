<script lang="ts">
  import "../app.css";
  import "$styles/custom-tooltip.scss";
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  import { darkMode } from "$lib/stores/theme";
  import { prefersDarkMode } from "$lib/utils/theme";
  import { onMount } from "svelte";

  import { setSearchState } from "$lib/stores/SearchState.svelte";
  import {
    setLocalStorageState,
    getLocalStorageState,
  } from "$lib/stores/localStorage.svelte";
  import { setMapState, getMapState } from "$lib/stores/mapState.svelte";
  import { setAppState, getAppState } from "$lib/stores/appState.svelte";

  setSearchState();
  setAppState();
  setLocalStorageState();
  setMapState();

  let localStorageState = getLocalStorageState();
  const mapState = getMapState();
  const appState = getAppState();

  onMount(() => {
    if (prefersDarkMode()) {
      darkMode.set(true);
      mapState.tileset = mapState.tilesets.dark;
    } else {
      darkMode.set(false);
      mapState.tileset = mapState.tilesets.light;
    }

    // Set initial viewport height, useful for mobile browsers
    function setViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    window.addEventListener("resize", setViewportHeight);
    setViewportHeight();

    if (localStorageState.firstVisit) {
      appState.collapsedSidebar = false;
    } else {
      appState.collapsedSidebar = true;
    }
  });

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <title>USTP CDO Campus Map</title>
  <meta
    name="google-site-verification"
    content="CQ4rJlp_JKcfkSbQjCTQX0pEP2vlCur2bR7EEkYrTps"
  />
  <meta name="description" content="Interactive campus map of the University of Science and Technology of Southern Philippines in Cagayan de Oro (USTP-CDO)" />
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
