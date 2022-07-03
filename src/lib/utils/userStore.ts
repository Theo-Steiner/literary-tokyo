import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Session } from '@supabase/supabase-js';

const userStore: Writable<Session | null> = writable(null);
export default userStore;
