<script lang="ts">
	export let value = '';
	export let options: string[] = [];
	export let name: string;
	// TODO: what to do with this?
	// export let helpText = undefined;

	let errorMessage = 'This field is required.';
	let touched = false;
	// Validation logic
	export let required: boolean | undefined = undefined;
	export let isValid = false;
	let inputNode: HTMLSelectElement;
	const getInputValidity = (_value: string, node: HTMLSelectElement): boolean => {
		return node?.validity.valid;
	};
	$: isValid = getInputValidity(value, inputNode);
</script>

<select
	on:focus={() => (touched = false)}
	on:blur={() => (touched = true)}
	class:touched
	bind:this={inputNode}
	{required}
	bind:value
	{name}
	id={name}
>
	<option value="" disabled={required} selected>{required ? 'Required' : 'Nothing selected'}</option
	>
	{#each options as option}
		<option value={option}>{option}</option>
	{/each}
</select>

<p class="extra-small error-message">{errorMessage}</p>

<style>
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		text-overflow: ellipsis;
		line-height: 1.85rem;
		background-image: url('data:image/svg+xml;utf8,<svg width="22" height="11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.0002 1.6066L11.3936 9.2132L1.78695 1.6066" stroke="%23407ED3" stroke-width="2" stroke-linecap="round"/></svg>');
		background-repeat: no-repeat;
		background-position: right 2rem center;
	}
</style>
