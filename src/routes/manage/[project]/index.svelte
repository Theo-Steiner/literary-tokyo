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
	import type { Works } from '$lib/types/derived-types';
	export let projectTitle: string;
	let projectId: number;
	let step = 'works';
	let works: Works = [];

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
		console.log(data);
		[{ id: projectId, works }] = data;
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
	{#if step === 'works'}
		<WorksManager {projectTitle} {projectId} />
	{:else if step === 'locations'}
		<LocationsManager />
	{:else if step === 'visualizations'}
		<VisualizationsManager />
	{:else}
		<h2>4. Publish</h2>
		<p>
			Request a review for this project. After a succesful review, it will be published to the web
		</p>
	{/if}
</aside>

<style>
</style>
