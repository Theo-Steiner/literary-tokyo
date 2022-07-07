<script lang="ts">
	import type { Works, Locations, Location } from '$lib/types/derived-types';
	import displayedPlaces from '$lib/utils/displayedPlaces';
	import { createEventDispatcher } from 'svelte';
	export let locations: Locations;
	export let works: Works | null = null;
	const dispatch = createEventDispatcher();
	const toggleSelect = (location: Location, isSelected: boolean) => {
		dispatch('location-select', location);
		if (isSelected && locations) {
			$displayedPlaces = locations;
		} else if (locations) {
			$displayedPlaces = [location];
		}
	};
</script>

<table>
	<tr><th>location</th><th>work</th><th>page</th></tr>
	{#each locations as location (location.id)}
		{@const isSelected = $displayedPlaces[0]?.id === location.id && $displayedPlaces.length == 1}
		<tr class:selected={isSelected} on:click={() => toggleSelect(location, isSelected)}
			><td>{location.name}</td><td>{location.source}</td><td>{location.page}</td></tr
		>
	{/each}
</table>

<style>
	.selected {
		background-color: #f0f0f0;
	}
	.selected td {
		border-radius: 8px;
	}
</style>
