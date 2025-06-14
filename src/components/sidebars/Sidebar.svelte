<script lang="ts">
  import { createViewportWidth } from "$lib/stores/viewport";
  import { setContext } from "svelte";
  import SidebarBtn from "$components/buttons/SidebarBtn.svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { buildings } from "$lib/stores/map";

  const viewportWidth = createViewportWidth();
  const collapsed = writable(true);

  setContext("viewportWidth", viewportWidth);
  setContext("collapsed", collapsed);

  const features = $state($buildings?.features)
</script>

{#if $viewportWidth > 600 && !$collapsed}
  <div
    class="sidebar"
    transition:slide={{ axis: "x", duration: 300, easing: quintInOut }}
  >
    <div class="spacer"></div>
    <div class="divider"></div>
    <div class="cards">
      {#if features && features.length > 0}
        {#each features as building}
          <div class="card">
            <h3>{building.properties.name}</h3>
          </div>
        {/each}
      {:else}
        <p>Loading buildings…</p>
      {/if}
    </div>
  </div>
{/if}
{#if $viewportWidth > 600}
  <SidebarBtn />
{/if}

<style>
  .sidebar {
    position: absolute;
    top: 0;
    width: 438px;
    overflow: auto;
    height: 100%;
    z-index: 999;
    background-color: var(--bg);
    border-right: 2px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.8);
  }
  
  .cards {
    overflow: auto;;
    display: flex;
    flex-direction: column;
    padding: clamp(8px, 2vw, 16px);
    gap: clamp(8px, 2vw, 16px);
  }

  .divider {
    min-height: 1px;
    width: 100%;
    background-color: var(--bg-accent);
    margin: clamp(4px, 2vw, 8px) 0;
  }

  .spacer {
    height: 100px;
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
