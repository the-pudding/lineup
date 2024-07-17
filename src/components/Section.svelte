<script>
	import _ from "lodash";
	import slope from "$data/slope.csv";
	import players from "$data/players.csv";
	import Slope from "$components/Slope.svelte";
	import Cards from "$components/Cards.svelte";

	export let id;
	export let title;
	export let text;
	export let cards;

	const slopeData = slope.filter((d) => d.slot === id);
	const playersData = players
		.filter((d) => d.slot === id && d.rank <= 3)
		.map((d) => ({
			...d,
			blurb: cards.find((c) => c.name === d.name)?.blurb
		}));
</script>

<section id={_.kebabCase(title)}>
	<h2>{title}</h2>

	<Slope
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

	<Cards data={playersData} />
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
		font-family: var(--serif);
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
