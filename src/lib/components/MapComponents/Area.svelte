<script>
	import { onMount, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	import concaveman from 'concaveman';
	const { getMap, getMapbox } = getContext(contextKey);
	const map = getMap();
	const unsorted_coordinates = [
		[139.2005, 35.9911],
		[139.63334, 35.43333],
		[139.7005, 35.6911],
		[139.74341, 35.653132],
		[139.4005, 35.3911]
	];
	// TODO: 1. make area and line usable in arbitrary cases
	// TODO: 2. add visualizations to the schema
	// TODO: 3. add filters etc. to the visualizations
	// TODO: 4. add 1Q84 data
	// TODO: 5. create 1Q84 visualizations
	// TODO: 6. add 1Q84 visualizations to master thesis
	// TODO: 7. add public routes
	// TODO: 8. add public routes filters etc.
	// calculate a concave hull for a set of coordinates
	const concave_hull = concaveman(unsorted_coordinates);

	onMount(() => {
		map
			.addSource('polygon-data', {
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: {
						type: 'Polygon',
						coordinates: [concave_hull]
					}
				}
			})
			.addLayer({
				id: 'poly',
				type: 'fill',
				source: 'polygon-data',
				layout: {},
				paint: {
					'fill-color': '#0080ff',
					'fill-opacity': 0.5
				}
			})
			.addLayer({
				id: 'outline',
				type: 'line',
				source: 'polygon-data',
				layout: {},
				paint: {
					'line-color': '#000',
					'line-width': 1
				}
			});
		return () => {
			map.removeLayer('poly');
			map.removeLayer('outline');
			map.removeSource('polygon-data');
		};
	});
</script>

<div>
	<slot />
</div>
