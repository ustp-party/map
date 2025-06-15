<script lang="ts">
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import closeSVG from "$assets/material-icons/close.svg?raw";
  import searchSVG from "$assets/material-icons/search-24.svg?raw";
  import { getSearchbarInputState } from "$lib/stores/SearchState.svelte";
  import { fade } from "svelte/transition";

  const searchbarInputState = getSearchbarInputState();
</script>

<div class="searchbar" transition:fade={{ duration: 200 }}>
  <input
    type="text"
    placeholder="Search"
    bind:value={searchbarInputState.value}
  />
  <button aria-label="Search">
    <SvgIcon size={24} alt="Search">
      {@html searchSVG}
    </SvgIcon>
  </button>
  {#if searchbarInputState.value.length > 0}
    <div transition:fade={{ duration: 200 }}>
      <button
        class="clear-input"
        aria-label="Clear search input"
        onclick={() => searchbarInputState.update("")}
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
        color: var(--text);
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
    }
  }
</style>
