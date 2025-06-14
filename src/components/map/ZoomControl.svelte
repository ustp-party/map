<script lang="ts">
  import AddIcon from "$components/icons/AddIcon.svelte";
  import RemoveIcon from "$components/icons/RemoveIcon.svelte";
  import { getContext } from "svelte";
  import type { Map } from "leaflet";
  import { currentZoom } from "$lib/stores/map";

  const mapContext = getContext<{ getMap: () => Map }>("map");
  let map: Map = mapContext.getMap();
  let zoomInDisabled = $derived($currentZoom >= map.getMaxZoom());
  let zoomOutDisabled = $derived($currentZoom <= map.getMinZoom());

  function zoomInCallback() {
    currentZoom.update((z) => {
      const newZoom = z + 1;
      map.setZoom(newZoom);
      return newZoom;
    });
  }

  function zoomOutCallback() {
    currentZoom.update((z) => {
      const newZoom = z - 1;
      map.setZoom(newZoom);
      return newZoom;
    });
  }
</script>

<div class="zoom-control">
  <button
    class="zoom in"
    aria-label="Zoom In"
    onclick={zoomInCallback}
    disabled={zoomInDisabled}
  >
    <AddIcon alt="Zoom in" />
  </button>
  <button
    class="zoom out"
    aria-label="Zoom Out"
    onclick={zoomOutCallback}
    disabled={zoomOutDisabled}
  >
    <RemoveIcon alt="Zoom out" />
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

  @media (prefers-color-scheme: dark) {
    .zoom {
      box-shadow: 0 0px 4px rgba(255, 255, 255, 0.8);
    }
  }
</style>
