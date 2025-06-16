<script lang="ts">
  import type { Feature } from "$lib/types/features";
  import ResultCard from "$components/buttons/ResultCard.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { buildings } from "$lib/stores/map";
  const searchState = getSearchState();
  const buildingsData: Feature[] = $buildings!;
</script>

<div class="cards">
  {#if searchState.results.length === 0 && searchState.query.length > 0}
    No results found for "{searchState.query}"
  {:else if searchState.query.length === 0}
    {#each buildingsData as feature}
      <ResultCard {feature} />
    {/each}
  {:else}
    {#each searchState.results as feature}
      <ResultCard {feature} />
    {/each}
  {/if}
</div>

<style lang="scss">
  .cards {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 12px;
    width: 100%;
    overflow: hidden;
  }
</style>
