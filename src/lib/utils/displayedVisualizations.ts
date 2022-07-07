import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Visualizations } from '$lib/types/derived-types';

const displayedVisualizations: Writable<Visualizations> = writable([]);
export default displayedVisualizations;
