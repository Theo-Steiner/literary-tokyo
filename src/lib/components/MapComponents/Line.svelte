<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	import { convertToPointsArray } from '$lib/utils/utils';
	const { getMap } = getContext(contextKey);
	export let name: string;
	export let color = 'yellow';
	export let points: string;
	$: coordinates = convertToPointsArray(points);
	const map = getMap();

	$: console.log(coordinates);
	const sourceId = `${name}-line-source`;
	const lineLayerId = `${name}-line-layer`;

	onMount(() => {
		map
			.addSource(sourceId, {
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates
					},
					properties: {}
				}
			})
			.addLayer({
				id: lineLayerId,
				type: 'line',
				source: sourceId,
				paint: {
					'line-color': color,
					'line-width': 2
				}
			});
		return () => {
			map.removeLayer(lineLayerId);
			map.removeSource(sourceId);
		};
	});
</script>

<div>
	<slot />
</div>
