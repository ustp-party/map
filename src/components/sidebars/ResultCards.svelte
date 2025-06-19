<script lang="ts">
  import ResultCard from "$components/buttons/ResultCard.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  const searchState = getSearchState();
  const queryLength = $derived(searchState.query.length > 0);
</script>

<div class="cards">
  {#key searchState.results}
    {#if searchState.results.length === 0 && queryLength}
      <p class="message">No results found for "{searchState.query}"</p>
    {:else if searchState.results.length > 0 && queryLength}
      {#each searchState.results as feature}
        <ResultCard {feature} />
      {/each}
      <p class="message">
        Not what you were looking for?<br />Contact us by posting an
        <a href="https://github.com/ustp-party/map/issues/new/choose">issue</a>
        or by sending an email to
        <a href="mailto:chrisandrei.irag@1.ustp.edu.ph"
          >chrisandrei.irag@1.ustp.edu.ph</a
        >
      </p>
    {:else}
      <p class="message">Start typing to search for places.</p>
    {/if}
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
  }

  .message {
    padding: 10px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
</style>
