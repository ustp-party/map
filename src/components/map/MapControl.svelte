<script lang="ts">
  import MyLocationIcon from "$components/icons/MyLocationIcon.svelte";
  import LayersIcon from "$components/icons/LayersIcon.svelte";
  import SchoolIcon from "$components/icons/SchoolIcon.svelte";
  import { getContext } from "svelte";
  import type { Map } from "leaflet";
  import type { LatLngExpression } from "leaflet";
  import { currentZoom } from "$lib/stores/map";
  import { defaultCenter } from "$lib/stores/map";
  import { defaultZoom } from "$lib/stores/map";
  import controls from "$lib/utils/controls";

  const mapContext = getContext<{
    getMap: () => Map;
  }>("map");

  let map: Map = mapContext.getMap();
  let userLocationMarker: L.Marker | null = $state(null);

  function locateUserHandler() {
    controls.locateMe(map, userLocationMarker);
  }

  function centerMapOnCampus() {
    if (map) {
      map.setView($defaultCenter, $defaultZoom, {
        animate: true,
        duration: 0.8,
      });
      currentZoom.set($defaultZoom);
    }
  }
</script>

<div class="control-panel">
  <button
    class="control location"
    aria-label="My Location"
    onclick={locateUserHandler}
  >
    <MyLocationIcon alt="My location" />
  </button>
  <button
    class="control campus"
    aria-label="Locate Me"
    onclick={centerMapOnCampus}
  >
    <SchoolIcon alt="Campus location" />
  </button>
  <button class="control layer" aria-label="Select Layer">
    <LayersIcon alt="Select map layer" />
  </button>
</div>

<style>
  .control-panel {
    bottom: clamp(32px, 4vw, 44px);
    right: clamp(10px, 2vw, 20px);
    display: flex;
    flex-direction: row;
    gap: 2px;
    z-index: 1000;
  }

  .control {
    background-color: var(--bg);
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.8);
  }

  .control.location {
    border-radius: 8px 0 0 8px;
  }
  .control.layer {
    border-radius: 0 8px 8px 0;
  }

  @media (prefers-color-scheme: dark) {
    .control {
      box-shadow: 0 0px 4px rgba(255, 255, 255, 0.8);
    }
  }
</style>
