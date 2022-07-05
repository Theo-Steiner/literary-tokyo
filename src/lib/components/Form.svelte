<script lang="ts">
	import type { ApiError, PostgrestError } from '@supabase/supabase-js';

	export let handleSubmit: (e: SubmitEvent & { currentTarget: HTMLFormElement }) => void;
	export let error: PostgrestError | ApiError | null = null;
	export let formDescription = '';
	export let maxHeight: string | undefined = undefined;
</script>

<form style:max-height={maxHeight ? maxHeight : 'none'} on:submit|preventDefault={handleSubmit}>
	{#if error}
		<p class="error">{error.message}</p>
		{#if 'hint' in error && error.hint}
			<p class="error">{error.hint}</p>
		{/if}
		{#if 'details' in error && error.details}
			<p class="error">{error.details}</p>
		{/if}
	{/if}
	{#if formDescription}
		<p>{formDescription}</p>
	{/if}
	<slot />
</form>

<style>
	p {
		color: var(--primary-color);
		font-weight: bold;
		margin-bottom: 2rem;
	}

	.error {
		color: var(--error-color);
		font-weight: bold;
	}
</style>
