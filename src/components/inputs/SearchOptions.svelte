<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import chevronRightSVG from "$assets/material-icons/chevron-right.svg?raw";
  import chevronLeftSVG from "$assets/material-icons/chevron-left.svg?raw";
  import SearchOption from "$components/buttons/SearchOption.svelte";
  import StarSVG from "$assets/free-icons/star.svg?raw";
  import BuildingSVG from "$assets/free-icons/building.svg?raw";
  import RestroomSVG from "$assets/free-icons/restroom.svg?raw";
  import burderSodaSVG from "$assets/free-icons/burger-soda.svg?raw";

  import { getViewportWidthState } from "$lib/stores/ViewportWidthState.svelte";
  let divRef: HTMLDivElement | undefined = $state(undefined);
  let isOverflowing = $state(false);
  let scrollLeft: number = $state(0);
  let viewportWidth = getViewportWidthState();
  const scrollStep = 240;

  function checkOverflow(el: HTMLDivElement | undefined): boolean {
    return el!.scrollWidth > el!.clientWidth;
  }

  function scrollToRight(el: HTMLDivElement | undefined): void {
    if (el) {
      el.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
      scrollLeft = el.scrollLeft;
    }
  }

  function scrollToLeft(el: HTMLDivElement | undefined): void {
    if (el) {
      el.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    }
  }

  onMount(() => {
    if (divRef) {
      isOverflowing = checkOverflow(divRef);
      divRef.addEventListener("scroll", () => {
        scrollLeft = divRef!.scrollLeft;
      });
    }

    window.addEventListener("resize", () => {
      isOverflowing = checkOverflow(divRef);
    });
  });

  onDestroy(() => {
    window.removeEventListener("resize", () => {
      isOverflowing = checkOverflow(divRef);
    });
  });
</script>

<div class="options" bind:this={divRef}>
  {#if isOverflowing && viewportWidth.value >= 600}
    <button
      class="scroll left"
      aria-label="Scroll Left"
      onclick={() => scrollToLeft(divRef)}
      disabled={scrollLeft === 0}
    >
      <SvgIcon size={24} alt="Scroll Left">
        {@html chevronLeftSVG}
      </SvgIcon>
    </button>
  {/if}
  {@render featured("Gymnasium", "Gymnasium", StarSVG)}
  {@render featured("AVR", "Audio Visual Room", StarSVG)}
  {@render featured("LRC Bldg", "Learning Resource Center", BuildingSVG)}
  {@render featured("Restrooms", "Restrooms", RestroomSVG)}
  {@render featured("Cafeteria", "Cafeteria", burderSodaSVG)}

  {#if isOverflowing && viewportWidth.value >= 600}
    <button
      class="scroll"
      aria-label="Scroll Right"
      onclick={() => scrollToRight(divRef)}
      disabled={scrollLeft + divRef!.clientWidth == divRef!.scrollWidth}
    >
      <SvgIcon size={24} alt="Scroll Right">
        {@html chevronRightSVG}
      </SvgIcon>
    </button>
  {/if}
</div>

{#snippet featured(name: string, value: string, icon: string)}
  <SearchOption {name} {value}>
    {@html icon}
  </SearchOption>
{/snippet}

<style lang="scss">
  .options {
    flex-shrink: 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    overflow: auto;
    cursor: grab;
    scrollbar-width: none;
    margin-left: clamp(4px, 5vw, 16px);
    &:active {
      cursor: grabbing;
    }
  }

  @media (max-width: 599px) {
    .options {
      padding-left: clamp(4px, 5vw, 16px);
      padding-right: clamp(4px, 5vw, 16px);
      margin-left: 0;
    }
  }

  @media (min-width: 600px) {
    .options {
      margin-right: clamp(4px, 5vw, 16px);
      border-radius: 25px;
    }
  }

  .scroll {
    all: unset;
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    width: fit-content;
    border-radius: 25px;
    color: var(--bg);
    border: none;
    background-color: var(--text);
    box-shadow: 0 1px 2px rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15);

    @media (prefers-color-scheme: dark) {
      box-shadow: 0 1px 2px rgba(255,255,255,0.3),0 1px 3px 1px rgba(255,255,255,0.15);
    }

    &:hover {
      color: var(--bg-accent);
    }
  }

  .left {
    left: 0;
  }
</style>
