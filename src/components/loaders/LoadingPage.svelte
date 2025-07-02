<script>
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import spinnerSVG from "$assets/animated/spinner.svg?raw";
</script>

<div class="loading-page">
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <div class="content">
    <div>
      <SvgIcon size={40}>
        {@html spinnerSVG}
      </SvgIcon>
    </div>
    Loading...
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
    transition: opacity 0.3s ease-in-out;

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
