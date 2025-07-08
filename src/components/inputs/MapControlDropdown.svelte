<script lang="ts">
  import restroomSVG from "$assets/free-icons/restroom.svg?raw";
  import printerSVG from "$assets/free-icons/printer.svg?raw";
  import landmarkSVG from "$assets/free-icons/monument.svg?raw";
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import { getMapState } from "$lib/stores/mapState.svelte";
  import { slide } from "svelte/transition";
  import { mapTheme } from "$lib/theme";

  const mapState = getMapState();
</script>

{#snippet divLegend(
  color: string = "transparent",
  size: string = "1em",
  icon: string | undefined = undefined,
  iconSize: string = "0.8em",
  iconColor: string = "var(--icon-color)"
)}
  <div
    class="legend"
    style="width: {size}; height: {size}; background-color: {color}; border-radius: 10%;"
  >
    {#if icon}
      <SvgIcon size={iconSize} color={iconColor}>{@html icon}</SvgIcon>
    {/if}
  </div>
{/snippet}

<form class="dropdown-menu" transition:slide={{ duration: 100 }}>
  <fieldset>
    <legend>MAP THEME</legend>
    <input
      type="radio"
      id="voyager"
      name="tileset"
      value={mapState.tilesets["voyager"]}
      bind:group={mapState.tileset}
    />
    <label for="voyager">Voyager</label>
    <input
      type="radio"
      id="light"
      name="tileset"
      value={mapState.tilesets["light"]}
      bind:group={mapState.tileset}
    />
    <label for="light">Light</label>
    <input
      type="radio"
      id="dark"
      name="tileset"
      value={mapState.tilesets["dark"]}
      bind:group={mapState.tileset}
    />
    <label for="dark">Dark</label>
  </fieldset>
  <fieldset>
    <legend>AREAS</legend>
    <input
      type="checkbox"
      id="Buildings"
      name="enabled features"
      bind:checked={mapState.enableBuildings}
    />
    <label for="Buildings"
      >Buildings{@render divLegend(mapTheme.building)}</label
    >
    <input
      type="checkbox"
      id="Benches"
      name="enabled features"
      bind:checked={mapState.enableBenches}
    />
    <label for="Benches">Benches{@render divLegend(mapTheme.bench)}</label>
    <input
      type="checkbox"
      id="parking-spaces"
      name="enabled features"
      bind:checked={mapState.enableParking}
    />
    <label for="parking-spaces"
      >Parking Spaces{@render divLegend(mapTheme.parking)}</label
    >
    <input
      type="checkbox"
      id="sports-areas"
      name="enabled features"
      bind:checked={mapState.enableSportsAreas}
    />
    <label for="sports-areas"
      >Sports Areas{@render divLegend(mapTheme.sportsArea)}</label
    >
  </fieldset>
  <fieldset>
    <legend>POINTS</legend>
    <input
      type="checkbox"
      id="labels"
      name="enabled features"
      bind:checked={mapState.enableLabels}
    />
    <label for="labels"
      >Labels{@render divLegend(
        "var(--bg-accent)",
        "1em",
        "A",
        "0.8em",
        "var(--text)"
      )}</label
    >
    <input
      type="checkbox"
      id="Restrooms"
      name="enabled features"
      bind:checked={mapState.enableRestrooms}
    />
    <label for="Restrooms"
      >Restrooms{@render divLegend(
        "rgb(22, 85, 141)",
        "1em",
        restroomSVG,
        "0.8em",
        "white"
      )}</label
    >
    <input
      type="checkbox"
      id="printing-stations"
      name="enabled features"
      bind:checked={mapState.enablePrintingServices}
    />
    <label for="printing-stations"
      >Printing Services{@render divLegend(
        "white",
        "1em",
        printerSVG,
        "0.8em",
        "#333333"
      )}</label
    >
    <input
      type="checkbox"
      id="Landmarks"
      name="enabled features"
      bind:checked={mapState.enableLandmarks}
    />
    <label for="Landmarks"
      >Landmarks{@render divLegend(
        "var(--bg-accent)",
        "1em",
        landmarkSVG,
        "0.8em",
        "#f03a3a"
      )}</label
    >
    <input
      type="checkbox"
      id="event-centers"
      name="enabled features"
      bind:checked={mapState.enableEventCenters}
    />
    <label for="event-centers"
      >Event Centers
      <div class="event-center-icon">
        <div class="tooltip-svg"></div>
      </div></label
    >
  </fieldset>
</form>

<style lang="scss">
  .event-center-icon {
    .tooltip-svg {
      width: 1em;
      height: 1em;
      clip-path: path(
        "M 8.2324 0.4685 Q 7.9982 0.0334 7.4962 0 Q 6.9942 0.0334 6.7599 0.4685 L 4.7855 4.7855 L 4.7855 4.7855 L 0.4685 6.7599 L 0.4685 6.7599 Q 0.0334 6.9942 0 7.4962 Q 0.0334 7.9982 0.4685 8.2324 L 4.7855 10.2069 L 4.7855 10.2069 L 6.7599 14.5238 L 6.7599 14.5238 Q 6.9942 14.9589 7.4962 14.9924 Q 7.9982 14.9589 8.2324 14.5238 L 10.2069 10.2069 L 10.2069 10.2069 L 14.5238 8.2324 L 14.5238 8.2324 Q 14.9589 7.9982 14.9924 7.4962 Q 14.9589 6.9942 14.5238 6.7599 L 10.2069 4.7855 L 10.2069 4.7855 L 8.2324 0.4685 L 8.2324 0.4685 Z"
      );
    }
  }
  .legend {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    margin-right: clamp(4px, 5vw, 16px);
    background-color: var(--bg-accent);
    box-shadow: var(--box-shadow);
    padding: 8px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.8em;

    fieldset {
      border: none;
      border-top: 1px solid var(--text-placeholder);
      display: grid;
      grid-template-columns: min-content 1fr;
      gap: 4px;
      column-gap: 0;

      legend {
        font-weight: 600;
        font-size: 0.8rem;
        color: var(--text-placeholder);
        margin-bottom: 2px;
        padding-right: 4px;
      }

      label {
        padding-left: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
      }
    }

    @media (prefers-color-scheme: dark) {
      box-shadow: none;
    }
  }

  @media (max-width: 599px) {
    .dropdown-menu {
      top: -8px;
      right: 50vw;
      margin-right: 0;
      transform: translate(50%, -100%);
    }
  }
</style>
