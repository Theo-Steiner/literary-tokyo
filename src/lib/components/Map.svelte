<script lang="ts">
	import { Map, Marker } from '@beyonk/svelte-mapbox';
	import { onMount, tick } from 'svelte';
	import type mapbox from 'mapbox-gl';
	import { points } from '$lib/data/places.json';

	export let gridRow: string;
	export let gridColumn: string;
	let map: mapbox.Map;
	async function resize(_row: string, _col: string) {
		if (map) {
			await tick();
			map.resize();
		}
	}

	$: resize(gridRow, gridColumn);
	onMount(() => map.setCenter([139.6503, 35.6762]));
</script>

<!-- TODO: refactor to not use grid-row/ column but long-side and short-side and add media query -->
<div style:grid-row={gridRow} style:grid-column={gridColumn}>
	<Map
		accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
		bind:this={map}
		options={{ scrollZoom: true }}
	>
		{#each points as { character, latitude, longitude, quote, book }}
			<!-- filter -->
			{#if true}
				<Marker
					color={character === 'aomame' ? '#a4d236' : '#151515'}
					lat={latitude}
					lng={longitude}
					label={quote}
				/>
			{/if}
		{/each}
	</Map>
</div>

<style>
	@media (min-width: 768px) {
	}
</style>
