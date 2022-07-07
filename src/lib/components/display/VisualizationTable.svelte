<script lang="ts">
	import type { Visualizations, Visualization } from '$lib/types/derived-types';
	import displayedVisualizations from '$lib/utils/displayedVisualizations';
	export let visualizations: Visualizations;
	const toggleSelect = (visualization: Visualization, isSelected: boolean) => {
		if (isSelected) {
			$displayedVisualizations = $displayedVisualizations.filter((v) => v.id !== visualization.id);
		} else {
			$displayedVisualizations = [...$displayedVisualizations, visualization];
		}
	};
</script>

<h3>Visualizations available in our database:</h3>
<table>
	<tr><th>name</th><th>type</th></tr>
	{#each visualizations as visualization (visualization.id)}
		{@const isSelected = $displayedVisualizations.some((v) => v.id === visualization.id)}
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
