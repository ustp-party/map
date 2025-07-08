<script lang="ts">
  import { goto } from "$app/navigation";
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import questionMarkSVG from "$assets/material-icons/question_mark.svg?raw";
  import { getAppState } from "$lib/stores/appState.svelte";

  const appState = getAppState();

  let dialog: HTMLDialogElement;
  function closeDialog() {
    dialog?.close();
    appState.openMissingFeatureDialog = false;
    appState.collapsedSidebar = false;
    goto("/", { replaceState: true });
  }

  $effect(() => {
    if (appState.openMissingFeatureDialog) {
      dialog?.showModal();
    }
  });
</script>

<dialog class="error-message" bind:this={dialog} closedby="any">
  <SvgIcon size="32px" alt="Error">
    {@html questionMarkSVG}
  </SvgIcon>
  This location does not exist or has been deleted.
  <button onclick={closeDialog}>OK</button>
</dialog>

<style lang="scss">
  .error-message {
    all: unset;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: var(--warning);
    background-color: var(--bg-accent);
    border-radius: 8px;
    padding: 16px;
    box-shadow: var(--box-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    opacity: 0;

    &[open] {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
    }

    @media (prefers-color-scheme: dark) {
      background-color: var(--bg);

      &::backdrop {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }

    button {
      color: var(--warning);
      background-color: var(--warning-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 4px 16px;
      cursor: pointer;
      font-weight: 500;

      &:hover {
        background-color: var(--warning-accent-hover);
      }

      &:active {
        background-color: var(--warning-accent-active);
      }
    }
  }
</style>
