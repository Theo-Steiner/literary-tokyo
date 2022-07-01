<script context="module">
	export const prerendered = false;
</script>

<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Map from '$lib/components/Map.svelte';
</script>

<main>
	<!-- <Navigation /> -->
	<Map />
	<slot />
</main>

<style>
	main {
		height: 100vh;
		height: 100dvh;
		width: 100vw;
		width: 100dvw;
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: 15rem auto;
	}
</style>
