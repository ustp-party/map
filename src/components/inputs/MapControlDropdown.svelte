<script lang="ts">
  import restroomSVG from "$assets/free-icons/restroom.svg?raw";
  import printerSVG from "$assets/free-icons/printer.svg?raw";
  import landmarkSVG from "$assets/free-icons/monument.svg?raw";
  import informationSVG from "$assets/free-icons/circle-info.svg?raw";
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import { getMapState } from "$lib/stores/mapState.svelte";
  import { slide } from "svelte/transition";
  import { mapTheme } from "$lib/theme";

  const mapState = getMapState();
</script>

{#snippet divLegend(
  color: string = "transparent",
  icon: string | undefined = undefined,
  iconSize: string = "0.8rem",
  iconColor: string = "var(--icon-color)",
  className: string = ""
)}
  <div class="legend {className}" style="background-color: {color};">
    {#if icon}
      <SvgIcon size={iconSize} color={iconColor}>{@html icon}</SvgIcon>
    {/if}
  </div>
{/snippet}

<form class="dropdown-menu" transition:slide={{ duration: 100 }}>
  <fieldset>
    <legend>MAP THEME</legend>
    {#each Object.entries(mapState.tilesets) as [ label, value ]}
      <input
        type="radio"
        id={`${label}-tileset`}
        name="tileset"
        value={value}
        bind:group={mapState.tileset}
      />
      <label for={`${label}-tileset`}>{label}</label>
    {/each}
  </fieldset>
  <div class="divider"></div>
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
  <div class="divider"></div>
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
        "transparent",
        "A",
        "0.8rem",
        "var(--text)"
      )}</label
    >
    <input
      type="checkbox"
      id="essentials"
      name="enabled features"
      bind:checked={mapState.enableEssentials}
    />
    <label for="essentials"
      >Essentials
      {@render divLegend(
        "rgb(34, 112, 185)",
        informationSVG,
        "0.875rem",
        "white",
        "essential"
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
        restroomSVG,
        "0.75rem",
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
        printerSVG,
        "0.6rem",
        "#333333",
        "printing"
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
        "transparent",
        landmarkSVG,
        "0.875rem",
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
      width: 1rem;
      height: 1rem;
      clip-path: path(
        "M 8.2324 0.4685 Q 7.9982 0.0334 7.4962 0 Q 6.9942 0.0334 6.7599 0.4685 L 4.7855 4.7855 L 4.7855 4.7855 L 0.4685 6.7599 L 0.4685 6.7599 Q 0.0334 6.9942 0 7.4962 Q 0.0334 7.9982 0.4685 8.2324 L 4.7855 10.2069 L 4.7855 10.2069 L 6.7599 14.5238 L 6.7599 14.5238 Q 6.9942 14.9589 7.4962 14.9924 Q 7.9982 14.9589 8.2324 14.5238 L 10.2069 10.2069 L 10.2069 10.2069 L 14.5238 8.2324 L 14.5238 8.2324 Q 14.9589 7.9982 14.9924 7.4962 Q 14.9589 6.9942 14.5238 6.7599 L 10.2069 4.7855 L 10.2069 4.7855 L 8.2324 0.4685 L 8.2324 0.4685 Z"
      );
    }
  }
  .legend {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    border-radius: 20%;
  }

  .legend.essential {
    border-radius: 50%;
  }

  .legend.printing {
    border: 1px solid #333333;
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

    .divider {
      position: absolute;
      display: none;
      user-select: none;
    }

    @media (max-height: 599px) {
      flex-direction: row;

      .divider {
        display: block;
        position: relative;
        width: 1px;
        background-color: var(--text-placeholder);
      }
    }

    fieldset {
      border: none;
      border-top: 1px solid var(--text-placeholder);
      display: grid;
      grid-template-columns: min-content 1fr;
      row-gap: 4px;
      column-gap: 0;

      @media (max-height: 599px) {
        border-top: none;
        column-gap: 2px;
        row-gap: 0;
      }
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
        cursor: pointer;
        border-radius: 0.2em;

        &:hover {
          background-color: var(--bg-accent-hover);
        }
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
