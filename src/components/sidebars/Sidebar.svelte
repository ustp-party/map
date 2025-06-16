<script lang="ts">
  import { slide } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { onMount } from "svelte";

  import SidebarBtn from "$components/buttons/SidebarBtn.svelte";
  import ResultCards from "./ResultCards.svelte";

  import { getViewportWidthState } from "$lib/stores/ViewportWidthState.svelte";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";

  const viewportWidth = getViewportWidthState();

  onMount(() => {
    window.addEventListener("resize", viewportWidth.update);
    return () => window.removeEventListener("resize", viewportWidth.update);
  });
</script>

{#if viewportWidth.value >= 600 && !$collapsedSidebar}
  <div
    class="sidebar"
    transition:slide={{ axis: "x", duration: 300, easing: quintInOut }}
  >
    <div class="content">
      <div class="spacer"></div>
      <div class="divider"></div>
      <ResultCards />
    </div>
  </div>
{/if}
{#if viewportWidth.value >= 600}
  <SidebarBtn />
{/if}

<style lang="scss">
  .sidebar {
    position: absolute;
    width: 100%;
    max-width: 438px;
    overflow: auto;
    height: 100%;
    z-index: 999;
    background-color: var(--bg);
    border-right: 2px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);

    .content {
      padding: 0 8px 0 8px;
      max-width: 100%;
    }
  }

  .divider {
    min-height: 1px;
    width: 100%;
    background-color: var(--accent-2);
    margin: clamp(4px, 2vw, 8px) 0;
  }

  .spacer {
    min-height: 100px;
  }

  @media (prefers-color-scheme: dark) {
    .sidebar {
      border-right: 2px solid rgba(255, 255, 255, 0.1);
    }

    .divider {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
