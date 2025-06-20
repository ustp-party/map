<script lang="ts">
  import type { Feature } from "$lib/types/features";
  import type { Map } from "leaflet";
  import type { Position } from "geojson";
  import type { LatLngExpression } from "leaflet";

  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import buildingSVG from "$assets/free-icons/building.svg?raw";

  import { getContext } from "svelte";
  import { geometricCentroid } from "$lib/utils/mapControls";
  import { getViewportWidthState } from "$lib/stores/ViewportWidthState.svelte";
  import { getLocalStorageState } from "$lib/stores/localStorage.svelte";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";

  let { feature }: { feature: Feature } = $props();
  let p = feature.properties;

  const mapContext = getContext<{ getMap: () => Map }>("map");
  const map = mapContext.getMap();
  const viewportWidth = getViewportWidthState();
  const showImages = true;
  const localStorageState = getLocalStorageState();

  function handleClick() {
    let polygon: Position[] = feature.geometry.coordinates[0];
    let centroid: LatLngExpression = geometricCentroid(polygon);
    if (viewportWidth.value < 600) {
      collapsedSidebar.set(true);
    }
    map.setView(centroid, 19, {
      animate: true,
      duration: 0.8,
    });
    localStorageState.insertFeature(feature);
  }
</script>

<button class="card" id={feature.id} onclick={handleClick}>
  <div class="container">
    <div class="body">
      <div class="icons">
        <SvgIcon>
          {#if p.type == "building"}
            {@html buildingSVG}
          {/if}
        </SvgIcon>
      </div>
      <div class="card-content">
        <h3 class="card-title">{p.name}</h3>
        <div class="details">
          {@render detail("Building", p["addr:housenumber"])}
          {@render detail("Levels", p["building:levels"])}
        </div>
      </div>
    </div>
    {#if p.image && showImages}
      <img src={p.image} alt={p.name} class="card-image" />
    {:else}
      <div class="card-image-placeholder"></div>
    {/if}
  </div>
</button>

{#snippet detail(label: string, value: string | number | undefined)}
  {#if value}
    <div class="left-detail">{label}</div>
    <div class="right-detail">{value}</div>
  {/if}
{/snippet}

<style lang="scss">
  @mixin flex-col {
    display: flex;
    flex-direction: column;
  }
  .card {
    background-color: var(--bg-accent);
    padding: 12px;

    &:hover {
      background-color: var(--bg-accent-hover);
    }

    .container {
      display: flex;
      justify-content: space-between;
      max-width: 100%;
      width: 100%;
      gap: clamp(4px, 4vw, 24px);

      .body {
        display: flex;
        flex-direction: row;
        gap: 4px;

        .card-content {
          @include flex-col;
          max-width: 100%;
          gap: clamp(4px, 1vh + 1px, 8px);

          .card-title {
            font-weight: 600;
            font-size: 1.125rem;
            text-wrap: break-word;
            text-overflow: ellipsis;
          }

          .details {
            display: grid;
            grid-template-columns: min-content 1fr;
            column-gap: clamp(1rem, 2vw + 4px, 2rem);
            font-size: 0.875rem;

            .left-detail {
              font-weight: 600;
            }
            .right-detail {
              font-weight: 400;
            }
          }
        }
      }
    }

    .card-image-placeholder {
      --s: clamp(60px, 5vw + 40px, 100px); /* control the size*/
      --c1: #f0f0f0;
      --c2: #e0e0e0;
      --c3: #d0d0d0;

      min-width: 80px;
      width: clamp(80px, 5vw + 10px, 100px);
      height: 100%;
      aspect-ratio: 1;
      border-radius: 12px;

      background:
        repeating-conic-gradient(from 30deg, #0000 0 120deg, var(--c3) 0 50%)
          calc(var(--s) / 2) calc(var(--s) * tan(30deg) / 2),
        repeating-conic-gradient(
          from 30deg,
          var(--c1) 0 60deg,
          var(--c2) 0 120deg,
          var(--c3) 0 50%
        );
      background-size: var(--s) calc(var(--s) * tan(30deg));

      @media (prefers-color-scheme: dark) {
        --c1: #272736;
        --c2: #333947;
        --c3: #2d2c3b;
      }
    }
  }
</style>
