<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	import { convertToPointsArray } from '$lib/utils/utils';
	const { getMap } = getContext(contextKey);
	export let name: string;
	export let color = 'yellow';
	export let points: string;

	const map = getMap();
	let initialized = false;

	const sourceId = `${name}-line-source`;
	const lineLayerId = `${name}-line-layer`;

	const updateLine = (coordinates: number[][]) => {
		if (initialized) {
			map.getSource(sourceId).setData({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates
				}
			});
		}
	};

	$: coordinates = convertToPointsArray(points);
	$: updateLine(coordinates);

	onMount(() => {
		const preexisting = map.getSource(sourceId);
		if (preexisting) {
			preexisting.setData({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates
				}
			});
			map.setLayoutProperty(lineLayerId, 'visibility', 'visible');
		} else {
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
		}
		return () => {
			map.setLayoutProperty(lineLayerId, 'visibility', 'none');
		};
	});
</script>

<div>
	<slot />
</div>
