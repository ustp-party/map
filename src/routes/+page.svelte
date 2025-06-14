<script lang="ts">
  import Leaflet from "$components/map/Leaflet.svelte";
  import Searchbar from "$components/inputs/Searchbar.svelte";
  import Sidebar from "$components/sidebars/Sidebar.svelte";
  import ZoomControl from "$components/map/ZoomControl.svelte";
  import MapControl from "$components/map/MapControl.svelte";

  import type { LatLngExpression } from "leaflet";

  const initialView: LatLngExpression = [8.484975, 124.656662];
  const initialZoom: number = 19;
</script>

<div id="map"></div>
<div class="top-bar">
  <Searchbar />
  <MapControl />
</div>
<Sidebar />
<Leaflet view={initialView} zoom={initialZoom}>
  <ZoomControl />
</Leaflet>

<style>
  #map {
    width: 100vh;
    height: 100vh;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
  }

  .top-bar {
    position: absolute;
    top: 0;
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

  @media (max-width: 600px) {
    .top-bar {
      align-items: center;
      justify-content: center;
    }
  }
</style>
