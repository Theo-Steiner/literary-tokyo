<script lang="ts">
	import supabase from '$lib/utils/supabase';
	import userStore from '$lib/utils/userStore';
	import type { ApiError } from '@supabase/supabase-js';
	import Form from './Form.svelte';

	let mode = 'login';
	let error: ApiError | null;

	interface LoginFormElements extends HTMLFormControlsCollection {
		userEmail: HTMLInputElement;
		userPassword: HTMLInputElement;
	}

	const handleSubmit = async (e: SubmitEvent & { currentTarget: HTMLFormElement }) => {
		error = null;
		const {
			userEmail: { value: email },
			userPassword: { value: password }
		} = e.currentTarget.elements as LoginFormElements;
		if (mode === 'login') {
			({ error } = await supabase.auth.signIn({ email, password }));
		} else {
			({ error } = await supabase.auth.signUp({ email, password }));
		}
		if (error) return;
		$userStore = supabase.auth.session();
	};
</script>

<div class="foreground-overlay">
	<Form {error} {handleSubmit}>
		<label>
			<input type="email" autocomplete="username" name="userEmail" placeholder="email" />
			Your email address
		</label>
		<label>
			<input
				type="password"
				autocomplete={mode === 'login' ? 'current-password' : 'new-password'}
				name="userPassword"
				placeholder="*****"
			/>
			Your email address
		</label>
		<button type="submit">{mode}</button>
		{#if mode === 'login'}
			<p>or</p>
			<button type="button" on:click={() => (mode = 'sign-up')}>sign up</button>
		{/if}
	</Form>
</div>
