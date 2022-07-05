<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { getProjectTitleFromSlug } from '$lib/utils/utils';
	export const load: Load = async ({ params }) => {
		const projectTitle = getProjectTitleFromSlug(params.project);
		return {
			props: {
				projectTitle
			}
		};
	};
</script>

<script lang="ts">
	import mapPosition from '$lib/utils/mapPosition';
	import supabase from '$lib/utils/supabase';

	import { onDestroy, onMount } from 'svelte';
	import WorksManager from '$lib/components/cms/WorksManager.svelte';
	import LocationsManager from '$lib/components/cms/LocationsManager.svelte';
	import VisualizationsManager from '$lib/components/cms/VisualizationsManager.svelte';
	import type { Works, Locations } from '$lib/types/derived-types';
	export let projectTitle: string;
	let projectId: number;
	let currentStep = 0;
	const state = ['Manage Works', 'Add Locations', 'Create Visualizations', 'Publish'];
	let works: Works = [];
	let locations: Locations = [];

	async function loadProjectData() {
		const { data, error } = await supabase
			.from('projects')
			//TODO: once , query visualizations (*) once ready
			.select('id, works (*), locations (*)')
			.eq('title', projectTitle);
		if (error) {
			console.error(error);
			return;
		}
		[{ id: projectId, works, locations }] = data;
		console.log(projectId, works, locations);
	}

	onMount(async () => {
		$mapPosition = { rows: '1/-1', cols: '2/-1' };
		await loadProjectData();
	});
	onDestroy(() => {
		$mapPosition = { rows: '1/-1', cols: '1/-1' };
	});
</script>

<aside>
	<header>
		<p>-- {projectTitle} --</p>
		<h2>{currentStep + 1}. {state[currentStep]}</h2>
	</header>
	{#if currentStep == 0}
		<WorksManager {projectId} bind:works />
	{:else if currentStep == 1}
		<LocationsManager {projectId} {works} bind:locations />
	{:else if currentStep == 2}
		<VisualizationsManager />
	{:else}
		<h2>4. Publish</h2>
		<p>
			Request a review for this project. After a succesful review, it will be published to the web
		</p>
	{/if}
	<footer>
		<button disabled={currentStep == 0} on:click={() => currentStep--}>previous</button>
		<button disabled={currentStep == 3} on:click={() => currentStep++}>next</button>
	</footer>
</aside>

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
</style>
