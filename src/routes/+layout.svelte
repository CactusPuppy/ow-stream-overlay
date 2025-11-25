<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.ico';
  import "$lib/scss/global.scss";
  import { setContext } from 'svelte';

  let { data, children } = $props();

  setContext('user', data.user);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>CactusPuppy's Stream Overlays</title>
</svelte:head>

{#key data.user}
  {@render children()}
{/key}
