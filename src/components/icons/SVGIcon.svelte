<script lang="ts">
  import { type Snippet } from "svelte";

  let {
    children,
    size = 24,
    alt,
    fixed = false,
  }: {
    children: Snippet;
    size?: number;
    alt?: string | undefined;
    fixed?: boolean;
  } = $props();
</script>

<div
  class={`svg-icon ${fixed ? "fixed" : ""}`}
  aria-label={alt}
  style="width: {size}px; height: {size}px;"
>
  {@render children()}
</div>

<style lang="scss">
  .svg-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    transition: color 0.1s ease;
    padding: 0;
    overflow: visible;
  }

  .svg-icon .fixed {
    color: var(--icon-color);
  }
</style>
