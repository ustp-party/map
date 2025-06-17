<script lang="ts">
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onDestroy, onMount, setContext } from "svelte";
  import type { Feature, Properties } from "$lib/types/features";
  import type { Position } from "geojson";
  import type { Snippet } from "svelte";
  import type { LatLngExpression } from "leaflet";
  import { currentZoom } from "$lib/stores/map";
  import { currentCenter } from "$lib/stores/map";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { mapTheme } from "$lib/theme";
  import { buildings } from "$lib/stores/map";
  import { geometricCentroid } from "$lib/utils/mapControls";

  let mapElement: HTMLDivElement;
  let map: L.Map | undefined = $state();
  let view: L.LatLngExpression = $derived($currentCenter);
  let zoom: number = $derived($currentZoom);
  let searchState = getSearchState();
  let searchResults = $derived<Feature[]>(searchState.results.slice(0, 5)); // Return only top 5

  let buildingsLayer: L.GeoJSON | undefined = $state();
  let allbuildings = $derived($buildings);
  let allBuildingsLayer: L.GeoJSON | undefined = undefined;

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  onMount(() => {
    map = L.map(mapElement, { zoomControl: false });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20,
        keepBuffer: 6,
      }
    ).addTo(map);

    if (map) {
      if (view && zoom) {
        map.setView(view, zoom);
      }
    }
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

  // Update map when there are search results
  let debounceTimer: ReturnType<typeof setTimeout> | undefined = undefined;
  $effect(() => {
    if (searchResults) {
      // Clear previous timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set debounce to update after 700ms of inactivity
      debounceTimer = setTimeout(() => {
        if (buildingsLayer) {
          map?.removeLayer(buildingsLayer);
        }

        buildingsLayer = L.geoJSON(searchResults, {
          style: {
            color: mapTheme.highlight,
            weight: 2,
            fillOpacity: 0.2,
            stroke: true,
          },
          onEachFeature: (feature, layer) => {
            if (feature.geometry.type === "Polygon") {
              const {
                name,
                ["addr:housenumber"]: bldg_no,
                ["building:levels"]: levels,
              }: Properties = feature.properties;
              if (feature.properties && name) {
                let html = `<div class="building-tooltip">`;
                html += `<h3 class="tooltip-title">${name}</h3>`;
                html += '<div class="tooltip-content">';
                html += `<div class="tooltip-label">Building</div><div>${bldg_no}</div>`;
                html += `<div class="tooltip-label">Levels</div><div> ${levels}</div>`;
                html += "</div></div>";

                layer.bindTooltip(html, {
                  className: "polygon-label", // optional CSS class
                });
              }
            }
          },
        }).addTo(map!);
      }, 700);
    }
  });

  // Data viz of all buildings
  $effect(() => {
    if (allBuildingsLayer) {
      map?.removeLayer(allBuildingsLayer);
    }
    allBuildingsLayer = L.geoJSON(allbuildings, {
      style: {
        color: mapTheme.building,
        weight: 1,
        fillOpacity: 0.5,
      },
      onEachFeature: (feature, layer) => {
        if (feature.geometry.type === "Polygon") {
          const coords: Position[][] = feature.geometry.coordinates;
          const centroid: LatLngExpression = geometricCentroid(coords[0]);
          const {
            name,
            ["addr:housenumber"]: bldg_no,
            ["building:levels"]: levels,
          }: Properties = feature.properties;

          const label = L.marker(centroid, {
            icon: L.divIcon({
              className: "polygon-text",
              html: feature.properties["addr:housenumber"],
            }),
          }).addTo(map!);
          if (feature.properties && name) {
            let html = `<div class="building-tooltip">`;
            html += `<h3 class="tooltip-title">${name}</h3>`;
            html += '<div class="tooltip-content">';
            html += `<div class="tooltip-label">Building</div><div>${bldg_no}</div>`;
            html += `<div class="tooltip-label">Levels</div><div> ${levels}</div>`;
            html += "</div></div>";

            layer.bindTooltip(html, {
              className: "polygon-label", // optional CSS class
            });
          }
        }
      },
    }).addTo(map!);
  });

  onDestroy(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    if (buildingsLayer) {
      map?.removeLayer(buildingsLayer);
      buildingsLayer = undefined;
    }
    if (allBuildingsLayer) {
      map?.removeLayer(allBuildingsLayer);
      allBuildingsLayer = undefined;
    }
  });
</script>

<div bind:this={mapElement} id="map"></div>
{#if map}
  {@render children()}
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
