<script lang="ts">
  let props = $props<{
    title?: string;
    description?: string;
    image?: string;
    link?: string;
    level?: string;
    levels?: string;
    bldg_no?: string;
  }>();
</script>

<div class="card">
  {#if props.image}
    <img src={props.image} alt={props.title} class="card-image" />
  {/if}
  <div class="card-content">
    <h3 class="card-title">{props.title}</h3>
    {#if props.bldg_no}
      <p class="card-bldg-no">Building No: {props.bldg_no}</p>
    {/if}
    <p class="card-description">{props.description}</p>
    {#if props.link}
      <a href={props.link} class="card-link">Learn more</a>
    {/if}
    {#if props.level}
      <p class="card-level">Level: {props.level}</p>
    {/if}
    {#if props.levels}
      <p class="card-levels">Levels: {props.levels}</p>
    {/if}
  </div>
</div>
