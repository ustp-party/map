<script lang="ts">
  import Leaflet from "$components/map/Leaflet.svelte";
  import Searchbar from "$components/inputs/Searchbar.svelte";
  import Sidebar from "$components/sidebars/Sidebar.svelte";
  import ZoomControl from "$components/map/ZoomControl.svelte";
  import MapControl from "$components/map/MapControl.svelte";

  import type { LatLngExpression } from "leaflet";

  const initialView: LatLngExpression = [8.486001, 124.656645];
  const initialZoom: number = 18;
</script>

<Leaflet view={initialView} zoom={initialZoom}>
  <Sidebar />
  <div class="top-bar">
    <Searchbar />
    <MapControl defaultLocation={initialView} defaultZoom={initialZoom} />
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
