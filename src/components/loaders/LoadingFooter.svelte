<script lang="ts">
  let { color = "var(--text)" } = $props();

  const links = [
    {
      href: "https://github.com/ustp-party/map/issues/new/choose",
      label: "Report",
    },
    {
      href: "https://www.ustp.edu.ph/cdeo/ustp-cagayan-de-oro-360-virtual-tour/",
      label: "Official 360 Virtual Tour",
    },
    {
      href: "https://www.openstreetmap.org/#map=18/8.486189/124.656302",
      label: "OpenStreetMap",
    },
    {
      href: "https://www.google.com/maps/place/University+of+Science+and+Technology+of+Southern+Philippines+-+CDO+Campus/@8.4855729,124.6561733,18z/data=!4m6!3m5!1s0x32fff2c3ca5ae8c7:0x880805868ab84491!8m2!3d8.4847692!4d124.6567168!16s%2Fg%2F11cs6lpz3h?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D",
      label: "Google Maps",
    },
  ];
</script>

<div class="other-links">
  {#each links as { href, label }}
    <a {href} style="color: {color}">{label}</a>
  {/each}
</div>

<style lang="scss">
  .other-links {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 1rem;

    a {
      font-weight: 500;
      font-size: small;
      text-decoration: none;

      &::before {
        content: "[";
      }
      &::after {
        content: "]";
      }

      &:hover,
      &:active {
        text-decoration: underline;
        color: var(--hyperlink);
      }
    }
  }
</style>
