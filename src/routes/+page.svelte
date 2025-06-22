<script lang="ts">
  import Leaflet from "$components/map/Leaflet.svelte";
  import ZoomControl from "$components/map/ZoomControl.svelte";
  import MapControl from "$components/map/MapControl.svelte";
  import Searchbar from "$components/inputs/Searchbar.svelte";
  import SearchOptions from "$components/inputs/SearchOptions.svelte";
  import Sidebar from "$components/sidebars/Sidebar.svelte";
  import Drawer from "$components/sidebars/Drawer.svelte";

  import { allFeatures } from "$lib/stores/map.svelte";

  import { type PageData } from "./$types";
  import { getAppState } from "$lib/stores/appState.svelte";
  import { getMapState } from "$lib/stores/map.svelte";
  import { onMount } from "svelte";

  let { data }: { data: PageData } = $props();
  const mapState = getMapState();

  onMount(() => {
    mapState.buildings = data.buildings!.features;
    mapState.benches = data.benches!.features;
    mapState.parking = data.parking!.features;
    mapState.pointsOfInterest = data.pointsOfInterest!.features;
    allFeatures.set([
      ...data.buildings!.features,
      ...data.benches!.features,
      ...data.parking!.features,
      ...data.pointsOfInterest!.features,
    ]);
  });

  const appState = getAppState();
</script>

<div class="viewport">
  <Leaflet>
    <Sidebar />
    <div class="top-bar">
      <div class="search">
        <Searchbar />
        <SearchOptions />
        {#if appState.viewportWidth >= 600}
          <MapControl />
        {/if}
      </div>
    </div>
    {#if appState.viewportWidth > 600}
      <ZoomControl />
    {/if}
    <div class="bottom-bar">
      {#if appState.viewportWidth < 600}
        <MapControl />
      {/if}
    </div>
    {#if appState.viewportWidth < 600}
      <Drawer />
    {/if}
  </Leaflet>
</div>

<style lang="scss">
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .top-bar {
    position: absolute;
    top: 0;
    display: flex;
    background-color: none;
    z-index: 1000;
    padding-top: clamp(4px, 2vw, 8px);
    width: 100%;

    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      row-gap: 8px;
    }
  }

  @media (max-width: 599px) {
    .search {
      width: 100%;
      flex-wrap: wrap;
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
