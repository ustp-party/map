<script lang="ts">
  import iconRaw from "$icons/arrow-left-24.svg?raw";

  let props = $props<{
    size?: number;
    color?: string;
    alt?: string | undefined;
    direction?: "left" | "right" | "up" | "down";
  }>();
  const direction = props.direction || "left";
</script>

<div class={`svg-icon ${direction}`} aria-label={props.alt}>
  {@html iconRaw}
</div>

<style>
  .svg-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    width: var(--icon-size, 24px);
    height: 100%;
    color: var(--icon-color, #00509d); /* fallback */
    transition: color 0.1s ease;
  }

  .svg-icon:hover {
    color: var(--bg-accent);
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
