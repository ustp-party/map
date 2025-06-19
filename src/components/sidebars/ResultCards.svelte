<script lang="ts">
  import ResultCard from "$components/buttons/ResultCard.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  const searchState = getSearchState();
</script>

<div class="cards">
  {#key searchState.results}
    <h4 class="header">Results ({searchState.results.length})</h4>
    {#each searchState.results as feature}
      <ResultCard {feature} />
    {/each}
  {/key}
</div>

<style lang="scss">
  .cards {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 12px;
    width: 100%;
    overflow: hidden;

    .header {
      margin: 16px 0 8px 8px;
    }
  }
</style>
