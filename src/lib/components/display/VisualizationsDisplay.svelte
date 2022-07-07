<script lang="ts">
	import type { Works, Locations, Visualizations } from '$lib/types/derived-types';
	import VisualizationTable from '../display/VisualizationTable.svelte';
	export let visualizations: Visualizations;
</script>

<section>
	<VisualizationTable {visualizations} />
</section>

<style>
	h3 {
		color: var(--primary-color);
	}

	p {
		margin: 1rem;
	}
</style>
