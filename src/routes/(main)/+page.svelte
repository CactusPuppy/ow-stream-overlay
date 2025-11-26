<script lang="ts">
  import { getContext } from "svelte";
  import type { User } from "@prisma/client";
	import type { PageProps } from "./$types";
	import OverlayItem from "$lib/components/items/OverlayItem.svelte";
  import { overwatchHeroes } from "$lib/constants/overwatch";

  const user: User = getContext('user');
  const { data }: PageProps = $props();
  const { items } = $derived(data);

  const orderedItems = $derived(items.sort((a, b) => {
    const aIndex = overwatchHeroes.findIndex(hero => hero.name === a.name);
    const bIndex = overwatchHeroes.findIndex(hero => hero.name === b.name);
    return aIndex - bIndex;
  }));
</script>

<!-- TODO: List all channels which this user can control -->
<h1>{user.name}'s Overlays</h1>
<div class="flex flex-wrap">
  {#each orderedItems as item}
    <OverlayItem {item} large={true} />
  {/each}
</div>

