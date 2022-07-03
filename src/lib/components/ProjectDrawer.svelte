<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Projects } from '$lib/types/derived-types';
	export let projects: Projects = [];
	export let addRoute: string;
</script>

<section>
	{#each projects as project}
		<Card
			url={encodeURI(project.title)}
			title={project.title}
			work={{ author: 'Murakami Haruki', title: '1Q84' }}
			author={project.author}
		/>
	{/each}
	<a href={addRoute}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			fill="rgba(255, 255, 255, 0.6)"
			viewBox="0 0 24 24"><path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z" /></svg
		>
	</a>
</section>

<style>
	section {
		height: 25rem;
		gap: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	a {
		text-decoration: none;
		display: flex;
		align-items: center;
		color: white;
		font-size: 10rem;
	}
</style>
