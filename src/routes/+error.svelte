<script lang="ts">
  import { page } from "$app/state";
  import { onMount, onDestroy } from "svelte";
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import errorSVG from "$assets/material-icons/error.svg?raw";

  // Number of seconds to wait before redirecting
  let countdown = $state(15);
  let interval: ReturnType<typeof setInterval>;

  onMount(() => {
    if (page.status === 404) {
      interval = setInterval(() => {
        countdown -= 1;

        if (countdown <= 0) {
          clearInterval(interval);
          window.location.href = "/";
        }
      }, 1000);
    }
  });

  onDestroy(() => {
    // Clear the countdown interval if it exists
    clearInterval(interval);
  });
</script>

<div class="container" aria-label="Error Page Container">
  <div class="box" aria-label="Error Box">
    <div class="icon" aria-label="Error Icon">
      <SvgIcon size={56} alt="Error Icon">
        {@html errorSVG}
      </SvgIcon>
    </div>
    <div class="message" aria-label="Error Message">
      <h2>{page.status} - {page.error?.message}</h2>
      <div class="countdown" aria-label="Redirect Countdown">
        Redirecting in <strong class="number">{countdown}</strong> seconds...
      </div>
      <small class="support" aria-label="Contact support">
        Did you encounter an issue? Please contact support at <a
          href="mailto:chrisandrei.irag@1.ustp.edu.ph"
          >chrisandrei.irag@1.ustp.edu.ph</a
        >
        or submit a bug report on our
        <a href="https://github.com/ustp-party/map/issues/new/choose">GitHub</a
        >.
      </small>
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--bg);
    overflow: hidden;
    text-wrap: wrap;

    .box {
      width: clamp(500px, 40vw, 70%);
      height: fit-content;
      background-color: var(--bg-accent);
      border: 1px solid transparent;
      margin-left: 8px;
      margin-right: 8px;

      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 16px;
      padding: 8px 16px 8px 10px;

      border-radius: 8px;
      box-shadow: var(--box-shadow);

      @media (prefers-color-scheme: dark) {
        box-shadow: none;
      }

      .message {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .number {
          text-decoration: underline;
        }

        small {
          width: fit-content;
          margin-top: 16px;
        }

        h2 {
          font-size: 1.2rem;
          color: var(--text);
        }
      }
    }
  }
</style>
