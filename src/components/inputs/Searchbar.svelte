<script lang="ts">
  import { fade } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";
  import { replaceState } from "$app/navigation";

  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import closeSVG from "$assets/material-icons/close.svg?raw";
  import searchSVG from "$assets/material-icons/search-24.svg?raw";
  import arrowBackSVG from "$assets/material-icons/arrow-back.svg?raw";

  import { createSearchIndex, searchBooks } from "$lib/utils/searchService";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { allFeatures } from "$lib/stores/mapState.svelte";
  import { getAppState } from "$lib/stores/appState.svelte";

  const appState = getAppState();
  const searchState = getSearchState();
  const query = $derived(searchState.query);
  let searchIndex: any;

  function handleGoBack() {
    searchState.updateDetailedFeature(undefined);
    replaceState("/", "");
  }

  const onPopState = (event: PopStateEvent) => {
    handleGoBack();
  };
  onMount(() => {
    searchIndex = createSearchIndex($allFeatures!);

    allFeatures.subscribe((newBooks) => {
      searchIndex = createSearchIndex(newBooks!);
    });

    window.addEventListener("keydown", () => {
      document.getElementById("searchbar")?.focus();
    });

    window.addEventListener("popstate", onPopState);
  });

  onDestroy(() => {
    window.removeEventListener("keydown", () => {
      document.getElementById("searchbar")?.focus();
    });

    window.removeEventListener("popstate", onPopState);
  });

  function handleSearch() {
    const results = searchBooks(searchIndex, query);
    searchState.updateResults(
      results.map((result) => ({
        ...result.item,
        score: result.score,
      }))
    );
  }

  $effect(() => {
    if (query.length === 0) {
      searchState.updateResults([]);
    } else {
      handleSearch();
      appState.collapsedSidebar = false;
    }
  });
</script>

<search class="searchbar">
  {#if searchState.detailedFeature}
    <div transition:fade={{ duration: 200 }}>
      <abbr title="Go back">
        <button class="clear-input" aria-label="Go back" onclick={handleGoBack}>
          <SvgIcon size="24px" alt="Go back">
            {@html arrowBackSVG}
          </SvgIcon>
        </button>
      </abbr>
    </div>
  {/if}
  <input
    id="searchbar"
    type="text"
    placeholder="Search"
    bind:value={searchState.query}
  />
  <SvgIcon size="24px" alt="Search" color="var(--icon-subtle)">
    {@html searchSVG}
  </SvgIcon>
  {#if searchState.query.length > 0}
    <div transition:fade={{ duration: 200 }}>
      <abbr title="Clear search input">
        <button
          class="clear-input"
          aria-label="Clear search input"
          onclick={() => searchState.updateQuery("")}
        >
          <SvgIcon size="24px" alt="Clear search input">
            {@html closeSVG}
          </SvgIcon>
        </button>
      </abbr>
    </div>
  {/if}
</search>

<style lang="scss">
  .searchbar {
    flex-shrink: 7;
    display: flex;
    position: sticky;
    top: 0;
    pointer-events: visibleFill;
    background-color: var(--bg-accent);
    border: 1px solid var(--border);
    border-radius: 25px;
    padding: 0px 16px;
    align-items: center;
    width: clamp(80px, 100%, 400px);
    height: 48px;
    gap: 8px;
    margin-left: clamp(4px, 5vw, 16px);
    margin-right: clamp(4px, 5vw, 16px);
    box-shadow: var(--box-shadow);

    div {
      height: 100%;
    }
    input {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
      font-size: 1em;
      font-weight: 500;
      outline: none;
      color: var(--text);

      &::placeholder {
        color: var(--text-placeholder);
        font-weight: 400;
      }
    }
  }

  button {
    all: unset;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: var(--icon-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &:hover {
      color: var(--icon-color);
      background-color: transparent;
    }
  }
  @media (prefers-color-scheme: dark) {
    .searchbar {
      background-color: var(--bg-accent);
      box-shadow: none;
    }
    button {
      &:hover {
        color: var(--icon-color);
        background-color: transparent;
      }
    }
  }
</style>
