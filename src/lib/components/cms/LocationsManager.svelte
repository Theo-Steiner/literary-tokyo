<script lang="ts">
	import Form from '../Form.svelte';

	import FormInput from '../input/FormInput.svelte';
	import type { PostgrestError } from '@supabase/supabase-js';
	import userStore from '$lib/utils/userStore';
	import supabase from '$lib/utils/supabase';
	import type { Works, Locations } from '$lib/types/derived-types';
	import PlaceFinder from './PlaceFinder.svelte';
	import { tick } from 'svelte';
	import displayedPlaces from '$lib/utils/displayedPlaces';
	import LocationTable from '../display/LocationTable.svelte';

	export let projectId: number;
	export let locations: Locations;
	export let works: Works;
	let touched: boolean;
	let formDescription = 'Add a location from a work to the map.';

	let error: PostgrestError | null = null;

	let placename = '';
	let latitude = '';
	let longitude = '';
	let longitudeValidity: boolean;
	let latitudeValidity: boolean;

	let selectedPlace: {
		longitude: number;
		latitude: number;
		name: string;
	} | null;

	async function createTentativePlace(..._args: string[]) {
		await tick();
		await tick();
		if (longitudeValidity && latitudeValidity) {
			selectedPlace = {
				longitude: Number(longitude),
				latitude: Number(latitude),
				name: placename
			};
			$displayedPlaces = [selectedPlace];
		}
	}

	$: createTentativePlace(placename, longitude, latitude);

	const completeWithSelection = (e: CustomEvent) => {
		let coordinates;
		({ placename, coordinates } = e.detail);
		longitude = coordinates[0].toString();
		latitude = coordinates[1].toString();
	};

	interface NewLocationFormElements extends HTMLFormControlsCollection {
		source: HTMLInputElement;
		page: HTMLInputElement;
		name: HTMLInputElement;
		latitude: HTMLInputElement;
		longitude: HTMLInputElement;
		annotation: HTMLInputElement;
		tags: HTMLInputElement;
	}

	const handleSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
		error = null;
		const form = e.currentTarget;
		const { source, page, name, longitude, latitude, annotation, tags } =
			form.elements as NewLocationFormElements;
		let data;
		({ data, error } = await supabase.from('locations').insert({
			source: source.value,
			page: page.value,
			name: name.value,
			latitude: Number(latitude.value),
			longitude: Number(longitude.value),
			annotation: annotation.value ? annotation.value : undefined,
			tags: tags.value
				? tags.value
						.toLowerCase()
						.split(',')
						.reduce((acc: string[], val) => {
							return [...acc, val.trim()];
						}, [])
				: undefined,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			user_id: $userStore!.user!.id,
			part_of: projectId
		}));
		form.scrollIntoView();
		if (error || !data) return;
		locations = [...locations, data[0]];
		latitude.value = '';
		longitude.value = '';
		page.value = '';
		name.value = '';
		await tick();
		touched = false;
		formDescription = "Success! While you're at it, add another location!";
	};
</script>

<section>
	<!-- TODO: ADD CRUD FUNCTIONALITY FOR LOCATIONS -->
	<LocationTable {works} {locations} />
	<h3>Project the fictionalized space onto real-life Tokyo!</h3>
	<Form {formDescription} {error} {handleSubmit}>
		<FormInput
			inputType="select"
			options={works.map(({ title }) => title)}
			{touched}
			name="source"
			required
			labelText="What work is this setting from?"
		/>
		<PlaceFinder on:place-selection={completeWithSelection} />
		<FormInput
			{touched}
			name="name"
			bind:value={placename}
			required
			labelText="Name of the location."
		/>
		<FormInput
			{touched}
			pattern="\d+(\.\d+)?"
			name="latitude"
			bind:value={latitude}
			bind:isValid={latitudeValidity}
			required
			labelText="Latitude of the location."
		/>
		<FormInput
			{touched}
			pattern="\d+(\.\d+)?"
			name="longitude"
			bind:value={longitude}
			bind:isValid={longitudeValidity}
			required
			labelText="Longitude of the location."
		/>
		<FormInput
			{touched}
			required
			name="page"
			labelText="On what pages can one verify this location?"
		/>
		<FormInput {touched} name="annotation" labelText="Your annotation to this location." />
		<FormInput
			{touched}
			name="tags"
			labelText="A comma-separated list of one-word tags for this location. The literary map can be filtered by these tags, they could for example specify a character visiting a location."
		/>
		<button type="submit">Add location</button>
	</Form>
</section>

<style>
</style>
