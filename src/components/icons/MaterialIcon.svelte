<script lang="ts">
  import { prefersDarkMode } from "$lib/utils/theme";
  import { onMount } from "svelte";
  import { base } from "$app/paths";

  let props = $props<{
    name: string;
    alt?: string | undefined;
  }>();

  const ICONS_DIR = "material-icons";

  let icon = $state<string>("");

  onMount(() => {
    icon = prefersDarkMode()
      ? `${base}/${ICONS_DIR}/${props.name}-24-dark.svg`
      : `${base}/${ICONS_DIR}/${props.name}-24-light.svg`;
  });
</script>

<img src={icon} class="material-icons" alt={props.alt} />

<style>
  .material-icons {
    width: 24px;
    height: 24px;
  }
</style>
