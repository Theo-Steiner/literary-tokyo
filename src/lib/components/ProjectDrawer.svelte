<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Projects } from '$lib/types/derived-types';
	import { generateSlug } from '$lib/utils/utils';
	export let projects: Projects = [];
	export let addRoute: string;
</script>

<section>
	{#each projects as project}
		<Card
			url={`${addRoute.includes('new') ? '/manage/' : '/'}${generateSlug(project.title)}`}
			title={project.title}
			work={{ author: 'Murakami Haruki', title: '1Q84' }}
			author={project.author}
		/>
	{/each}
	<a class="card" href={addRoute}>
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
		height: 50vh;
		width: 80vw;
		border-radius: 8px;
		overflow: auto;
		gap: 2rem;
		background-color: rgba(255, 255, 255, 0.1);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	a {
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.6);
		font-size: 10rem;
	}
</style>
