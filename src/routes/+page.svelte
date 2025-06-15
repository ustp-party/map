<script lang="ts">
  import Leaflet from "$components/map/Leaflet.svelte";
  import ZoomControl from "$components/map/ZoomControl.svelte";
  import MapControl from "$components/map/MapControl.svelte";
  import Searchbar from "$components/inputs/Searchbar.svelte";
  import SearchOptions from "$components/inputs/SearchOptions.svelte";
  import Sidebar from "$components/sidebars/Sidebar.svelte";
  import Drawer from "$components/sidebars/Drawer.svelte";

  import {
    buildings,
    benches,
    parking,
    pointsOfInterest,
  } from "$lib/stores/map";

  import { type PageData } from "./$types";
  import { getViewportWidthState } from "$lib/stores/ViewportWidthState.svelte";
  import { getSearchbarInputState } from "$lib/stores/SearchState.svelte";
  import { onMount } from "svelte";

  let { data }: { data: PageData } = $props();

  $effect(() => {
    buildings.set(data.buildings);
    benches.set(data.benches);
    parking.set(data.parking);
    pointsOfInterest.set(data.pointsOfInterest);
  });

  onMount(() => {
    getSearchbarInputState().populateData(data.buildings!)
  });

  const viewportWidth = getViewportWidthState();
</script>

<Leaflet>
  <Sidebar />
  <div class="top-bar">
    <div class="search">
      <Searchbar />
      <SearchOptions />
    </div>
    {#if viewportWidth.value >= 600}
      <MapControl />
    {/if}
  </div>
  {#if viewportWidth.value > 600}
    <ZoomControl />
  {/if}
  <div class="bottom-bar">
    {#if viewportWidth.value < 600}
      <MapControl />
    {/if}
  </div>
  {#if viewportWidth.value < 600}
    <Drawer />
  {/if}
</Leaflet>

<style lang="scss">
  .top-bar {
    position: absolute;
    top: 0;
    display: flex;
    background-color: none;
    z-index: 1000;
    padding-left: clamp(4px, 5vw, 16px);
    padding-right: clamp(4px, 5vw, 16px);
    padding-top: clamp(4px, 2vw, 8px);
    width: 100%;

    display: flex;
    align-items: top;
    justify-content: space-between;

    .search {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      gap: 8px;
    }
  }

  @media (max-width: 599px) {
    .search {
      width: 100%;
      justify-content: center;
      align-items: center;
    }
  }

  .bottom-bar {
    position: absolute;
    bottom: clamp(64px, 10vw, 64px);
    display: flex;
    background-color: none;
    z-index: 1000;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
