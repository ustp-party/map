<script lang="ts">
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import infoIcon from "$assets/font-awesome/circle-info.svg?raw";

  let props = $props<{
    message?: string;
  }>();
</script>

<div class="banner">
  <div class="iconContainer">
    <SvgIcon size="24px" color="var(--info-bg)">{@html infoIcon}</SvgIcon>
  </div>
  <p class="message">
    {@html props.message}
  </p>
</div>

<style lang="scss">
  .banner {
    align-self: center;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    border-radius: 0.4rem;
    background-color: var(--info-bg);
    overflow: hidden;

    .iconContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 0.8rem;
      height: 100%;
      background-color: var(--info);
    }

    .message {
      padding: 0.8rem;
    }
  }
</style>
