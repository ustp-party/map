<script lang="ts">
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onDestroy, onMount } from "svelte";
  import type { Properties, Feature as MapFeature } from "$lib/types/features";
  import type { Snippet } from "svelte";
  import type { Feature } from "geojson";

  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { mapTheme } from "$lib/theme";
  import { getMapState } from "$lib/stores/mapState.svelte";
  import { getAppState } from "$lib/stores/appState.svelte";
  import controls from "$lib/utils/mapControls";
  import icons from "$components/icons/CustomIcons";

  let appState = getAppState();
  let mapState = getMapState();
  let mapElement: HTMLDivElement;
  let map: L.Map | undefined = $state();
  let view: L.LatLngExpression = $derived(mapState.currentCenter);
  let zoom: number = $derived(mapState.currentZoom);
  let searchState = getSearchState();
  let searchResults = $derived<Feature[]>(searchState.results.slice(0, 5)); // Return only top 5

  let allBuildingsLayer: L.GeoJSON | undefined = undefined;

  let tilesetLayer: L.TileLayer | undefined = $derived(
    L.tileLayer(mapState.tileset, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
      keepBuffer: 6,
    })
  );
  let resultsLayer: L.GeoJSON | undefined = undefined;
  let parkingLayer: L.GeoJSON | undefined = undefined;
  let benchesLayer: L.GeoJSON | undefined = undefined;
  let restroomsLayer: L.GeoJSON | undefined = undefined;
  let printingServicesLayer: L.GeoJSON | undefined = undefined;
  let landmarksLayer: L.GeoJSON | undefined = undefined;
  let eventCentersLayer: L.GeoJSON | undefined = undefined;
  let currentTileset: L.TileLayer | undefined = $state();
  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  onMount(() => {
    map = L.map(mapElement, { zoomControl: false });

    map.createPane("search-results");
    map.getPane("search-results")!.style.zIndex = "450";

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
        if (resultsLayer) {
          map?.removeLayer(resultsLayer);
        }

        resultsLayer = L.geoJSON(searchResults, {
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
                type,
                ["addr:housenumber"]: bldg_no,
                ["building:levels"]: levels,
              }: Properties = feature.properties;

              const labels = {
                Building: bldg_no,
                Levels: levels,
              };

              layer.bindTooltip(controls.tooltipTemplate(name, type, labels), {
                className: "polygon-label",
              });
            }
          },
          pointToLayer: (feature, latlng) => {
            const { description, type, level }: Properties = feature.properties;

            const labels = {
              Descripion: description,
              Level: level,
            };

            return L.marker(latlng, {
              icon: icons.HighlightIcon,
              pane: "search-results",
            }).bindTooltip(controls.tooltipTemplate(type, type, labels), {
              className: "marker-label",
            });
          },
        }).addTo(map!);
      }, 700);
    }
  });

  function setDetailedFeature(feature: MapFeature): void {
    searchState.updateDetailedFeature(feature);
    appState.collapsedSidebar = false;
  }

  // Data viz of all buildings
  $effect(() => {
    if (currentTileset) {
      currentTileset.remove();
    }
    currentTileset = tilesetLayer.addTo(map!);

    mapState.setMap(map!);
    if (allBuildingsLayer) {
      map?.removeLayer(allBuildingsLayer);
    }
    if (mapState.enableBuildings) {
      allBuildingsLayer = controls
        .setBuildings(mapState.buildings, setDetailedFeature)
        .addTo(map!);
    }

    if (parkingLayer) {
      map?.removeLayer(parkingLayer);
    }
    if (mapState.enableParking) {
      parkingLayer = controls
        .setParkingSpaces(mapState.parking, setDetailedFeature)
        .addTo(map!);
    }

    if (benchesLayer) {
      map?.removeLayer(benchesLayer);
    }
    if (mapState.enableBenches) {
      benchesLayer = controls
        .setBenches(mapState.benches, setDetailedFeature)
        .addTo(map!);
    }

    if (restroomsLayer) {
      map?.removeLayer(restroomsLayer);
    }
    if (mapState.enableRestrooms) {
      restroomsLayer = controls
        .setRestrooms(mapState.pointsOfInterest, setDetailedFeature)
        .addTo(map!);
    }

    if (printingServicesLayer) {
      map?.removeLayer(printingServicesLayer);
    }
    if (mapState.enablePrintingServices) {
      printingServicesLayer = controls
        .setPrintingServices(mapState.pointsOfInterest, setDetailedFeature)
        .addTo(map!);
    }

    if (landmarksLayer) {
      map?.removeLayer(landmarksLayer);
    }
    if (mapState.enableLandmarks) {
      landmarksLayer = controls
        .setLandmarks(mapState.pointsOfInterest, setDetailedFeature)
        .addTo(map!);
    }
    if (eventCentersLayer) {
      map?.removeLayer(eventCentersLayer);
    }
    if (mapState.enableEventCenters) {
      eventCentersLayer = controls
        .setEventCenters(mapState.pointsOfInterest, setDetailedFeature)
        .addTo(map!);
    }
  });

  onDestroy(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    if (currentTileset) {
      currentTileset.remove();
    }
    if (allBuildingsLayer) {
      allBuildingsLayer.remove();
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
