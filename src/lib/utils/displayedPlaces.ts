import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Locations } from '$lib/types/derived-types';

const displayedPlaces: Writable<Locations> = writable([]);
export default displayedPlaces;
