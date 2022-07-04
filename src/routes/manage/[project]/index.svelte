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

	import { onMount } from 'svelte';
	import Works from '$lib/components/cms/Works.svelte';
	import Locations from '$lib/components/cms/Locations.svelte';
	import Visualizations from '$lib/components/cms/Visualizations.svelte';
	export let projectTitle: string;
	let step = 'works';

	onMount(() => {
		$mapPosition = { rows: '1/-1', cols: '2/-1' };
	});
</script>

<section class="sidebar">
	{#if step === 'works'}
		<Works {projectTitle} />
	{:else if step === 'locations'}
		<Locations />
	{:else if step === 'visualizations'}
		<Visualizations />
	{:else}
		<h2>4. Publish</h2>
		<p>
			Request a review for this project. After a succesful review, it will be published to the web
		</p>
	{/if}
</section>

<style>
</style>
