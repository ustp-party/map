<script lang="ts">
  import SidebarContent from "./SidebarContent.svelte";
  import Footer from "./Footer.svelte";
  import { getAppState } from "$lib/stores/appState.svelte";

  const appState = getAppState();
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
      appState.collapsedSidebar = true
    } else {
      // Snap open
      panel!.style.transform = `translateY(0)`;
      appState.collapsedSidebar = false;
    }

    offsetY = 0;

    // Clean up
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", endGrab);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", endGrab);
  }

  $effect(() => {
    if (appState.collapsedSidebar) {
      panel!.style.transition = "transform 0.3s ease";
      panel!.style.transform = `translateY(calc(100% - 40px))`;
    } else {
      panel!.style.transform = `translateY(0)`;
    }
  });
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
  <div class="container" aria-label="drawer content">
    <SidebarContent />
  </div>
</div>

<style lang="scss">
  .pull-up-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: max(300px, calc(var(--viewport-height) * 0.8));
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

    .container {
      height: calc(100% - 40px);
      overflow: auto;
      display: flex;
      flex-direction: column;
      padding-bottom: 32px;
      // padding-left: clamp(4px, 2vw + 1px, 8px);
      // padding-right: clamp(4px, 2vw + 1px, 8px);
    }
  }
</style>
