<script lang="ts">
  import Leaflet from "$components/map/Leaflet.svelte";
  import Searchbar from "$components/inputs/Searchbar.svelte";
  import Sidebar from "$components/sidebars/Sidebar.svelte";
  import ZoomControl from "$components/map/ZoomControl.svelte";
  import MapControl from "$components/map/MapControl.svelte";

  import {
    buildings,
    benches,
    parking,
    pointsOfInterest,
  } from "$lib/stores/map";

  import { type PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  $effect(() => {
    buildings.set(data.buildings);
    benches.set(data.benches);
    parking.set(data.parking);
    pointsOfInterest.set(data.pointsOfInterest);
  });
</script>

<Leaflet>
  <Sidebar />
  <div class="top-bar">
    <Searchbar />
    <MapControl />
  </div>
  <ZoomControl />
</Leaflet>

<style>
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
    align-items: center;
    justify-content: space-between;
  }
</style>
