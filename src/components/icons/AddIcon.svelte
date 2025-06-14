<script lang="ts">
  import iconRaw from "$icons/add-24.svg?raw";
  import MaterialIcon from "./MaterialIcon.svelte";
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

<MaterialIcon {size} {color} {alt}>
  {@html iconRaw}
  {#if children}
    {@render children()}
  {/if}
</MaterialIcon>
