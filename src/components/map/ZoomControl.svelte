<script lang="ts">
  import type { Map } from "leaflet";
  import AddIcon from "$components/icons/AddIcon.svelte";
  import RemoveIcon from "$components/icons/RemoveIcon.svelte";
  import { getMapState } from "$lib/stores/mapState.svelte";

  const mapState = getMapState();
  let map: Map = mapState.map!;
  let zoomInDisabled = $derived(mapState.currentZoom >= map.getMaxZoom());
  let zoomOutDisabled = $derived(mapState.currentZoom <= map.getMinZoom());

  function zoomCallback(step: number = -1) {
    const z = map.getZoom();
    const newZoom = z + step;
    map.setZoom(newZoom);
    mapState.currentZoom = newZoom;
  }
</script>

<div class="zoom-control">
  <abbr title="Zoom in">
    <button
      class="zoom in"
      aria-label="Zoom in"
      onclick={() => zoomCallback(1)}
      disabled={zoomInDisabled}
    >
      <AddIcon alt="Zoom in" />
    </button>
  </abbr>
  <abbr title="Zoom out">
    <button
      class="zoom out"
      aria-label="Zoom out"
      onclick={() => zoomCallback(-1)}
      disabled={zoomOutDisabled}
    >
      <RemoveIcon alt="Zoom out" />
    </button>
  </abbr>
</div>

<style>
  .zoom-control {
    pointer-events: auto;
    position: absolute;
    bottom: clamp(32px, 4vw, 44px);
    right: 0px;
    margin-right: clamp(4px, 5vw, 16px);
    display: flex;
    flex-direction: column;
    gap: 2px;
    z-index: 400;
  }

  .zoom {
    background-color: var(--icon-bg);
    border: none;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--box-shadow);
  }

  .zoom.in {
    border-radius: 8px 8px 0 0;
  }
  .zoom.out {
    border-radius: 0 0 8px 8px;
  }

  @media (prefers-color-scheme: dark) {
    .zoom {
      box-shadow: none;
    }
  }
</style>
