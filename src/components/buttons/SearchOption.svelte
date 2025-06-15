<script lang="ts">
  import type { Snippet } from "svelte";

  import { getSearchbarInputState } from "$lib/stores/SearchState.svelte";
  import SearchOptionIcon from "$components/icons/SearchOptionIcon.svelte";

  let props = $props<{
    children?: Snippet;
    name?: string;
    value?: string;
  }>();

  const searchbarInputState = getSearchbarInputState();
  function btnHandler() {
    searchbarInputState.update(props.value);
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
    max-width: 100%;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
      color: var(--text-hover);
      fill: var(--text-hover);
    }
  }
</style>
