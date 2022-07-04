<script context="module">
	export const prerendered = false;
</script>

<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Map from '$lib/components/Map.svelte';
	import mapPosition from '$lib/utils/mapPosition';
</script>

<main>
	<!-- <Navigation /> -->
	<Map gridRow={$mapPosition.rows} gridColumn={$mapPosition.cols} />
	<slot />
</main>

<style>
	main {
		height: 100vh;
		height: 100dvh;
		width: 100vw;
		width: 100dvw;
		display: grid;
		grid-template-rows: 100%;
		grid-template-columns: repeat(3, 1fr);
	}
	/* breakpoint */
</style>
