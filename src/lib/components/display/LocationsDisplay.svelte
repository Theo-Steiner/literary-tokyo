<script lang="ts">
	import type { Works, Locations, Location } from '$lib/types/derived-types';
	import displayedPlaces from '$lib/utils/displayedPlaces';
	import { onMount } from 'svelte';
	import LocationTable from '../display/LocationTable.svelte';
	import FormInput from '../input/FormInput.svelte';

	export let locations: Locations;
	export let works: Works;

	let filteredLocations: Locations = locations;

	let workFilter = '';

	const isPartOf = (location: Location, work: string) => {
		if (work === '') {
			return true;
		}
		return location.source === work;
	};

	const applyFilters = (workFilter: string) => {
		filteredLocations = locations.filter((location) => isPartOf(location, workFilter));
		$displayedPlaces = filteredLocations;
	};

	$: applyFilters(workFilter);

	onMount(() => {
		$displayedPlaces = filteredLocations;
	});
</script>

<section>
	<slot>
		<h3>Locations available in our database:</h3>
		{#if works}
			<FormInput
				inputType="select"
				bind:value={workFilter}
				options={works.map((work) => work.title).sort()}
				labelText="Filter by work:"
			/>
		{/if}
		<p>Click location to show on the map</p>
	</slot>
	<LocationTable on:location-select {works} locations={filteredLocations} />
</section>

<style>
</style>
