<script>
  import { onMount } from "svelte";
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import spinnerSVG from "$assets/animated/spinner.svg?raw";
  import LoadingFooter from "./LoadingFooter.svelte";

  let counter = $state(0);
  onMount(() => {
    setInterval(() => {
      counter += 1;
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  });
</script>

<div>
  <SvgIcon size={60}>
    {@html spinnerSVG}
  </SvgIcon>
</div>
{#if counter < 15}
  <span> You're getting there! </span>
  <span> Please wait... </span>
{:else}
  <span> This is taking longer than expected. </span>
{/if}
<span>
  ({counter + 1} seconds)
</span>
{#if counter >= 15}
  <LoadingFooter />
{/if}

<style lang="scss">
  :nth-child(3),
  :nth-child(4) {
    font-size: small;
    color: var(--text-placeholder);
  }

  :nth-child(4) {
    margin-top: 1em;
  }
</style>
