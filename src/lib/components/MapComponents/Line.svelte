<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	import type { LongLat } from '$lib/types/derived-types';
	const { getMap } = getContext(contextKey);
	export let name: string;
	export let color = 'yellow';
	export let points: LongLat[];

	const map = getMap();
	let initialized = false;

	const sourceId = `${name}-line-source`;
	const lineLayerId = `${name}-line-layer`;

	const updateLine = (points: number[][]) => {
		if (initialized) {
			map.getSource(sourceId).setData({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: points
				}
			});
		}
	};

	$: updateLine(points);

	onMount(() => {
		const preexisting = map.getSource(sourceId);
		if (preexisting) {
			preexisting.setData({
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: points
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
							coordinates: points
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
						'line-width': 3
					}
				});
		}
		initialized = true;
		return () => {
			map.setLayoutProperty(lineLayerId, 'visibility', 'none');
		};
	});
</script>

<div>
	<slot />
</div>
