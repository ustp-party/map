<script lang="ts">
  import StarSVG from "$assets/free-icons/star.svg?raw";
  import BuildingSVG from "$assets/free-icons/building.svg?raw";
  import RestroomSVG from "$assets/free-icons/restroom.svg?raw";

  import SearchOption from "$components/buttons/SearchOption.svelte";
  import ResultCards from "./ResultCards.svelte";

  import { getSearchState } from "$lib/stores/SearchState.svelte";

  const searchState = getSearchState();
  const queryLength = $derived(searchState.query.length > 0);
</script>

{#if searchState.results.length === 0 && queryLength}
  <p class="no-results">No results found for "{searchState.query}"</p>
{:else if searchState.results.length > 0 && queryLength}
  <ResultCards />
  <p class="support-message">
    Not what you were looking for?<br />Contact us by posting an
    <a href="https://github.com/ustp-party/map/issues/new/choose">issue</a>
    or by sending an email to
    <a href="mailto:chrisandrei.irag@1.ustp.edu.ph"
      >chrisandrei.irag@1.ustp.edu.ph</a
    >
  </p>
{:else}
  <div class="introduction">
    <h3>Are you a visitor?</h3>
    <p class="message">You might be looking for...</p>
    <div class="search-options">
      {@render featured("Gymnasium", "Gymnasium", StarSVG)}
      {@render featured("AVR", "Audio Visual Room", StarSVG)}
      {@render featured("LRC Bldg", "Learning Resource Center", BuildingSVG)}
      {@render featured("Restrooms", "Restroom", RestroomSVG)}
    </div>
  </div>
  <div class="recently-viewed"></div>
{/if}

{#snippet featured(name: string, value: string, icon: string)}
  <SearchOption {name} {value}>
    {@html icon}
  </SearchOption>
{/snippet}

<style lang="scss">
  .no-results {
    font-size: 0.875rem;
    text-align: center;
    margin-top: 16px;
  }
  .introduction {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 32px;
    .message {
      font-size: 0.875rem;
    }

    .search-options {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 16px;
    }
  }

  .support-message {
    padding: 10px;
    text-align: center;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
</style>
