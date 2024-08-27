<script>
	import _ from "lodash";
	import slope from "$data/slope.csv";
	import cards from "$data/cards.csv";
	import Slope from "$components/Slope.svelte";
	import Cards from "$components/Cards.svelte";
	import Handwriting from "$components/Handwriting.svelte";

	export let i;
	export let id;
	export let title;
	export let text;

	const slopeData = slope.filter((d) => d.slot === id);
	const cardsData = cards.filter((d) => d.slot === id);
</script>

<section id={_.kebabCase(title)}>
	<h2>
		<Handwriting text={title} wonkiness={5} />
	</h2>

	<Slope
		{i}
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

	<Cards data={cardsData} />
</section>

<style>
	section {
		margin: 3rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h2 {
		font-size: 3rem;
		font-family: var(--handwriting);
		text-transform: uppercase;
		align-self: start;
	}
	.text {
		margin: 3rem 0;
	}
	.cards {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
