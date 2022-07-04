<script lang="ts">
	import supabase from '$lib/utils/supabase';
	import LoginForm from '$lib/components/LoginForm.svelte';
	import { onMount } from 'svelte';
	import userStore from '$lib/utils/userStore';
	const signOut = () => {
		supabase.auth.signOut();
		$userStore = null;
	};
	onMount(() => {
		$userStore = supabase.auth.session();
	});
</script>

{#if $userStore === undefined}
	<div class="foreground-overlay">loading...</div>
{:else if !$userStore}
	<LoginForm />
{:else}
	<button class="foreground" on:click={signOut}>logout</button>
	<slot />
{/if}

<style>
	button {
		margin: 1rem;
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
