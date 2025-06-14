<script lang="ts">
  import MaterialIcon from "$components/icons/MaterialIcon.svelte";
  import { getContext } from "svelte";
  import type { Map } from "leaflet";

  const mapContext = getContext<{ getMap: () => Map }>("map");
  let map: Map = mapContext.getMap();
  let currentZoom = $state(map.getZoom());
  let zoomInDisabled = $derived(currentZoom >= map.getMaxZoom());
  let zoomOutDisabled = $derived(currentZoom <= map.getMinZoom());
</script>

<div class="zoom-control">
  <button
    class="zoom in"
    aria-label="Zoom In"
    onclick={() => {
      currentZoom++;
      map.setZoom(currentZoom);
    }}
    disabled={zoomInDisabled}
  >
    <MaterialIcon name="add" alt="+" />
  </button>
  <button
    class="zoom out"
    aria-label="Zoom Out"
    onclick={() => {
      currentZoom--;
      map.setZoom(currentZoom);
    }}
    disabled={zoomOutDisabled}
  >
    <MaterialIcon name="remove" alt="-" />
  </button>
</div>

<style>
  .zoom-control {
    pointer-events: auto;
    position: absolute;
    bottom: clamp(32px, 4vw, 44px);
    right: clamp(10px, 2vw, 20px);
    display: flex;
    flex-direction: column;
    gap: 2px;
    z-index: 1000;
  }

  .zoom {
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

  .zoom.in {
    border-radius: 8px 8px 0 0;
  }
  .zoom.out {
    border-radius: 0 0 8px 8px;
  }

  .zoom:hover {
    background-color: var(--btn-hover);
  }
  .zoom:active {
    background-color: var(--btn-active);
  }

  .zoom:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (prefers-color-scheme: dark) {
    .zoom {
      box-shadow: 0 0px 4px rgba(255, 255, 255, 0.8);
    }
  }
</style>
