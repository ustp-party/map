<script lang="ts">
  import type { Feature } from "$lib/types/features";

  import ResultCard from "$components/buttons/ResultCard.svelte";

  import { buildings } from "$lib/stores/map";
  import { getSearchState } from "$lib/stores/SearchState.svelte";

  const searchState = getSearchState();
  const buildingsData: Feature[] = $buildings!;
  let panel: HTMLElement | null = null;
  let startY = 0;
  let currentY = $state(0);
  let offsetY = 0;
  let dragging = $state(false);

  function startGrab(event: MouseEvent | TouchEvent) {
    dragging = true;
    startY = "touches" in event ? event.touches[0].clientY : event.clientY;
    panel!.style.transition = "none";

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", endGrab);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", endGrab);
  }

  function onMove(event: MouseEvent | TouchEvent) {
    if (!dragging) return;
    currentY = "touches" in event ? event.touches[0].clientY : event.clientY;
    offsetY = currentY - startY;

    // Prevent moving up too far
    offsetY = Math.max(0, offsetY);

    panel!.style.transform = `translateY(${offsetY}px)`;
  }

  function endGrab() {
    dragging = false;
    panel!.style.transition = "transform 0.3s ease";

    if (offsetY > 100) {
      // Close it fully (just show handle)
      panel!.style.transform = `translateY(calc(100% - 40px))`;
    } else {
      // Snap open
      panel!.style.transform = `translateY(0)`;
    }

    offsetY = 0;

    // Clean up
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", endGrab);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", endGrab);
  }
</script>

<div class="pull-up-panel" bind:this={panel}>
  <button
    class="handle"
    ontouchstart={startGrab}
    onmousedown={startGrab}
    aria-label="Pull up panel"
  >
    <div class="indicator"></div>
  </button>
  <div class="content">
    <div class="cards">
      {#if searchState.results.length === 0}
        {#each buildingsData as feature}
          <ResultCard
            title={feature.properties.name}
            description={feature.properties.description}
            levels={feature.properties["building:levels"]}
            bldg_no={feature.properties["addr:housenumber"]}
          />
        {/each}
      {:else}
        {#each searchState.results as feature}
          <ResultCard
            title={feature.properties.name}
            description={feature.properties.description}
            levels={feature.properties["building:levels"]}
            bldg_no={feature.properties["addr:housenumber"]}
          />
        {/each}
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .pull-up-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: clamp(300px, 80vh, 80vh);
    background: var(--bg);
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(calc(100% - 40px)); // show just the handle initially
    touch-action: none;
    z-index: 1000;

    .handle {
      width: 100%;
      height: 40px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      border: none;

      .indicator {
        width: 40px;
        height: 5px;
        background: var(--icon-color);
        border-radius: 4px;
      }
    }

    .content {
      height: calc(100% - 40px);
      overflow: auto;
      padding: 1rem;
    }
  }
</style>
