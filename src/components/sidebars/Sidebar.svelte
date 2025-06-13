<script lang="ts">
  import { createViewportWidth } from "$lib/stores/viewport";
  import { setContext } from "svelte";
  import SidebarBtn from "$components/buttons/SidebarBtn.svelte";
  import { get, writable } from "svelte/store";

  const viewportWidth = createViewportWidth();
  const collapsed = writable(true);

  setContext("viewportWidth", viewportWidth);
  setContext("collapsed", collapsed);
</script>

{#if $viewportWidth > 600 && !$collapsed}
  <div class="sidebar">
    <div class="spacer"></div>
    <div class="divider"></div>
  </div>
{/if}
{#if $viewportWidth > 600}
  <SidebarBtn />
{/if}

<style>
  .divider {
    height: 1px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    margin: clamp(4px, 2vw, 8px) 0;
  }

  .sidebar {
    position: absolute;
    top: 0;
    width: 438px;
    overflow: auto;
    height: 100%;
    z-index: 999;
    background-color: rgba(255, 255, 255, 1);
    border-right: 2px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  }

  .spacer {
    height: 100px;
  }

  @media (prefers-color-scheme: dark) {
    .sidebar {
      background-color: rgb(41, 41, 41);
      border-right: 2px solid rgba(255, 255, 255, 0.1);
      color: white;
    }

    .divider {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
