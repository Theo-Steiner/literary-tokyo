<script lang="ts">
	// @ts-ignore-next-line
	import { Map, Marker } from '@beyonk/svelte-mapbox';
	import { onMount, tick } from 'svelte';
	import type mapbox from 'mapbox-gl';
	import displayedPlaces from '$lib/utils/displayedPlaces';
	import Line from './MapComponents/Line.svelte';
	import Area from './MapComponents/Area.svelte';
	import TrainToggle from './MapComponents/TrainToggle.svelte';
	import displayedVisualizations from '$lib/utils/displayedVisualizations';

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
	onMount(() => {
		map.setCenter([139.6503, 35.6762]);
	});
</script>

<!-- TODO: refactor to not use grid-row/ column but long-side and short-side and add media query -->
<div style:grid-row={gridRow} style:grid-column={gridColumn}>
	<Map
		accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
		style="mapbox://styles/theo-steiner/cl58dsfrx000014msdychp1gu"
		bind:this={map}
		options={{ scrollZoom: true, version: 'v2.9.0' }}
	>
		{#each $displayedPlaces as { tags, latitude, longitude, name }}
			<Marker
				color={tags?.includes('aomame') ? '#a4d236' : '#151515'}
				lat={latitude}
				lng={longitude}
				label={`<h1>${name}</h1>`}
			>
				<div class="content" slot="popup">
					<h3>{name}</h3>
				</div>
			</Marker>
		{/each}
		{#each $displayedVisualizations as { name, color, points, type, id } (id)}
			{#if type.toLowerCase() === 'path'}
				<Line {points} {color} {name} />
			{:else if type.toLowerCase() === 'area'}
				<Area {points} {color} {name} />
			{/if}
		{/each}
		<TrainToggle />
	</Map>
</div>

<style>
	@media (min-width: 768px) {
	}
</style>
