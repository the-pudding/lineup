<script>
	import _ from "lodash";
	import slope from "$data/slope.csv";
	import players from "$data/players.csv";
	import Slope from "$components/Slope.svelte";
	import Cards from "$components/Cards.svelte";

	export let i;
	export let currentSection;
	export let id;
	export let title;
	export let description;

	const slopeData = slope.filter((d) => d.slot === id);
	const playersData = players.filter((d) => d.slot === id);
</script>

<section id={_.kebabCase(title)}>
	<h2>{title}</h2>

	<Slope
		data={slopeData}
		title={`Change in average attributes of batter #${id}`}
	/>

	{#if description}
		<div class="description">
			{#each description as { text }}
				<p>{@html text}</p>
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
		font-family: var(--serif);
		align-self: start;
	}
	.description {
		margin: 3rem 0;
	}
	.cards {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
