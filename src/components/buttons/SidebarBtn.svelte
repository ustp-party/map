<script lang="ts">
  import MaterialIcon from "$components/icons/MaterialIcon.svelte";
  import { getContext } from "svelte";
  import type { Writable } from "svelte/store";

  const collapsed = getContext<Writable<boolean>>("collapsed");
</script>

<button
  class={"sidebar_btn" + ($collapsed ? " close" : " open")}
  on:click={() => collapsed.update((value) => !value)}
>
  <div class="icon">
    {#if $collapsed}
      <MaterialIcon name="arrow-right" />
    {:else}
      <MaterialIcon name="arrow-left" />
    {/if}
  </div>
</button>

<style>
  .sidebar_btn {
    all: unset;
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
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.32);
    transition: left 0.24s ease-in-out;
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
    height: 30px;
  }

  @media (prefers-color-scheme: dark) {
    .sidebar_btn {
      box-shadow: 0 0px 8px rgba(255, 255, 255, 0.32);
    }
  }
</style>
