<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { definitions } from '$lib/types/supabase';
	export let publishedProjects: definitions['projects'][];
	console.log(publishedProjects);
</script>

<div>
	<h1>literary.tokyo</h1>
	<h2>Explore visualizations of Tokyo based literature</h2>
	<section>
		{#each publishedProjects as project}
			<Card
				url={encodeURI(project.title)}
				title={project.title}
				work={{ author: 'Murakami Haruki', title: '1Q84' }}
				author={project.author}
			/>
		{/each}
		<a href="/manage">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				fill="rgba(255, 255, 255, 0.6)"
				viewBox="0 0 24 24"><path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z" /></svg
			>
		</a>
	</section>
</div>

<style>
	a {
		text-decoration: none;
		display: flex;
		align-items: center;
		color: white;
		font-size: 10rem;
	}
	h1 {
		color: white;
		font-size: 10rem;
	}
	h2 {
		color: white;
		font-size: 2.5rem;
	}

	section {
		height: 25rem;
		gap: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div {
		background-image: radial-gradient(
			100% 100% at 67% 0%,
			rgba(192, 86, 33, 0.7) 0%,
			rgba(219, 39, 65, 0.7) 14.29%,
			rgba(203, 46, 114, 0.7) 28.67%,
			rgba(188, 51, 136, 0.7) 42.86%,
			rgba(173, 56, 150, 0.7) 57.14%,
			rgba(158, 60, 162, 0.7) 71.43%,
			rgba(107, 70, 193, 0.7) 100%
		);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		grid-column: 1 / -1;
		grid-row: 1 / -1;
	}
</style>
