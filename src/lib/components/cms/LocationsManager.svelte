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
	let filter = '';

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
		quote: HTMLInputElement;
		quote_original: HTMLInputElement;
		page: HTMLInputElement;
		name: HTMLInputElement;
		latitude: HTMLInputElement;
		longitude: HTMLInputElement;
		is_precise: HTMLInputElement;
		is_projected: HTMLInputElement;
		annotation: HTMLInputElement;
		date: HTMLInputElement;
		tags: HTMLInputElement;
	}

	const handleSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
		error = null;
		const form = e.currentTarget;
		const {
			source,
			quote,
			quote_original,
			page,
			name,
			longitude,
			latitude,
			is_precise,
			is_projected,
			annotation,
			date,
			tags
		} = form.elements as NewLocationFormElements;
		let data;
		({ data, error } = await supabase.from('locations').insert({
			source: source.value,
			quote: quote.value,
			quote_original: quote_original.value ? quote_original.value : undefined,
			page: Number(page.value),
			name: name.value,
			latitude: Number(latitude.value),
			longitude: Number(longitude.value),
			is_precise: is_precise.checked,
			is_projected: is_projected.checked,
			annotation: annotation.value ? annotation.value : undefined,
			date: date.value ? date.value : undefined,
			tags: tags.value ? tags.value.split(',').forEach((tag) => tag.trim()) : undefined,
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
		touched = false;
		formDescription = "Success! While you're at it, add another location!";
	};
</script>

<section>
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
		<FormInput
			{touched}
			required
			name="quote"
			labelText="The quote this location is derived from."
		/>
		<FormInput {touched} name="quote_original" labelText="Optional Japanese language quote." />
		<FormInput
			{touched}
			required
			inputType="number"
			name="page"
			labelText="Pagenumber of the quote."
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
			inputType="checkbox"
			{touched}
			name="is_precise"
			labelText="Is the location pinpointing somewhere and not fuzzy? 'Shinjuku' is not precise."
		/>
		<FormInput
			inputType="checkbox"
			{touched}
			name="is_projected"
			labelText="Is the location 'projected'? That is not actually visited but dreamed about or longed for."
		/>
		<FormInput {touched} name="annotation" labelText="Your annotation to this location." />
		<FormInput
			{touched}
			inputType="date"
			name="date"
			labelText="Is the location visited on a specified date?"
		/>
		<FormInput
			{touched}
			name="tags"
			labelText="A comma-separated list of one-word tags for this location. The literary map can be filtered by these tags, they could for example specify a character visiting a location."
		/>
		<button type="submit">Add work</button>
	</Form>
	<h3>Locations available in our database:</h3>
	<FormInput
		inputType="select"
		bind:value={filter}
		options={works.map(({ title }) => title)}
		labelText="Filter by work:"
	/>
	<p>Click location to show on the map</p>
	<table>
		<tr><th>location</th><th>work</th><th>page</th></tr>
		{#each locations as location}
			{#if !filter || location.source === filter}
				<tr on:click={() => ($displayedPlaces = [location])}
					><td>{location.name}</td><td>{location.source}</td><td>{location.page}</td></tr
				>
			{/if}
		{/each}
	</table>
</section>
