<script>
  import { fade } from "svelte/transition";
  import { quintIn } from "svelte/easing";

  let { children } = $props();
</script>

<div class="loading-page" transition:fade={{ duration: 600, easing: quintIn }}>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div class="content">
    {@render children()}
  </div>
</div>

<style lang="scss">
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg);
    color: var(--color-text);
    font-weight: bold;
    text-align: center;

    .content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1em;
      width: fit-content;
      background-color: oklch(1 0 0 / 0.8);
      padding: 2em;
      border-radius: 1em;
      border: 1px solid var(--border);
      margin: 1em;

      @media (prefers-color-scheme: dark) {
        background-color: rgba(52, 51, 61, 0.8);
      }
    }

    .bg {
      animation: slide 6s ease-in-out infinite alternate;
      background-image: linear-gradient(
        -60deg,
        var(--bg) 50%,
        var(--bg-accent) 50%
      );
      bottom: 0;
      left: -50%;
      opacity: 0.5;
      position: fixed;
      right: -50%;
      top: 0;
      z-index: -1;
    }

    .bg2 {
      animation-direction: alternate-reverse;
      animation-duration: 16s;
    }

    .bg3 {
      animation-duration: 20s;
    }

    @keyframes slide {
      0% {
        transform: translateX(-25%);
      }
      100% {
        transform: translateX(25%);
      }
    }
  }
</style>
