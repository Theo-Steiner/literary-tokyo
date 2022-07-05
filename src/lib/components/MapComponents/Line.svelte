<script>
	import { onMount, getContext } from 'svelte';
	import { contextKey } from '@beyonk/svelte-mapbox';
	const { getMap, getMapbox } = getContext(contextKey);
	const map = getMap();
	const mapbox = getMapbox();

	onMount(() => {
		map
			.addSource('my-data', {
				type: 'geojson',
				data: {
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates: [
							[139.74341, 35.653132],
							[139.63334, 35.43333]
						]
					},
					properties: {}
				}
			})
			.addLayer({
				id: 'route',
				type: 'line',
				source: 'my-data',
				paint: {
					'line-color': 'yellow',
					'line-width': 2
				}
			});
		return () => {
			map.removeLayer('route');
			map.removeSource('my-data');
		};
	});
</script>

<div>
	<slot />
</div>
