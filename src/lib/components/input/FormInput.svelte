<script lang="ts">
	import CheckboxInput from './CheckboxInput.svelte';
	import SelectInput from './SelectInput.svelte';
	import TextInput from './TextInput.svelte';

	type InputType = 'text' | 'number' | 'email' | 'select' | 'checkbox' | 'date';
	export let inputType: InputType = 'text';

	export let value = '';
	// for checkboxes that have a value that has to be bound to.
	export let checked = false;

	export let labelText: string;
	// Name is also used as id
	export let name = labelText;
	// Required for select
	export let options: string[] = [];

	// Validation logic
	export let pattern: string | undefined = undefined;
	export let required = false;
	export let isValid = false;

	export let touched = false;

	if (inputType === 'checkbox') {
		isValid = true;
	}
</script>

<div class="custom-input" on:focusout={() => (touched = true)} class:touched>
	{#if inputType === 'checkbox'}
		<CheckboxInput {labelText} {value} bind:checked {name} />
	{:else}
		<label class="small seperate-line" for={name}>{labelText}</label>
		<div>
			{#if inputType === 'select'}
				<SelectInput bind:value bind:isValid {name} {required} {options} />
			{:else}
				<TextInput bind:value bind:isValid type={inputType} {name} {pattern} {required} />
			{/if}
		</div>
	{/if}
</div>

<style>
	div {
		position: relative;
		width: 100%;
	}

	label {
		margin: 0 2rem;
		padding-bottom: 0.2rem;
		display: block;
	}
</style>
