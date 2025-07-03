<script>
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import spinnerSVG from "$assets/animated/spinner.svg?raw";
  import { onMount } from "svelte";

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
  <SvgIcon size={40}>
    {@html spinnerSVG}
  </SvgIcon>
</div>
<span> You're getting there! </span>
<span> Please wait... </span>
<span>
  ({counter + 1} seconds)
</span>

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
