<script lang="ts">
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onDestroy, onMount, setContext } from "svelte";
  import { base } from "$app/paths";
  import features from "$lib/utils/features";

  export let bounds: L.LatLngBounds | undefined = undefined;
  export let view: L.LatLngExpression | undefined = undefined;
  export let zoom: number | undefined = undefined;

  let mapElement: HTMLDivElement;
  let map: L.Map | undefined;

  onMount(() => {
    map = L.map(mapElement, { zoomControl: false });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20,
      }
    ).addTo(map);

    features.buildings(map, base);
    features.benches(map, base);
    features.parking(map, base);
    features.pointsOfInterest(map, base);
  });

  onDestroy(() => {
    if (map) {
      map?.remove();
      map = undefined;
    }
  });

  setContext("map", {
    getMap: () => map,
  });

  $: if (map) {
    if (bounds) {
      map.fitBounds(bounds);
    } else if (view && zoom) {
      map.setView(view, zoom);
    }
  }
</script>

<div bind:this={mapElement} id="map"></div>
{#if map}
  <slot />
{/if}

<style>
  #map {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
