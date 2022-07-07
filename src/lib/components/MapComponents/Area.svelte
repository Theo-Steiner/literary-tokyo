<script lang="ts">
	import { onMount, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	import concaveman from 'concaveman';
	import { convertToPointsArray } from '$lib/utils/utils';
	export let name: string;
	export let points: string;
	export let color = 'white';

	const { getMap } = getContext(contextKey);
	const map = getMap();
	let initialized = false;

	const sourceId = `${name}-area-source`;
	const areaLayerId = `${name}-area-layer`;
	const outlineLayerId = `${name}-area-outline-layer`;

	// calculate a concave hull for a set of coordinates if necessary
	$: polygon = concaveman(convertToPointsArray(points));

	const updatePolygon = (polygon: number[]) => {
		if (initialized) {
			map.getSource(sourceId).setData({
				type: 'Feature',
				geometry: {
					type: 'Polygon',
					coordinates: [polygon]
				}
			});
		}
	};

	$: updatePolygon(polygon);

	onMount(() => {
		map
			.addSource(sourceId, {
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [polygon]
					}
				}
			})
			.addLayer({
				id: areaLayerId,
				type: 'fill',
				source: sourceId,
				layout: {},
				paint: {
					'fill-color': color,
					'fill-opacity': 0.3
				}
			})
			.addLayer({
				id: outlineLayerId,
				type: 'line',
				source: sourceId,
				layout: {},
				paint: {
					'line-color': '#000',
					'line-width': 1
				}
			});
		return () => {
			map.removeLayer(areaLayerId);
			map.removeLayer(outlineLayerId);
			map.removeSource(sourceId);
		};
	});
</script>

<div>
	<slot />
</div>
