<script lang="ts">
	import ProjectDrawer from '$lib/components/ProjectDrawer.svelte';
	import supabase from '$lib/utils/supabase';
	import type { Projects } from '$lib/types/derived-types';

	import { onMount } from 'svelte';
	import userStore from '$lib/utils/userStore';
	let projects: Projects;
	onMount(async () => {
		const { data, error } = await supabase
			.from('projects')
			.select('*')
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.eq('user_id', $userStore!.user!.id);
		if (error) return;
		projects = data;
	});
</script>

<div class="foreground-overlay">
	<h2>Your Projects</h2>
	<ProjectDrawer {projects} addRoute="/manage/new" />
</div>
