<script lang="ts">
  import Leaflet from "$components/map/Leaflet.svelte";
  import Searchbar from "$components/inputs/Searchbar.svelte";
  import Sidebar from "$components/sidebars/Sidebar.svelte";

  import type { LatLngExpression } from "leaflet";

  const initialView: LatLngExpression = [8.484975, 124.656662];
  const initialZoom: number = 19;
</script>

<div id="map"></div>
<Searchbar />
<Sidebar />
<Leaflet view={initialView} zoom={initialZoom} />

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
</style>
