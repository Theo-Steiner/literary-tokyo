import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

type Position = { rows: string; cols: string };

// holds the grid position for the map
const layoutStore: Writable<Position> = writable({ rows: '1/-1', cols: '1/-1' });
export default layoutStore;
