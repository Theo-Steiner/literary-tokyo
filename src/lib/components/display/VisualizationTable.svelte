<script lang="ts">
	import type {
		Visualizations,
		Visualization,
		MappedVisualization,
		Locations
	} from '$lib/types/derived-types';
	import displayedVisualizations from '$lib/utils/displayedVisualizations';
	import { getPointsArrayFromLocations } from '$lib/utils/utils';

	export let visualizations: Visualizations;
	export let locations: Locations;

	$: mappedVisualizations = visualizations.map(
		(visualization: Visualization): MappedVisualization => {
			return {
				name: visualization.name,
				color: visualization.color,
				points: getPointsArrayFromLocations(visualization.points, locations),
				type: visualization.type,
				id: visualization.id,
				description: visualization.description,
				user_id: visualization.user_id
			};
		}
	);

	const toggleSelect = (visualization: MappedVisualization, isSelected: boolean) => {
		if (isSelected) {
			$displayedVisualizations = $displayedVisualizations.filter(
				({ id }) => visualization.id !== id
			);
		} else {
			$displayedVisualizations = [...$displayedVisualizations, visualization];
		}
	};
</script>

<h3>Visualizations available in our database:</h3>
<table>
	<tr><th>name</th><th>type</th></tr>
	{#each mappedVisualizations as visualization (visualization.id)}
		{@const isSelected = $displayedVisualizations.some(({ id }) => id === visualization.id)}
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
