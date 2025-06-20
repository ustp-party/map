<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import closeSVG from "$assets/material-icons/close.svg?raw";
  import searchSVG from "$assets/material-icons/search-24.svg?raw";

  import { createSearchIndex, searchBooks } from "$lib/utils/searchService";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { buildings } from "$lib/stores/map";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";

  const searchState = getSearchState();
  let searchIndex: any;
  const query = $derived(searchState.query);

  onMount(() => {
    searchIndex = createSearchIndex($buildings!);

    buildings.subscribe((newBooks) => {
      searchIndex = createSearchIndex(newBooks!);
    });
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
      collapsedSidebar.set(false);
    }
  });
</script>

<div class="searchbar">
  <input type="text" placeholder="Search" bind:value={searchState.query} />
  <button aria-label="Search">
    <SvgIcon size={24} alt="Search">
      {@html searchSVG}
    </SvgIcon>
  </button>
  {#if searchState.query.length > 0}
    <div transition:fade={{ duration: 200 }}>
      <button
        class="clear-input"
        aria-label="Clear search input"
        onclick={() => searchState.updateQuery("")}
      >
        <SvgIcon size={24} alt="Clear search input">
          {@html closeSVG}
        </SvgIcon>
      </button>
    </div>
  {/if}
</div>

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
    padding: 8px 16px;
    align-items: center;
    width: clamp(80px, 100%, 400px);
    height: 48px;
    gap: 8px;
    margin-left: clamp(4px, 5vw, 16px);
    margin-right: clamp(4px, 5vw, 16px);
    box-shadow: var(--box-shadow);

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
