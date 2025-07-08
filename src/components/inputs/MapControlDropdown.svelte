<script lang="ts">
  import { getMapState } from "$lib/stores/mapState.svelte";
  import { slide } from "svelte/transition";

  const mapState = getMapState();
</script>

<form class="dropdown-menu" transition:slide={{ duration: 100 }}>
  <fieldset class="content">
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
  <fieldset class="content">
    <legend>AREAS</legend>
    <input
      type="checkbox"
      id="Buildings"
      name="enabled features"
      bind:checked={mapState.enableBuildings}
    />
    <label for="Buildings">Buildings</label>
    <input
      type="checkbox"
      id="Benches"
      name="enabled features"
      bind:checked={mapState.enableBenches}
    />
    <label for="Benches">Benches</label>
    <input
      type="checkbox"
      id="parking-spaces"
      name="enabled features"
      bind:checked={mapState.enableParking}
    />
    <label for="parking-spaces">Parking Spaces</label>
    <input
      type="checkbox"
      id="sports-areas"
      name="enabled features"
      bind:checked={mapState.enableSportsAreas}
    />
    <label for="sports-areas">Sports Areas</label>
  </fieldset>
  <fieldset class="content">
    <legend>POINTS</legend>
    <input
      type="checkbox"
      id="Restrooms"
      name="enabled features"
      bind:checked={mapState.enableRestrooms}
    />
    <label for="Restrooms">Restrooms</label>
    <input
      type="checkbox"
      id="printing-stations"
      name="enabled features"
      bind:checked={mapState.enablePrintingServices}
    />
    <label for="printing-stations">Printing Services</label>
    <input
      type="checkbox"
      id="Landmarks"
      name="enabled features"
      bind:checked={mapState.enableLandmarks}
    />
    <label for="Landmarks">Landmarks</label>
    <input
      type="checkbox"
      id="event-centers"
      name="enabled features"
      bind:checked={mapState.enableEventCenters}
    />
    <label for="event-centers">Event Centers</label>
  </fieldset>
</form>

<style lang="scss">
  fieldset {
    border: none;
    border-top: 1px solid var(--text-placeholder);
    legend {
      font-weight: 600;
      font-size: 0.8rem;
      color: var(--text-placeholder);
      margin-bottom: 2px;
      padding-right: 4px;
    }
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

    .content {
      display: grid;
      flex-direction: column;
      grid-template-columns: min-content 1fr;
      column-gap: clamp(0.8rem, 1vw, 1rem);
      gap: 4px;
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
