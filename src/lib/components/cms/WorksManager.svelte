<script lang="ts">
	import Form from '../Form.svelte';

	import FormInput from '../input/FormInput.svelte';
	import type { PostgrestError } from '@supabase/supabase-js';
	import userStore from '$lib/utils/userStore';
	import supabase from '$lib/utils/supabase';
	import type { Works } from '$lib/types/derived-types';

	export let projectId: number;
	export let works: Works;
	let touched: boolean;
	let formDescription = 'Add works you want to create a literary map for in your project.';

	let error: PostgrestError | null = null;

	interface NewWorkFormElements extends HTMLFormControlsCollection {
		title: HTMLInputElement;
		author: HTMLInputElement;
		year: HTMLInputElement;
		citation: HTMLInputElement;
	}

	const handleSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
		error = null;
		const form = e.currentTarget;
		const { title, author, year, citation } = form.elements as NewWorkFormElements;
		let data;
		({ data, error } = await supabase.from('works').insert({
			title: title.value,
			author: author.value,
			year: year.value,
			citation: citation.value,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			user_id: $userStore!.user!.id,
			part_of: projectId
		}));
		form.scrollTop = 0;
		if (error || !data) return;
		works = [...works, data[0]];
		form.reset();
		touched = false;
		formDescription = 'Success! Add another work to your project.';
	};
</script>

<section>
	<h3>Works in our database:</h3>
	<table>
		<tr><th>title</th><th>author</th><th>year</th></tr>
		{#each works as { title, author, year }}
			<tr><td>{title}</td><td>{author}</td><td>{year}</td></tr>
		{/each}
	</table>
	<h3>Not in there? add to it!</h3>
	<Form {formDescription} {error} {handleSubmit}>
		<FormInput {touched} name="title" required labelText="Title of the work. E.g. 'Sanshirō'." />
		<FormInput
			{touched}
			name="author"
			required
			labelText="Author of the work. E.g. 'Natsume Sōseki'."
		/>
		<FormInput {touched} name="year" required labelText="Year of publication. E.g. '1909'." />
		<FormInput {touched} name="citation" labelText="Full citation for the work." />
		<button type="submit">Add work</button>
	</Form>
	<p>
		If you just want to create visualizations based on literary maps of users, you can do so in step
		3.
	</p>
</section>
