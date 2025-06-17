<script lang="ts">
  import MyLocationIcon from "$components/icons/MyLocationIcon.svelte";
  import LayersIcon from "$components/icons/LayersIcon.svelte";
  import SchoolIcon from "$components/icons/SchoolIcon.svelte";
  import { getContext } from "svelte";
  import type { Map } from "leaflet";
  import { currentZoom } from "$lib/stores/map";
  import { defaultCenter } from "$lib/stores/map";
  import { defaultZoom } from "$lib/stores/map";
  import controls from "$lib/utils/mapControls";
  import spinnerSVG from "$assets/animated/spinner2.svg?raw";
  import SvgIcon from "$components/icons/SVGIcon.svelte";

  const mapContext = getContext<{
    getMap: () => Map;
  }>("map");

  let map: Map = mapContext.getMap();
  let userLocationMarker: L.Marker | null = $state(null);
  let loading = $state(false);

  // BUG: The previous userLocationMarker is not being removed when a new one is created.
  async function locateUserHandler() {
    try {
      loading = true;
      controls.locateMe(map, userLocationMarker);
    } catch (error) {
      console.error("Error locating user:", error);
    } finally {
      loading = false;
    }
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
    {#if loading}
      <SvgIcon size={24} alt="Loading user location">
        {@html spinnerSVG}
      </SvgIcon>
    {:else}
      <MyLocationIcon alt="My location" />
    {/if}
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

<style lang="scss">
  .control-panel {
    bottom: clamp(32px, 4vw, 44px);
    right: clamp(10px, 2vw, 20px);
    display: flex;
    flex-direction: row;
    gap: 2px;
    z-index: 1000;
  }

  .control {
    background-color: var(--icon-bg);
    color: var(--icon-color);
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--box-shadow);
  }

  .control.location {
    border-radius: 8px 0 0 8px;

    &:hover {
      color: var(--icon-hover);
    }
  }
  .control.layer {
    border-radius: 0 8px 8px 0;
  }

  @media (prefers-color-scheme: dark) {
    .control {
      box-shadow: 0 0px 4px rgba(255, 255, 255, 0.8);
    }
  }

  @media (min-width: 600px) {
    .control-panel {
      margin-right: clamp(4px, 5vw, 16px);
      margin-left: auto;
    }
  }
</style>
