<script lang="ts">
	// @ts-ignore-next-line
	import { Geocoder } from '@beyonk/svelte-mapbox';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let error: string | null;
	// @ts-ignore-next-line
	const handlePlaceSelection = (e) => {
		error = null;
		try {
			const {
				geometry: { coordinates },
				text
			} = e.detail.result;
			dispatch('place-selection', { coordinates, placename: text });
		} catch (_) {
			error = 'Could not extract location details (only works for points)';
		}
	};
</script>

<div on:click={() => (error = null)}>
	{#if error}
		<p>{error}</p>
	{:else}
		<p>Search a place below to autofill latitude, longitude, and place name</p>
	{/if}
	<Geocoder
		accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
		on:result={handlePlaceSelection}
	/>
</div>

<style>
	div {
		padding: 0 2rem 2rem 2rem;
	}
	p {
		margin-bottom: 1rem;
	}
</style>
