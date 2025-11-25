<script lang="ts">
  import type { LayoutProps } from './$types';
	import NavigationHeader from '$lib/components/layout/NavigationHeader.svelte';

  let { children }: LayoutProps = $props();

</script>

<NavigationHeader />

<main>
  {@render children()}
</main>
