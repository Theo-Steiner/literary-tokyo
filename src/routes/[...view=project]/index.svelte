<script lang="ts">
	import VisualizationsDisplay from '$lib/components/display/VisualizationsDisplay.svelte';
	import LocationsDisplay from '$lib/components/display/LocationsDisplay.svelte';
	import type { Project, Works, Locations, Visualizations } from '$lib/types/derived-types';
	export let project: Project;

	export let works: Works = [];
	export let locations: Locations = [];
	export let visualizations: Visualizations = [];
	export let projectSlug: string;
</script>

<header>
	<p>-- {project.author} --</p>
	<h2>{project.title}</h2>
</header>
<section>
	<VisualizationsDisplay {locations} {visualizations} />
	<LocationsDisplay {works} {locations} />
</section>
<footer>
	<a href="/">literary.tokyo</a>
</footer>

{#each visualizations as visualization}
	<a style="display: none;" href="/{projectSlug}/{visualization.id}">{visualization.name}</a>
{/each}

<style>
	header > p {
		color: rgba(255, 255, 255, 0.9);
	}

	header {
		border-bottom: 1px solid var(--primary-color);
		box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
		padding: 2rem;
		color: white;
		text-align: center;
	}
	footer {
		border-top: 1px solid var(--primary-color);
		padding: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	footer > a {
		color: white;
		text-decoration: none;
	}
</style>
