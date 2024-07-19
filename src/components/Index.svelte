<script>
	import Scrollytelling from "$components/Scrollytelling.svelte";
	import Sections from "$components/Sections.svelte";
	import Footer from "$components/Footer.svelte";
	import _ from "lodash";
	import copy from "$data/copy.json";

	$: console.log(copy);
</script>

<article>
	<h1>{copy.hed}</h1>
	<div class="byline">{@html copy.byline}</div>

	{#each copy.body as { type, value }}
		{#if type === "text"}
			<p>{@html value}</p>
		{:else if type === "scroll"}
			<Scrollytelling steps={value} />
		{:else if type === "sections"}
			<Sections sections={value} />
		{:else if type === "methods"}
			<section id="methods">
				<h3>Methodology</h3>
				{#each value as { value }}
					<p>{@html value}</p>
				{/each}
			</section>
		{/if}
	{/each}

	<Footer />
</article>

<style>
	h1 {
		font-family: var(--handwriting);
		font-size: 3.5rem;
		max-width: 1000px;
		margin: 0 auto;
		margin-bottom: 2rem;
		text-align: center;
	}
	.byline {
		margin-bottom: 5rem;
		text-align: center;
	}
	p {
		max-width: 630px;
		margin: 1rem auto;
	}
	#methods {
		max-width: 630px;
		margin: 0 auto;
		margin-top: 5rem;
		margin-bottom: 10rem;
	}
</style>
