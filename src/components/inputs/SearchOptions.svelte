<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import chevronRightSVG from "$assets/material-icons/chevron-right.svg?raw";
  import chevronLeftSVG from "$assets/material-icons/chevron-left.svg?raw";
  import rotcSVG from "$assets/free-icons/person-military-rifle.svg?raw";
  import SearchOption from "$components/buttons/SearchOption.svelte";
  import BuildingSVG from "$assets/free-icons/building.svg?raw";
  import burgerSodaSVG from "$assets/free-icons/burger-soda.svg?raw";
  import printerSVG from "$assets/free-icons/printer.svg?raw";

  import { getAppState } from "$lib/stores/appState.svelte";
  import { getMapState } from "$lib/stores/mapState.svelte";

  let divRef: HTMLDivElement | undefined = $state(undefined);
  let isOverflowing = $state(false);
  let scrollLeft: number = $state(0);
  let appState = getAppState();
  let mapState = getMapState();
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
      scrollLeft = el.scrollLeft;
    }
  }

  function overflowHandler() {
    isOverflowing = checkOverflow(divRef);
  }

  function scrollHandler() {
    scrollLeft = divRef!.scrollLeft;
  }
  onMount(() => {
    if (divRef) {
      isOverflowing = checkOverflow(divRef);
      divRef.addEventListener("scroll", scrollHandler);
    }

    window.addEventListener("resize", overflowHandler);
  });

  onDestroy(() => {
    window.removeEventListener("scroll", scrollHandler);
    window.removeEventListener("resize", overflowHandler);
  });
</script>

<div
  class="options"
  bind:this={divRef}
  aria-label="Student oriented search options"
>
  {#if isOverflowing && appState.viewportWidth >= 600}
    <button
      class="scroll left"
      aria-label="Scroll Left"
      onclick={() => scrollToLeft(divRef)}
      disabled={scrollLeft === 0}
    >
      <abbr title="Scroll left">
        <SvgIcon size={24} alt="Scroll Left">
          {@html chevronLeftSVG}
        </SvgIcon>
      </abbr>
    </button>
  {/if}
  {@render featured("Cafeteria", "Cafeteria", burgerSodaSVG)}
  {@render featured("Printing", "Printing Services", printerSVG, () => {
    mapState.enablePrintingServices = true;
  })}
  {@render featured(
    "CITC Bldg",
    "Information and Communications Technology Building",
    BuildingSVG
  )}
  {@render featured("CEA Bldg", "Engineering Complex I/II", BuildingSVG)}
  {@render featured("CSM Bldg", "Science Complex (41)", BuildingSVG)}
  {@render featured("COT Bldg", "Technology Building", BuildingSVG)}
  {@render featured(
    "ROTC Field",
    "Reserve Officers' Training Corps Field",
    rotcSVG, () => {
      mapState.enableSportsAreas = true;
    }
  )}

  {#if isOverflowing && appState.viewportWidth >= 600}
    <button
      class="scroll"
      aria-label="Scroll Right"
      onclick={() => scrollToRight(divRef)}
      disabled={scrollLeft + divRef!.clientWidth == divRef!.scrollWidth}
    >
      <abbr title="Scroll right">
        <SvgIcon size={24} alt="Scroll Right">
          {@html chevronRightSVG}
        </SvgIcon>
      </abbr>
    </button>
  {/if}
</div>

{#snippet featured(
  name: string,
  value: string,
  icon: string,
  callback?: () => void
)}
  <SearchOption {name} {value} {callback}>
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

    overflow-x: auto;
    cursor: grab;
    scrollbar-width: none;
    margin-left: clamp(4px, 5vw, 16px);

    padding-top: 4px;
    padding-bottom: 4px;
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
    box-shadow: var(--box-shadow);

    @media (prefers-color-scheme: dark) {
      box-shadow: none;
    }

    &:hover {
      color: var(--bg-accent);
    }
  }

  .left {
    left: 0;
  }
</style>
