<script>
	import Intro from "$components/Intro.svelte";
	import Modal from "$components/Modal.svelte";
	import Sections from "$components/Sections.svelte";
	import { selectedCard } from "$stores/misc.js";
	import _ from "lodash";

	import copy from "$data/copy.json";
</script>

<!-- <article class:disabled={$selectedCard}> -->
<article>
	<!-- <Intro /> -->

	<div class="main">
		<div class="heading">
			<h1>{copy.hed}</h1>

			<div class="byline">{@html copy.byline}</div>
		</div>

		<Sections />
	</div>
</article>

<!-- <Modal /> -->

<style>
	article {
		font-family: var(--sans);
	}
	article.disabled {
		opacity: 0.2;
		pointer-events: none;
	}
	.main {
		max-width: 650px;
		margin: auto;
	}
	:global(.byline a) {
		font-weight: bold;
	}
	h1 {
		font-family: var(--serif);
		font-size: 3.5rem;
		margin-bottom: 2rem;
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
