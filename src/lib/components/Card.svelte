<script lang="ts">
	export let title: string;
	export let author: string;
	export let url: string;
	export let work;
</script>

<a class="card" href={url}>
	<header>
		<p>{work.title} - {work.author}</p>
		<h3>{title}</h3>
	</header>
	<p>by {author}</p>
</a>

<style>
	header {
		margin-bottom: 2rem;
	}

	header > p {
		font-size: 1.2rem;
	}

	a {
		display: block;
		text-decoration: none;
	}
</style>
