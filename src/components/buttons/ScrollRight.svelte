<script lang="ts">
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import chevronRightSVG from "$assets/material-icons/chevron-right.svg?raw";
</script>

<button class="scroll-right" aria-label="Scroll Right">
  <SvgIcon size={24} alt="Scroll Right">
    {@html chevronRightSVG}
  </SvgIcon>
</button>

<style lang="scss">
  .scroll-right {
    all: unset;;
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    width: 24px;
    border-radius: 25px;
    border: 2px solid var(--border);
    color: var(--bg);
    border: none;
    background-color: var(--text);
    box-shadow: 0 0px 8px rgba(0, 0, 0, 0.25);

    &:hover {
      color: var(--bg-accent);
    }
  }
</style>
