<script lang="ts">
  import StarSVG from "$assets/free-icons/star.svg?raw";
  import BuildingSVG from "$assets/free-icons/building.svg?raw";
  import RestroomSVG from "$assets/free-icons/restroom.svg?raw";
  import parkingSVG from "$assets/free-icons/parking.svg?raw";
  import sparkleSVG from "$assets/free-icons/sparkle.svg?raw";

  import SearchOption from "$components/buttons/SearchOption.svelte";
  import ResultCards from "./ResultCards.svelte";
  import DetailedFeature from "./DetailedFeature.svelte";

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
  <DetailedFeature feature={searchState.detailedFeature} />
{:else if searchState.results.length === 0 && queryLength}
  <p class="no-results">No results found for "{searchState.query}"</p>
{:else if searchState.results.length > 0 && queryLength}
  <div class="with-results">
    <h4>Results ({searchState.results.length})</h4>

    <ResultCards features={searchState.results} />
    <footer class="footer">
      <div>
        Not what you were looking for or the data is wrong?<br />Contact us by
        posting an
        <a href="https://github.com/ustp-party/map/issues/new/choose">issue</a>
        or by sending an email to
        <a href="mailto:chrisandrei.irag@1.ustp.edu.ph"
          >chrisandrei.irag@1.ustp.edu.ph</a
        >
      </div>
      <div class="other-links">
        <a
          href="https://github.com/ustp-party/map/blob/master/.github/CONTRIBUTING.md"
          >Contribute</a
        >
        <a
          href="https://www.ustp.edu.ph/cdeo/ustp-cagayan-de-oro-360-virtual-tour/"
          >Official 360 Virtual Tour</a
        >
        <a href="https://liberapay.com/iragca/donate">Donate</a>
      </div>
    </footer>
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
      {@render featured("Gym", "Gymnasium", StarSVG)}
      {@render featured("Gym Lobby", "Gymnasium Lobby", StarSVG)}
      {@render featured("PAT", "Performance Arts Theater", StarSVG)}
      {@render featured("AVR", "Audio Visual Room", StarSVG)}
      {@render featured("Makerspace", "Makerspace", StarSVG)}
      {@render featured("LRC Bldg", "Learning Resource Center", BuildingSVG)}
      {@render featured("Restrooms", "Restroom", RestroomSVG)}
      {@render featured("Parking", "Parking", parkingSVG)}
      {@render featured("Landmarks", "Landmarks", sparkleSVG)}
    </div>
  </div>
  {#if recentlyViewed.length > 0}
    <div class="recently-viewed">
      <h4>Recently Viewed</h4>
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
  a {
    &:hover {
      color: var(--info);
    }
  }
  .recently-viewed {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 0 8px;
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
    margin: 80px 8px 0 8px;
  }

  .introduction {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 80px 32px 32px 32px;
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

  .footer {
    padding: 10px;
    text-align: center;
    color: var(--text-secondary);
    font-size: small;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .other-links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 8px;

      a {
        font-weight: 500;
        color: var(--text-secondary);
        text-decoration: none;

        &::before {
          content: "[";
          color: var(--text);
        }
        &::after {
          content: "]";
          color: var(--text);
        }

        &:hover {
          text-decoration: underline;
          color: var(--info);
        }
      }
    }
  }
</style>
