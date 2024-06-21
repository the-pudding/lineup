<script>
	import _ from "lodash";
	import slopeData from "$data/slope.csv";
	import Slope from "$components/Slope.svelte";
	import Stack from "$components/Stack.svelte";

	export let i;
	export let currentSection;
	export let id;
	export let title;
	export let description;
	export let players;

	const data = slopeData.filter((d) => d.slot === id);
</script>

<section id={_.kebabCase(title)}>
	<h2>{title}</h2>

	<Slope {data} title={`Change in average attributes of batter #${id}`} />

	{#if description}
		<div class="description">
			{#each description as { text }}
				<p>{@html text}</p>
			{/each}
		</div>
	{/if}

	{#if players}
		<div class="cards">
			<Stack
				players={players.filter((d) => d.type === "old")}
				label="pre-stats (70s/80s/90s)"
			/>
			<Stack
				players={players.filter((d) => d.type === "new")}
				label="post-stats (2020s)"
			/>
		</div>
	{/if}
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
