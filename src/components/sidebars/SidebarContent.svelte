<script lang="ts">
  import StarSVG from "$assets/free-icons/star.svg?raw";
  import BuildingSVG from "$assets/free-icons/building.svg?raw";
  import RestroomSVG from "$assets/free-icons/restroom.svg?raw";

  import SearchOption from "$components/buttons/SearchOption.svelte";
  import ResultCards from "./ResultCards.svelte";

  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { getLocalStorageState } from "$lib/stores/localStorage.svelte";

  const searchState = getSearchState();
  const localStorageState = getLocalStorageState();
  let queryLength = $derived(searchState.query.length > 0);
  let recentlyViewed = $derived([...localStorageState.recentlyViewed].reverse());
</script>

{#if searchState.results.length === 0 && queryLength}
  <p class="no-results">No results found for "{searchState.query}"</p>
{:else if searchState.results.length > 0 && queryLength}
  <h4 class="header">Results ({searchState.results.length})</h4>
  <ResultCards features={searchState.results} />
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
    {#if localStorageState.firstVisit}
      <h3>Are you a visitor?</h3>
    {:else}
      <h3>Welcome back!</h3>
    {/if}
    <p class="message">You might be looking for...</p>
    <div class="search-options">
      {@render featured("Gym", "Gymnasium", StarSVG)}
      {@render featured("Gym Lobby", "Gymnasium Lobby", StarSVG)}
      {@render featured("AVR", "Audio Visual Room", StarSVG)}
      {@render featured("Makerspace", "Makerspace", StarSVG)}
      {@render featured("LRC Bldg", "Learning Resource Center", BuildingSVG)}
      {@render featured("Restrooms", "Restroom", RestroomSVG)}
    </div>
  </div>
  {#if recentlyViewed.length > 0}
    <div class="recently-viewed">
      <h4 class="header">Recently Viewed</h4>
      <ResultCards features={recentlyViewed} />
    </div>
  {/if}
{/if}

{#snippet featured(name: string, value: string, icon: string)}
  <SearchOption {name} {value}>
    {@html icon}
  </SearchOption>
{/snippet}

<style lang="scss">
  .header {
    margin: 16px 0 8px 8px;
  }
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
