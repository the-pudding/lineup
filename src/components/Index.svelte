<script>
	import Intro from "$components/Intro.svelte";
	import Sections from "$components/Sections.svelte";
	import _ from "lodash";

	import copy from "$data/copy.json";
</script>

<article>
	<div class="heading">
		<h1>{copy.hed}</h1>
		<div class="byline">{@html copy.byline}</div>
	</div>

	<Intro />

	<Sections />
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

	.progress {
		position: sticky;
		top: 0;
		left: 0;
	}
	.block {
		background: var(--color-gray-100);
		height: 20px;
		width: 50px;
		margin: 2px 0;
	}
</style>
