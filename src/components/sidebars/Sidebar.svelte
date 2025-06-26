<script lang="ts">
  import { slide } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";

  import SidebarBtn from "$components/buttons/SidebarBtn.svelte";
  import SidebarContent from "./SidebarContent.svelte";

  import { getAppState } from "$lib/stores/appState.svelte";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";

  const appState = getAppState();

  onMount(() => {
    window.addEventListener("resize", appState.updateViewportWidth);
  });
  onDestroy(() => {
    window.removeEventListener("resize", appState.updateViewportWidth);
  });
</script>

{#if appState.viewportWidth >= 600}
  {#if !$collapsedSidebar}
    <div class="sidebar" transition:slide={{ axis: "x", duration: 100 }}>
      <div class="content">
        <div class="container" aria-label="sidebar content">
          <SidebarContent />
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
    // border-right: 2px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    box-shadow: var(--box-shadow);

    .content {
      // padding: 0 8px 8px 8px;
      max-width: 100%;
      .container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        // padding-top: 64px;
      }
    }
  }

  @media (prefers-color-scheme: dark) {
    .sidebar {
      box-shadow: none;
    }
  }
</style>
