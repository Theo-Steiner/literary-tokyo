<script lang="ts">
	export let title: string;
	export let author: string;
	export let url: string;
	export let work;
</script>

<a href={url}>
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
		color: black;
		border-radius: 6px;
		background-color: rgba(255, 255, 255, 0.6);
		margin: 2rem;
		padding: 2rem;
		width: 20rem;
		height: 15rem;
	}
</style>
