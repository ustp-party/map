<script lang="ts">
  import { getMapState } from "$lib/stores/map.svelte";
  import { slide } from "svelte/transition";

  const mapState = getMapState();
  const tilesets = {
    voyager:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    light:
      "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
  };
</script>

<div class="dropdown-menu" transition:slide={{ duration: 100 }}>
  <form class="content">
    <input
      type="radio"
      id="light"
      name="tileset"
      value={tilesets["light"]}
      bind:group={mapState.tileset}
    />
    <label for="light">Light</label>
    <input
      type="radio"
      id="dark"
      name="tileset"
      value={tilesets["dark"]}
      bind:group={mapState.tileset}
    />
    <label for="dark">Dark</label>
  </form>
  <div class="divider"></div>
  <form class="content">
    <input
      type="checkbox"
      id="Buildings"
      name="enabled features"
      value="Buildings"
      bind:checked={mapState.enableBuildings}
    />
    <label for="Buildings">Buildings</label>
    <input
      type="checkbox"
      id="Benches"
      name="enabled features"
      value="Benches"
      bind:checked={mapState.enableBenches}
    />
    <label for="Benches">Benches</label>
    <input
      type="checkbox"
      id="Parking Spaces"
      name="enabled features"
      value="Parking Spaces"
      bind:checked={mapState.enableParking}
    />
    <label for="Parking Spaces">Parking Spaces</label>
  </form>
</div>

<style lang="scss">
  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    margin-right: clamp(4px, 5vw, 16px);
    background-color: var(--bg-accent);
    box-shadow: var(--box-shadow);
    padding: 8px;
    border-radius: 8px;

    .content {
      display: grid;
      flex-direction: column;
      grid-template-columns: min-content 1fr;
      column-gap: clamp(0.8rem, 1vw, 1rem);
      gap: 4px;
    }
    .divider {
      width: 100%;
      height: 1px;
      background-color: var(--accent-2);
      margin: 4px 0;
    }
  }

  @media (max-width: 599px) {
    .dropdown-menu {
      top: -8px;
      right: 50vw;
      margin-right: none;
      transform: translateX(60%) translateY(-100%);
    }
  }
</style>
