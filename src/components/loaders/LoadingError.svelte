<script>
  let { error } = $props();
</script>

<div class="icon">💔 🥀</div>
<span> Something went wrong! </span>
<span> {error} </span>
<div class="other-links">
  <a href="https://github.com/ustp-party/map/issues/new/choose">Report</a>
  <a href="https://www.ustp.edu.ph/cdeo/ustp-cagayan-de-oro-360-virtual-tour/"
    >Official 360 Virtual Tour</a
  >
  <a href="https://www.openstreetmap.org/#map=18/8.486189/124.656302"
    >OpenStreetMap</a
  >
  <a
    href="https://www.google.com/maps/place/University+of+Science+and+Technology+of+Southern+Philippines+-+CDO+Campus/@8.4855729,124.6561733,18z/data=!4m6!3m5!1s0x32fff2c3ca5ae8c7:0x880805868ab84491!8m2!3d8.4847692!4d124.6567168!16s%2Fg%2F11cs6lpz3h?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
    >Google Maps</a
  >
</div>

<style lang="scss">
  .icon {
    display: flex;
    flex-direction: row;
    gap: 0.8rem;
    font-size: 3em;
  }

  :nth-child(2) {
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--danger);
  }

  :nth-child(3) {
    font-size: small;
    color: var(--danger);
  }

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
      color: var(--danger);

      &::before {
        content: "[";
        color: var(--danger);
      }
      &::after {
        content: "]";
        color: var(--danger);
      }

      &:hover,
      &:active {
        text-decoration: underline;
        color: var(--info);
      }
    }
  }
</style>
