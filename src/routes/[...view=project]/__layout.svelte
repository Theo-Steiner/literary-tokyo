<script lang="ts">
	import mapPosition from '$lib/utils/mapPosition';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		$mapPosition = { rows: '1/-1', cols: '2/-1' };
	});
	onDestroy(() => {
		$mapPosition = { rows: '1/-1', cols: '1/-1' };
	});
</script>

<aside>
	<slot />
</aside>
