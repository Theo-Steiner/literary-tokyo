<script lang="ts">
	import supabase from '$lib/utils/supabase';
	import FormInput from '$lib/components/input/FormInput.svelte';
	import Form from '$lib/components/Form.svelte';
	import type { PostgrestError } from '@supabase/supabase-js';
	import userStore from '$lib/utils/userStore';
	import { goto } from '$app/navigation';
	import { generateSlug } from '$lib/utils/utils';

	let error: PostgrestError | null = null;

	interface NewProjectFormElements extends HTMLFormControlsCollection {
		title: HTMLInputElement;
		author: HTMLInputElement;
	}

	const handleSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
		error = null;
		const { title, author } = e.currentTarget.elements as NewProjectFormElements;
		({ error } = await supabase
			.from('projects')
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.insert({ title: title.value, author: author.value, user_id: $userStore!.user!.id }));
		if (error) return;
		goto(`/manage/${generateSlug(title.value)}`);
	};
</script>

<div class="foreground-overlay">
	<Form {error} {handleSubmit}>
		<FormInput
			pattern="[A-Za-z0-9]+([ ]?[A-Za-z0-9]+)*"
			labelText="A title for your project"
			name="title"
			required
			inputType="text"
		/>
		<FormInput
			labelText="Your name to be displayed alongside"
			name="author"
			required
			inputType="text"
		/>
		<button type="submit"> Create new project </button>
	</Form>
</div>
