<script lang="ts">
	import Form from '../Form.svelte';

	import FormInput from '../input/FormInput.svelte';
	import type { PostgrestError } from '@supabase/supabase-js';
	import userStore from '$lib/utils/userStore';
	import supabase from '$lib/utils/supabase';
	import type { Works, Locations, Visualizations } from '$lib/types/derived-types';
	import { tick } from 'svelte';
	import LocationTable from '../display/LocationTable.svelte';
	import { convertToPointString } from '$lib/utils/utils';
	import VisualizationTable from '../display/VisualizationTable.svelte';

	export let projectId: number;
	export let locations: Locations;
	export let works: Works;
	export let visualizations: Visualizations;

	let touched: boolean;
	let formDescription = 'Add a visualization based on fictionalized locations to the map.';

	let error: PostgrestError | null = null;

	let addedLocations: Locations = [];
	let name: string;
	let type: string;
	let description: string;
	let color: string;

	const addLocation = (e) => {
		if (!addedLocations.find((l) => l.id === e.detail.id)) {
			addedLocations = [...addedLocations, e.detail];
		}
	};

	const removeLocation = (e) => {
		addedLocations = addedLocations.filter((location) => location.id !== e.detail.id);
	};

	async function createTentativePlace(..._args: string[]) {
		await tick();
		await tick();
	}

	const handleSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
		error = null;
		const form = e.currentTarget;
		let data;
		({ data, error } = await supabase.from('visualizations').insert({
			name,
			description,
			type,
			color,
			points: convertToPointString(addedLocations.map((l) => [l.longitude, l.latitude])),
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			user_id: $userStore!.user!.id,
			part_of: projectId
		}));
		form.scrollIntoView();
		if (error || !data) return;
		visualizations = [...visualizations, data[0]];
		form.reset();
		addedLocations = [];
		touched = false;
		formDescription = "Success! While you're at it, add another visualization!";
	};
</script>

<section>
	<VisualizationTable {visualizations} />
	<h3>Create derived visualizations from locations.</h3>
	<Form {formDescription} {error} {handleSubmit}>
		<FormInput
			{touched}
			required
			name="name"
			bind:value={name}
			labelText="Name of the visualization."
		/>
		<FormInput
			{touched}
			required
			name="description"
			bind:value={description}
			labelText="Describe what is visualized here."
		/>
		<FormInput
			inputType="select"
			options={['Path', 'Area']}
			{touched}
			name="type"
			bind:value={type}
			required
			labelText="Do you want to visualize a path or an area?"
		/>
		<FormInput
			{touched}
			required
			name="color"
			bind:value={color}
			labelText="Primary color for the visualization."
		/>
		<LocationTable locations={addedLocations} on:location-select={removeLocation}>
			<h3>Locations for this visualization.</h3>
			<p>
				Add locations from the list at the bottom of this menu or click a location here to remove it
				from the visualization
			</p>
		</LocationTable>
		<button type="submit">Add visualization</button>
	</Form>

	<LocationTable {works} {locations} on:location-select={addLocation} />
</section>

<style>
	p {
		margin: 1rem;
	}
</style>
