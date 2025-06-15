<script lang="ts">
  import { type Snippet } from "svelte";

  let {
    children,
    size = 24,
    alt,
  }: {
    children: Snippet;
    size?: number;
    alt?: string | undefined;
  } = $props();
</script>

<div class="svg-icon" aria-label={alt}>
  {@render children()}
</div>

<style lang="scss">
  .svg-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    transition: color 0.1s ease;
    width: 24px;
    height: 24px;
    padding: 0;
    overflow: visible;
  }
</style>
