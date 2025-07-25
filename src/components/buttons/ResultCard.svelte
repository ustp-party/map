<script lang="ts">
  import type { Feature } from "$lib/types/features";

  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import buildingSVG from "$assets/free-icons/building.svg?raw";
  import restroomSVG from "$assets/free-icons/restroom.svg?raw";
  import printerSVG from "$assets/free-icons/printer.svg?raw";
  import sparkleSVG from "$assets/free-icons/sparkle.svg?raw";
  import parkingSVG from "$assets/free-icons/parking.svg?raw";
  import spinnerSVG from "$assets/animated/spinner2.svg?raw";
  import picnicSVG from "$assets/free-icons/table-picnic.svg?raw";
  import monumentSVG from "$assets/free-icons/monument.svg?raw";
  import basketballSVG from "$assets/free-icons/basketball.svg?raw";
  import essentialSVG from "$assets/free-icons/circle-info.svg?raw";
  import localATMSVG from "$assets/material-icons/local_atm.svg?raw";

  import { getAppState } from "$lib/stores/appState.svelte";
  import { getLocalStorageState } from "$lib/stores/localStorage.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import { labelBuilder } from "$lib/utils/mapControls";

  let { feature }: { feature: Feature } = $props();
  let p = feature.properties;

  const appState = getAppState();
  const showImages = true;
  const localStorageState = getLocalStorageState();
  const searchState = getSearchState();
  let imageContainer: HTMLDivElement | undefined = $state(undefined);
  let imageElement: HTMLImageElement | undefined = $state(undefined);
  let loadingContainer: HTMLDivElement | undefined = $state(undefined);
  let mouseX: number = $state(0);
  let mouseY: number = $state(0);
  let loadingImage: boolean = $state(true);

  function handleClick() {
    if (feature.id) {
      goto(`?id=${encodeURIComponent(feature.id)}`, { replaceState: true });
    }
    searchState.updateDetailedFeature(feature);
    localStorageState.insertFeature(feature);
  }

  function onMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    let offset = appState.viewportWidth * 0.05; // 5% of viewport width

    if (imageContainer && imageElement) {
      imageContainer.style.left = `${mouseX + offset}px`;
      imageElement.style.top = `${mouseY}px`;
      imageElement.style.maxWidth = `${
        appState.viewportWidth - mouseX - offset
      }px`;
    }
  }

  function loadingIcon(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    let offset = 100; // 5% of viewport width
    if (loadingContainer) {
      loadingContainer.style.left = `${mouseX + offset}px`;
      loadingContainer.style.top = `${mouseY}px`;
      loadingContainer.style.transform = `translateY(-45%)`;
    }
  }

  function hoverHandler() {
    if (appState.mobileView) {
      return; // Don't show hover image on small screens
    }

    if (imageContainer) {
      imageContainer.style.display = "flex";
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousemove", loadingIcon);
    }
  }

  function unhoverHandler() {
    if (appState.mobileView) {
      return; // Don't hide hover image on small screens
    }
    if (imageContainer) {
      imageContainer.style.display = "none";
      window.removeEventListener("mousemove", onMouseMove);
    }
  }

  function loadHandler() {
    loadingImage = false;
    window.removeEventListener("mousemove", loadingIcon);
  }

  const svgs: Record<string, string> = {
    building: buildingSVG,
    Restroom: restroomSVG,
    "Printing Service": printerSVG,
    Landmark: monumentSVG,
    parking: parkingSVG,
    bench: picnicSVG,
    "Event Center": sparkleSVG,
    sports: basketballSVG,
    Essential: essentialSVG,
    ATM: localATMSVG,
  };

  onDestroy(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mousemove", loadingIcon);
  });

  const labels = labelBuilder(p);
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
        <h3 class="card-title">{p.name}</h3>
        <dl class="details">
          {#each Object.entries(labels) as [label, value]}
            {@render detail(label, value)}
          {/each}
        </dl>
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
  {#if loadingImage}
    <div class="loading-container" bind:this={loadingContainer}>
      <SvgIcon size="56px" alt="Loading image">
        {@html spinnerSVG}
      </SvgIcon>
    </div>
  {/if}
  <img
    class="hover-image"
    bind:this={imageElement}
    src={p.image}
    alt={`Feature reference of ${p.name || p.description}`}
    loading="lazy"
    onload={loadHandler}
  />
</div>

{#snippet detail(label: string, value: string | number | undefined)}
  {#if value}
    <dt class="left-detail">{label}</dt>
    <dd class="right-detail">{value}</dd>
  {/if}
{/snippet}

<style lang="scss">
  .loading-container {
    position: fixed;
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
  }

  .image-container {
    position: fixed;
    display: none;
    top: 0;
    max-height: 100vh; /* no overflow vertically */
    height: 100%;
    object-fit: contain;
    align-items: center;

    img {
      left: 0;
      background-color: gray;
      max-height: var(--viewport-height);
      z-index: 401;
      border-radius: 0.4em;
      box-shadow: var(--box-shadow);
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
            grid-template-columns: max-content 1fr;
            column-gap: clamp(1rem, 2vw + 4px, 2rem);
            row-gap: clamp(0.2rem, 0.1vh + 1px, 0.5rem);
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
