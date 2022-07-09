import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { MappedVisualizations } from '$lib/types/derived-types';

const displayedVisualizations: Writable<MappedVisualizations> = writable([]);
export default displayedVisualizations;
