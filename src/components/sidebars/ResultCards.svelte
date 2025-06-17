<script lang="ts">
  import type { Feature } from "$lib/types/features";
  import ResultCard from "$components/buttons/ResultCard.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { buildings } from "$lib/stores/map";
  const searchState = getSearchState();
  const buildingsData: Feature[] = $buildings!;
</script>

<div class="cards">
  {#if searchState.results.length === 0 && searchState.query.length > 2}
    <p class="message">No results found for "{searchState.query}"</p>
  {:else if searchState.results.length > 0 && searchState.query.length > 2}
    {#each searchState.results as feature}
      <ResultCard {feature} />
    {/each}
  {:else if searchState.query.length > 0}
    <p class="message">
      Type at least 3 characters to search for better accuracy.
    </p>
  {:else}
    <p class="message">Start typing to search for places.</p>
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

  .message {
    padding: 10px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 14px;
  }
</style>
