<script lang="ts">
	import type { ApiError, PostgrestError } from '@supabase/supabase-js';

	export let handleSubmit: (e: SubmitEvent & { currentTarget: HTMLFormElement }) => void;
	export let error: PostgrestError | ApiError | null = null;
</script>

<form on:submit|preventDefault={handleSubmit}>
	{#if error}
		<p>{error.message}</p>
		{#if 'hint' in error && error.hint}
			<p>{error.hint}</p>
		{/if}
		{#if 'details' in error && error.details}
			<p>{error.details}</p>
		{/if}
	{/if}
	<slot />
</form>

<style>
	p {
		color: var(--error-color);
		font-weight: bold;
	}
</style>
