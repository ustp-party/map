<script lang="ts">
  import type { Snippet } from "svelte";

  let props = $props<{
    children?: Snippet;
    alt?: string;
    icon?: string;
  }>();
</script>

<button class="option" aria-label={props.alt}>
  {@render props.children()}
</button>

<style lang="scss">
  .option {
    all: unset;
    user-select: none;
    font-weight: 500;
    font-size: 0.8em;
    text-wrap: nowrap;
    text-overflow: ellipsis;
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
