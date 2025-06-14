<script lang="ts">
  import MyLocationIcon from "$components/icons/MyLocationIcon.svelte";
  import LayersIcon from "$components/icons/LayersIcon.svelte";
  import { getContext } from "svelte";
  import type { Map } from "leaflet";
  import type { LatLngExpression } from "leaflet";

  const mapContext = getContext<{ getMap: () => Map }>("map");
  let map: Map = mapContext.getMap();

  let {
    defaultLocation,
    defaultZoom,
  }: {
    defaultLocation: LatLngExpression;
    defaultZoom: number;
  } = $props();

  function centerMapOnLocation() {
    if (map) {
      map.setView(defaultLocation, defaultZoom, {
        animate: true,
        duration: 0.2,
      });
    }
  }
</script>

<div class="control-panel">
  <button
    class="control location"
    aria-label="Locate Me"
    onclick={centerMapOnLocation}
  >
    <MyLocationIcon alt="My Location" />
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
