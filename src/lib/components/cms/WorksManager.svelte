<script lang="ts">
	import Form from '../Form.svelte';

	import FormInput from '../input/FormInput.svelte';
	import type { PostgrestError } from '@supabase/supabase-js';
	import userStore from '$lib/utils/userStore';
	import supabase from '$lib/utils/supabase';

	export let projectTitle: string;
	export let projectId: number;

	let error: PostgrestError | null = null;

	interface NewWorkFormElements extends HTMLFormControlsCollection {
		title: HTMLInputElement;
		author: HTMLInputElement;
		year: HTMLInputElement;
		citation: HTMLInputElement;
	}

	const handleSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
		error = null;
		const { title, author, year, citation } = e.currentTarget.elements as NewWorkFormElements;
		({ error } = await supabase.from('works').insert({
			title: title.value,
			author: author.value,
			year: year.value,
			citation: citation.value,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			user_id: $userStore!.user!.id,
			part_of: projectId
		}));
		if (error) return;
	};
</script>

<header>
	<p>--{projectTitle}--</p>
	<h2>1. Adding Works</h2>
</header>

<section>
	<Form
		formDescription="Add works you want to create a literary map for in your project."
		{error}
		{handleSubmit}
	>
		<FormInput name="title" required labelText="Title of the work. E.g. 'Sanshirō'." />
		<FormInput name="author" required labelText="Author of the work. E.g. 'Natsume Sōseki'." />
		<FormInput name="year" required labelText="Year of publication. E.g. '1909'." />
		<FormInput name="citation" labelText="Full citation for the work." />
		<button type="submit">Add work</button>
	</Form>
	<p>
		If you just want to create visualizations based on literary maps of users, you can do so in step
		3.
	</p>
</section>

<style>
	header > p {
		color: rgba(255, 255, 255, 0.4);
		text-align: center;
	}

	section {
		height: 100%;
		overflow-y: scroll;
	}
</style>
