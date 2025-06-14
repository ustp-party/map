<script lang="ts">
  import iconRaw from "$icons/search-24.svg?raw";
  import MaterialStaticIcon from "./MaterialStaticIcon.svelte";
  import { type Snippet } from "svelte";

  let {
    children,
    size = 24,
    color,
    alt,
  }: {
    children?: Snippet;
    size?: number;
    color?: string;
    alt?: string | undefined;
  } = $props();
</script>

<MaterialStaticIcon {size} {color} {alt}>
  {@html iconRaw}
  {#if children}
    {@render children()}
  {/if}
</MaterialStaticIcon>
