<script lang="ts">
  import { darkTheme, lightTheme } from "$lib/theme";
  import iconRaw from "$icons/my-location-24.svg?raw";
  import { darkMode } from "$lib/stores/theme";

  let props = $props<{
    size?: number;
    color?: string;
    alt?: string | undefined;
  }>();

  const fillColor =
    props.color || ($darkMode ? darkTheme.text : lightTheme.text);

  const size = $state(props.size || 24);
</script>

<div
  class="svg-icon"
  style="width: {size}px; height: {size}px; color: {fillColor};"
  aria-label={props.alt}
>
  {@html iconRaw}
</div>

<style>
  .svg-icon {
    display: inline-block;
  }
</style>
