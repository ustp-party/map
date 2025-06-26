<script lang="ts">
  import ArrowIcon from "$components/icons/ArrowIcon.svelte";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";
</script>

<button
  class={"sidebar_btn" + ($collapsedSidebar ? " close" : " open")}
  on:click={() => collapsedSidebar.update((value) => !value)}
>
  <abbr title={`${$collapsedSidebar ? "Open" : "Close"} sidebar`} class="icon">
    {#if $collapsedSidebar}
      <ArrowIcon direction="right" />
    {:else}
      <ArrowIcon direction="left" />
    {/if}
  </abbr>
</button>

<style>
  .sidebar_btn {
    user-select: none;
    position: absolute;
    top: 50%;
    height: 50px;
    z-index: 998;
    border-radius: 0 8px 8px 0;
    background-color: var(--bg);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: right;
    box-shadow: var(--box-shadow);
    transition: left 0.08s ease-in-out;
    width: 460px;
  }

  .open {
    left: 0px;
  }
  .close {
    left: -440px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    .sidebar_btn {
      box-shadow: 0 0px 8px rgba(255, 255, 255, 0.32);
    }
  }
</style>
