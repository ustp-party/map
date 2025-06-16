<script lang="ts">
  import type { Feature } from "$lib/types/features";
  import { setContext } from "svelte";
  import { slide } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import { onMount } from "svelte";

  import ResultCard from "$components/buttons/ResultCard.svelte";
  import SidebarBtn from "$components/buttons/SidebarBtn.svelte";

  import { getViewportWidthState } from "$lib/stores/ViewportWidthState.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { buildings } from "$lib/stores/map";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";

  const viewportWidth = getViewportWidthState();
  const searchState = getSearchState();
  const buildingsData: Feature[] = $buildings!;

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
    <div class="spacer"></div>
    <div class="divider"></div>
    <div class="cards">
      {#if searchState.results.length === 0 && searchState.query.length > 0}
        No results found for "{searchState.query}"
      {:else if searchState.query.length === 0}
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
{/if}
{#if viewportWidth.value >= 600}
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
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding: clamp(8px, 2vw, 16px);
    gap: clamp(8px, 2vw, 16px);
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
