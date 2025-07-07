<script lang="ts">
  import Footer from "./Footer.svelte";

  import StarSVG from "$assets/free-icons/star.svg?raw";
  import BuildingSVG from "$assets/free-icons/building.svg?raw";
  import RestroomSVG from "$assets/free-icons/restroom.svg?raw";
  import parkingSVG from "$assets/free-icons/parking.svg?raw";
  import sparkleSVG from "$assets/free-icons/sparkle.svg?raw";
  import monumentSVG from "$assets/free-icons/monument.svg?raw";
  import chevronRightSVG from "$assets/material-icons/chevron-right.svg?raw";
  import basketballSVG from "$assets/free-icons/basketball.svg?raw";

  import SearchOption from "$components/buttons/SearchOption.svelte";
  import ResultCards from "./ResultCards.svelte";
  import DetailedFeature from "./DetailedFeature.svelte";
  import SvgIcon from "$components/icons/SVGIcon.svelte";

  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { getLocalStorageState } from "$lib/stores/localStorage.svelte";

  const searchState = getSearchState();
  const localStorageState = getLocalStorageState();
  let queryLength = $derived(searchState.query.length > 0);
  let recentlyViewed = $derived(
    [...localStorageState.recentlyViewed].reverse()
  );
</script>

{#if searchState.detailedFeature}
  {#key searchState.detailedFeature}
    <DetailedFeature feature={searchState.detailedFeature} />
  {/key}
{:else if searchState.results.length === 0 && queryLength}
  <p class="no-results">No results found for "{searchState.query}"</p>
{:else if searchState.results.length > 0 && queryLength}
  <div class="with-results">
    <h4>Results ({searchState.results.length})</h4>
    <ResultCards features={searchState.results} />
  </div>
{:else}
  <div class="introduction">
    {#if localStorageState.firstVisit}
      <h3>Are you a visitor?</h3>
    {:else}
      <h3>Welcome back!</h3>
    {/if}
    <p class="message">You might be looking for...</p>
    <div class="search-options" aria-label="visitor oriented search options">
      {@render featured("Gym", "Gymnasium", BuildingSVG)}
      {@render featured("Gym Lobby", "Gymnasium Lobby", BuildingSVG)}
      {@render featured("PAT", "Performance Arts Theater", sparkleSVG)}
      {@render featured("ICT-AVR", "ICT Audio Visual Room", sparkleSVG)}
      {@render featured("Makerspace", "Makerspace", StarSVG)}
      {@render featured("LRC Bldg", "Learning Resource Center", BuildingSVG)}
      {@render featured("Restrooms", "Restroom", RestroomSVG)}
      {@render featured("Parking", "Parking", parkingSVG)}
      {@render featured("Landmarks", "Landmarks", monumentSVG)}
      {@render featured("Events", "Event Center", sparkleSVG)}
      {@render featured("Sports", "Sports", basketballSVG)}
    </div>
  </div>
  {#if recentlyViewed.length > 0}
    <details class="recently-viewed">
      <summary>
        <span>
          <SvgIcon>
            {@html chevronRightSVG}
          </SvgIcon>
        </span>
        Recently viewed</summary
      >
      <ResultCards features={recentlyViewed} />
    </details>
  {/if}
{/if}

<Footer />

{#snippet featured(name: string, value: string, icon: string)}
  <SearchOption {name} {value}>
    {@html icon}
  </SearchOption>
{/snippet}

<style lang="scss">
  .recently-viewed {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0 8px;
    margin-bottom: 32px;

    &[open] span {
      transform: rotate(90deg);
      transition: transform 0.2s ease;
    }

    summary {
      list-style: none;
      font-weight: 600;
      font-size: 0.875rem;
      cursor: pointer;
      padding: 8px 0;
      border-bottom: 1px solid var(--border);
      margin: 0 16px 16px 16px;
      display: flex;
      align-items: center;
    }
  }
  .no-results {
    font-size: 0.875rem;
    text-align: center;
    margin-top: 80px;
  }

  .with-results {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 80px 8px 32px 8px;

    @media (max-width: 599px) {
      margin: 8px;
      margin-bottom: 32px;
    }
  }

  .introduction {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 80px 32px 32px 32px;

    @media (max-width: 599px) {
      margin: 16px 16px 32px 16px;
    }
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
</style>
