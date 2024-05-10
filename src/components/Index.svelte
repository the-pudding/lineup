<script>
	import Intro from "$components/Intro.svelte";
	import Section from "$components/Section.svelte";
	import _ from "lodash";

	import copy from "$data/copy.json";
</script>

<article>
	<div class="heading">
		<h1>{copy.hed}</h1>
		<div class="byline">{@html copy.byline}</div>
	</div>

	<Intro />

	{#each copy.sections as props}
		<Section {...props} />
	{/each}
</article>

<style>
	article {
		max-width: 650px;
		margin: auto;
		font-family: var(--sans);
	}
	:global(.byline a) {
		font-weight: bold;
	}
	h1 {
		font-family: var(--serif);
	}
	h1,
	.byline {
		text-align: center;
	}
	.heading {
		margin-bottom: 5rem;
	}
</style>
