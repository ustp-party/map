<script lang="ts">
  import { type Snippet } from "svelte";

  let {
    children,
    color,
    alt,
  }: {
    children: Snippet;
    size?: number;
    color?: string;
    alt?: string | undefined;
  } = $props();
</script>

<div class="svg-icon" aria-label={alt}>
  {@render children()}
</div>

<style>
  .svg-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    width: var(--icon-size, 24px);
    height: var(--icon-size, 24px);
    color: var(--icon-color, #00509d); /* fallback */
    transition: color 0.1s ease;
  }
</style>
