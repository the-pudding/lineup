<script>
	import _ from "lodash";
	import slope from "$data/slope.csv";
	import cards from "$data/cards.csv";
	import Slope from "$components/Slope.svelte";
	import Cards from "$components/Cards.svelte";
	import Handwriting from "$components/Handwriting.svelte";
	import { loadedSections } from "$stores/misc.js";
	import squiggle from "$svg/squiggle2.svg";

	export let i;
	export let id;
	export let title;
	export let text;

	const slopeData = slope.filter((d) => d.slot === id);
	const cardsData = cards.filter((d) => d.slot === id);

	$: loaded = $loadedSections[i];
</script>

<section id={`batting-${id}`}>
	<div class="non-cards">
		<h2>
			<Handwriting text={title} wonkiness={5} />
			{@html squiggle}
		</h2>

		<Slope
			sectionI={i}
			{id}
			data={slopeData}
			title={`Change in average attributes of batter #${id}`}
		/>

		{#if text}
			<div class="text">
				{#each text as { value }}
					<p>{@html value}</p>
				{/each}
			</div>
		{/if}
	</div>

	{#if loaded}
		<Cards data={cardsData} {id} sectionI={i} />
	{/if}
</section>

<style>
	section {
		margin: 5rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 3rem;
		font-family: var(--handwriting);
		text-transform: uppercase;
		margin-bottom: 1rem;
		text-align: center;
		position: relative;
	}
	.text {
		margin-top: 1.5rem;
		margin-bottom: 3rem;
	}
	.cards {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.non-cards {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	:global(h2 svg.squiggle) {
		position: absolute;
		top: 100%;
		left: 0;
		transform: translate(0, -25%);
	}
</style>
