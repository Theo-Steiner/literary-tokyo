<script lang="ts">
	import ProjectDrawer from '$lib/components/ProjectDrawer.svelte';
	import type { Projects } from '$lib/types/derived-types';

	export let publishedProjects: Projects;
</script>

<div class="foreground-overlay">
	<h1>literary.tokyo</h1>
	<h2>Explore visualizations of Tokyo based literature</h2>
	<ProjectDrawer projects={publishedProjects} addRoute="/manage" />
</div>

<style>
	h1 {
		color: white;
		font-size: 10rem;
	}
	h2 {
		color: white;
		font-size: 2.5rem;
	}
</style>
