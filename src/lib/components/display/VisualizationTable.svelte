<script lang="ts">
	import type { Visualizations, Visualization } from '$lib/types/derived-types';
	import displayedVisualizations from '$lib/utils/displayedVisualizations';
	export let visualizations: Visualizations;
	const toggleSelect = (visualization: Visualization, isSelected: boolean) => {
		if (isSelected) {
			$displayedVisualizations = visualizations;
		} else {
			$displayedVisualizations = [visualization];
		}
	};
</script>

<h3>Visualizations available in our database:</h3>
<table>
	<tr><th>name</th><th>type</th></tr>
	{#each visualizations as visualization (visualization.id)}
		{@const isSelected =
			$displayedVisualizations[0]?.id === visualization.id && $displayedVisualizations.length == 1}
		<tr class:selected={isSelected} on:click={() => toggleSelect(visualization, isSelected)}
			><td>{visualization.name}</td><td>{visualization.type}</td></tr
		>
	{/each}
</table>

<style>
	.selected {
		background-color: #f0f0f0;
	}
	.selected td {
		border-radius: 8px;
	}
</style>
