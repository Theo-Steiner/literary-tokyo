<script lang="ts">
	import type { Locations, Visualizations } from '$lib/types/derived-types';
	import VisualizationTable from '../display/VisualizationTable.svelte';
	export let visualizations: Visualizations;
	export let locations: Locations;
</script>

<section>
	<VisualizationTable {locations} {visualizations} />
</section>

<style>
	h3 {
		color: var(--primary-color);
	}

	p {
		margin: 1rem;
	}
</style>
