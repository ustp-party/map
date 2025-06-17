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

{#if viewportWidth.value >= 600}
  {#if !$collapsedSidebar}
    <div
      class="sidebar"
      transition:slide={{ axis: "x", duration: 300, easing: quintInOut }}
    >
      <div class="content">
        <div class="spacer"></div>
        <div class="divider"></div>
        <div class="container" aria-label="sidebar content">
          <h3>Results</h3>
          <ResultCards />
        </div>
      </div>
    </div>
  {/if}
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
    box-shadow: var(--box-shadow);

    .content {
      padding: 0 8px 0 8px;
      max-width: 100%;

      .container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
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
