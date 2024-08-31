<script>
	import Handwriting from "$components/Handwriting.svelte";
	import Scrollytelling from "$components/Scrollytelling.svelte";
	import Sections from "$components/Sections.svelte";
	import Footer from "$components/Footer.svelte";
	import _ from "lodash";
	import copy from "$data/copy.json";
	import squiggle from "$svg/squiggle.svg";
</script>

<article>
	<img src="assets/hero.png" style="height: 25rem; margin: auto" />

	<h1>
		<Handwriting text={copy.hed} />
	</h1>
	<div class="subhed">{@html copy.subhed}</div>
	<div class="squiggle-wrapper">{@html squiggle}</div>
	<div class="byline">{@html copy.byline}</div>

	{#each copy.body as { type, value }}
		{#if type === "text"}
			<p>{@html value}</p>
		{:else if type === "scroll"}
			<Scrollytelling steps={value} />
		{:else if type === "sections"}
			<Sections sections={value} />
		{:else if type === "credits"}
			<section id="credits">
				<h2>
					<Handwriting text="Credits" wonkiness={8} />
				</h2>
				{#each value as { value }}
					<p>{@html value}</p>
				{/each}
			</section>
		{:else if type === "methods"}
			<section id="methods">
				<h2>
					<Handwriting text="Methodology" wonkiness={8} />
				</h2>
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
		text-transform: uppercase;
		font-size: 5rem;
		display: flex;
		justify-content: center;
		margin-top: 3rem;
	}
	.subhed {
		text-align: center;
		font-size: 1.5rem;
		margin: 0;
	}
	.squiggle-wrapper {
		position: relative;
		height: 36px;
		margin: 2rem 0;
	}
	h2 {
		font-size: 3rem;
		text-transform: uppercase;
	}
	.byline {
		margin-bottom: 5rem;
		text-align: center;
	}
	p {
		max-width: 630px;
		margin: 1rem auto;
	}
	section {
		max-width: 630px;
		margin: 4rem auto;
	}
	#credits {
		margin-top: 8rem;
	}
	:global(#credits a) {
		white-space: nowrap;
	}
</style>
