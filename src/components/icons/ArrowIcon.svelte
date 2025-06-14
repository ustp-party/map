<script lang="ts">
  import { darkTheme, lightTheme } from "$lib/theme";
  import iconRaw from "$icons/arrow-left-24.svg?raw";
  import { darkMode } from "$lib/stores/theme";

  let props = $props<{
    size?: number;
    color?: string;
    alt?: string | undefined;
    direction?: "left" | "right" | "up" | "down";
  }>();

  const fillColor =
    props.color || ($darkMode ? darkTheme.text : lightTheme.text);
  const size = props.size || 24;
  const direction = props.direction || "left";
</script>

<div
  class={`svg-icon ${direction}`}
  style="width: {size}px; height: {size}px; color: {fillColor};"
  aria-label={props.alt}
>
  {@html iconRaw}
</div>

<style>
  .svg-icon {
    display: inline-block;
    fill: currentColor;
  }
  .svg-icon.right {
    transform: rotate(180deg);
  }
  .svg-icon.up {
    transform: rotate(-90deg);
  }
  .svg-icon.down {
    transform: rotate(90deg);
  }
</style>
