<script lang="ts">
  import { prefersDarkMode } from "$lib/utils/theme";
  import { onMount } from "svelte";

  let props = $props<{
    name: string;
  }>();

  const ICONS_DIR = "/material-icons";

  let icon = $state<string>("");

  onMount(() => {
    icon = prefersDarkMode()
      ? `${ICONS_DIR}/${props.name}-24-dark.svg`
      : `${ICONS_DIR}/${props.name}-24-light.svg`;
  });
</script>

<img src={icon} alt="Search" class="material-icons" />

<style>
  .material-icons {
    width: 24px;
    height: 24px;
  }
</style>
