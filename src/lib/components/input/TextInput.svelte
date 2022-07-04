<script lang="ts">
	export let value: string;
	export let name: string;
	export let type: 'text' | 'email' | 'tel' | 'date' | 'number';

	export let pattern: string | undefined;
	export let required = false;
	export let isValid = false;

	const placeholder = required ? 'Required' : '';
	let inputNode: HTMLInputElement;

	let errorMessage: string;

	/**
	 * @param _value is needed for the reactivity to trigger on value change
	 * @param node is the HTMLInputElement, whose validity will be checked
	 */
	const getInputValidity = (_value: string, node: HTMLInputElement): boolean => {
		if (node?.validity.valueMissing) {
			errorMessage = 'This field is required.';
		} else if (node?.validity.typeMismatch) {
			errorMessage =
				type === 'email' ? 'Please enter a valid email address.' : 'Please enter a valid value.';
		} else {
			errorMessage = 'Please enter a valid value.';
		}
		return node?.validity.valid;
	};
	$: isValid = getInputValidity(value, inputNode);

	// handle input event manually, as binding to values doesn't work with a generic {type}
	const handleInput = (e: Event) => {
		value = (e.target as HTMLInputElement).value;
	};
</script>

{#if ['tel', 'email', 'number'].includes(type)}
	<input
		{required}
		{name}
		id={name}
		{type}
		{placeholder}
		bind:this={inputNode}
		value={value ?? ''}
		on:input={handleInput}
	/>
{:else if type === 'date'}
	<input
		{type}
		{required}
		{name}
		id={name}
		bind:this={inputNode}
		value={value ?? ''}
		on:input={handleInput}
	/>
{:else}
	<input
		pattern={pattern ? pattern : null}
		{required}
		{name}
		id={name}
		type="text"
		{placeholder}
		bind:this={inputNode}
		value={value ?? ''}
		on:input={handleInput}
	/>
{/if}
<p class="extra-small error-message">{errorMessage}</p>

<style>
	input {
		text-overflow: ellipsis;
		margin-bottom: 0.5rem;
	}
</style>
