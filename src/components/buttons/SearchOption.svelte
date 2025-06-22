<script lang="ts">
  import type { Snippet } from "svelte";
  import SearchOptionIcon from "$components/icons/SearchOptionIcon.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";

  let props = $props<{
    children?: Snippet;
    name?: string;
    value?: string;
    callback?: () => void;
  }>();

  const searchState = getSearchState();
  function btnHandler() {
    searchState.updateQuery(props.value);
    if (props.callback) {
      props.callback();
    }
  }
</script>

<button class="option" aria-label={props.value} onclick={btnHandler}>
  <SearchOptionIcon>
    {@render props.children()}
  </SearchOptionIcon>
  {props.name}
</button>

<style lang="scss">
  .option {
    user-select: none;
    font-weight: 600;
    font-size: 0.8em;
    text-wrap: nowrap;
    color: var(--text);
    fill: var(--text);
    background-color: var(--bg-accent);
    border: 1px solid var(--border);
    padding: 4px 12px;
    border-radius: 12px;
    height: fit-content;
    width: fit-content;
    min-width: none;
    max-width: 100%;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    box-shadow: var(--box-shadow);

    &:hover {
      color: var(--text-hover);
      fill: var(--text-hover);
    }

    @media (prefers-color-scheme: dark) {
      box-shadow: none;
    }
  }
</style>
