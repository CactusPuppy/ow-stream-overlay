<script lang="ts">
  import type { LayoutProps } from './$types';
	import NavigationHeader from '$lib/components/layout/NavigationHeader.svelte';

  let { children }: LayoutProps = $props();

</script>

<NavigationHeader />

<main>
  {@render children()}
</main>

<style lang="scss">
  @use "sass:map";

  main {
    max-width: calc(map.get($breakpoints, page-max-width) + ($gutter * 2));
    margin: 0 auto;
    padding: $vertical-offset-large $gutter;
  }
</style>
