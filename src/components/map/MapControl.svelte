<script lang="ts">
  import MyLocationIcon from "$components/icons/MyLocationIcon.svelte";
  import LayersIcon from "$components/icons/LayersIcon.svelte";
  import SchoolIcon from "$components/icons/SchoolIcon.svelte";
  import MapControlDropdown from "$components/inputs/MapControlDropdown.svelte";
  import type { Map } from "leaflet";
  import controls from "$lib/utils/mapControls";
  import spinnerSVG from "$assets/animated/spinner2.svg?raw";
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import { getAppState } from "$lib/stores/appState.svelte";
  import { getMapState } from "$lib/stores/mapState.svelte";
  import { onMount } from "svelte";

  const mapState = getMapState();
  const appState = getAppState();
  let map: Map = mapState.map!;
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
      map.setView(mapState.defaultCenter, mapState.defaultZoom, {
        animate: true,
        duration: 0.8,
      });
      mapState.updateCurrentZoom(mapState.defaultZoom);
    }
  }

  function handleDropdown() {
    appState.openMapControlDropdown = !appState.openMapControlDropdown;
  }

  onMount(() => {
    if (appState.viewportWidth < 800) {
      appState.openMapControlDropdown = false; // Close dropdown on mobile by default
    } else {
      appState.openMapControlDropdown = true; // Open dropdown on desktop on default
    }
  });
</script>

<ul class="control-panel">
  <li class="control-item">
    <abbr title="Locate me">
      <button
        class="control location"
        aria-label="My Location"
        onclick={locateUserHandler}
      >
        {#if loading}
          <SvgIcon size="24px" alt="Loading user location">
            {@html spinnerSVG}
          </SvgIcon>
        {:else}
          <MyLocationIcon alt="My location" />
        {/if}
      </button>
    </abbr>
  </li>
  <li class="control-item">
    <abbr title="Recenter to campus location">
      <button
        class="control campus"
        aria-label="Locate me"
        onclick={centerMapOnCampus}
      >
        <SchoolIcon alt="Recenter to campus location" />
      </button>
    </abbr>
  </li>
  <li class="control-item dropdown">
    <abbr title="Select map options">
      <button
        class="control layer"
        aria-label="Select Layer"
        onclick={handleDropdown}
      >
        <LayersIcon alt="Select map options" />
      </button>
    </abbr>
    {#if appState.openMapControlDropdown}
      <MapControlDropdown />
    {/if}
  </li>
</ul>

<style lang="scss">
  .dropdown {
    position: relative;
    overflow: visible;
  }
  .control-panel {
    bottom: clamp(32px, 4vw, 44px);
    right: clamp(10px, 2vw, 20px);
    display: flex;
    flex-direction: row;
    gap: 2px;
    z-index: 1000;

    li {
      all: unset;
    }
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
      box-shadow: none;
    }
  }

  @media (min-width: 600px) {
    .control-panel {
      margin-right: clamp(4px, 5vw, 16px);
      margin-left: auto;
    }
  }
</style>
