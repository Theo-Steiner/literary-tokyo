<script lang="ts">
	export let value = 'false';
	export let name: string;
	export let labelText: string;
	export let checked = true;
	// get initial value
	if (value === 'true') {
		checked = true;
	}
</script>

<div>
	<input {name} id={name} bind:checked type="checkbox" value={`${name}-false`} />
	<label class="small" for={name}>{labelText}</label>
	{#if !checked}
		<input {name} hidden value={`${name}-false`} />
	{/if}
</div>

<style>
	div {
		padding: 0 6.1rem 3.5rem 0;
		display: flex;
		align-items: center;
		position: relative;
	}

	input:focus {
		/* outline: none; */
		border-color: var(--primary-color);
	}
</style>
