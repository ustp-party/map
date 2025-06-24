<script lang="ts">
  import type { Feature } from "$lib/types/features";
  import type { Map } from "leaflet";
  import type { Position } from "geojson";
  import type { LatLngExpression } from "leaflet";

  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import buildingSVG from "$assets/free-icons/building.svg?raw";
  import restroomSVG from "$assets/free-icons/restroom.svg?raw";
  import printerSVG from "$assets/free-icons/printer.svg?raw";
  import sparkleSVG from "$assets/free-icons/sparkle.svg?raw";
  import parkingSVG from "$assets/free-icons/parking.svg?raw";

  import { getContext } from "svelte";
  import { geometricCentroid } from "$lib/utils/mapControls";
  import { getAppState } from "$lib/stores/appState.svelte";
  import { getLocalStorageState } from "$lib/stores/localStorage.svelte";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";

  let { feature }: { feature: Feature } = $props();
  let p = feature.properties;

  const mapContext = getContext<{ getMap: () => Map }>("map");
  const map = mapContext.getMap();
  const appState = getAppState();
  const showImages = true;
  const localStorageState = getLocalStorageState();
  let imageContainer: HTMLDivElement | undefined = $state(undefined);
  let imageElement: HTMLImageElement | undefined = $state(undefined);
  let mouseX: number = $state(0);
  let mouseY: number = $state(0);

  function handleClick() {
    let centroid: LatLngExpression;

    if (feature.geometry.type === "Point") {
      let coords = feature.geometry.coordinates as Array<number>;
      let lat = coords[1];
      let lng = coords[0];
      centroid = [lat, lng];
    } else if (feature.geometry.type === "Polygon") {
      centroid = geometricCentroid(
        feature.geometry.coordinates[0] as Position[]
      );
    } else {
      console.warn("Unsupported geometry type:", feature.geometry.type);
      return;
    }

    if (appState.viewportWidth < 600) {
      collapsedSidebar.set(true);
    }

    map.setView(centroid, 19, {
      animate: true,
      duration: 0.8,
    });

    localStorageState.insertFeature(feature);
  }

  function onMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    let offset = appState.viewportWidth * 0.05; // 5% of viewport width
    imageContainer!.style.left = `${mouseX + offset}px`;
    imageElement!.style.top = `${mouseY}px`;
    imageElement!.style.maxWidth = `${
      appState.viewportWidth - mouseX - offset
    }px`;
  }

  function hoverHandler() {
    if (appState.viewportWidth < 600) {
      return; // Don't show hover image on small screens
    }
    imageContainer!.style.display = "flex";
    window.addEventListener("mousemove", onMouseMove);
  }

  function unhoverHandler() {
    if (appState.viewportWidth < 600) {
      return; // Don't hide hover image on small screens
    }
    imageContainer!.style.display = "none";
    window.removeEventListener("mousemove", onMouseMove);
  }

  const svgs: Record<string, string> = {
    building: buildingSVG,
    Restroom: restroomSVG,
    "Printing Service": printerSVG,
    Landmark: sparkleSVG,
    parking: parkingSVG,
  };
</script>

<button class="card" id={feature.id} onclick={handleClick}>
  <div class="container">
    <div class="body">
      <div class="icons">
        <SvgIcon>
          {@html svgs[p.type]}
        </SvgIcon>
      </div>
      <div class="card-content">
        <h3 class="card-title">{p.name || p.description}</h3>
        <div class="details">
          {@render detail("Building", p["addr:housenumber"])}
          {@render detail("Levels", p["building:levels"])}
          {@render detail("Level", p["level"])}
          {@render detail("Vehicles", p["vehicles"])}
        </div>
      </div>
    </div>
    {#if p.image_compressed && showImages}
      <img
        src={p.image_compressed}
        alt={p.name}
        onmouseenter={hoverHandler}
        onmouseleave={unhoverHandler}
        class="card-image"
        loading="lazy"
      />
    {:else}
      <div class="card-image-placeholder" role="presentation"></div>
    {/if}
  </div>
</button>

<div class="image-container" bind:this={imageContainer}>
  <img
    class="hover-image"
    bind:this={imageElement}
    src={p.image}
    alt={`Feature reference of ${p.name || p.description}`}
    loading="lazy"
  />
</div>

{#snippet detail(label: string, value: string | number | undefined)}
  {#if value}
    <div class="left-detail">{label}</div>
    <div class="right-detail">{value}</div>
  {/if}
{/snippet}

<style lang="scss">
  .image-container {
    position: fixed;
    display: none;
    top: 0;
    max-height: 100vh; /* no overflow vertically */
    height: 100%;
    object-fit: contain;
    align-items: center;

    img {
      display: absolute;
      left: 0;
    }
  }

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

        .icons {
          display: flex;
          align-items: center;
          justify-content: center;
          height: fit-content;
          margin-right: 8px;
        }
      }

      .card-image {
        min-width: 80px;
        width: clamp(80px, 5vw + 10px, 100px);
        height: 100%;
        aspect-ratio: 1;
        border-radius: 12px;
        object-fit: cover;
        object-position: center;

        &:hover {
          transform: scale(1.05);
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
