<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	const { getMap, getMapbox } = getContext(contextKey);
	const map = getMap();
	const mapbox = getMapbox();

	const trainLayers = [
		'subway',
		// colored rail lines
		'rail-low-case',
		// white surrounding and line names
		'rail-low',
		// dashed rail
		'rail-low-dash',
		'rail-label-line',
		'subway-label-line',
		'transit-label',
		'transit-label-low-zoom'
	];
	function toggleTrains(..._: any[]) {
		for (const layer of trainLayers) {
			let visibility = map.getLayoutProperty(layer, 'visibility');
			if (visibility === 'visible' || !visibility) {
				map.setLayoutProperty(layer, 'visibility', 'none');
			} else {
				map.setLayoutProperty(layer, 'visibility', 'visible');
			}
		}
	}
	// turn off train layer initially
	onMount(() => toggleTrains());
</script>

<button on:click={toggleTrains}>toggle trains</button>

<style>
	button {
		position: absolute;
		z-index: 299;
		bottom: 2rem;
		right: 2rem;
	}
</style>
