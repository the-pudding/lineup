<script>
	import Card from "$components/Stack.Card.svelte";
	import _ from "lodash";

	export let players;
	export let label;

	let order = players;

	const angles = [-2, 4, -5];
	const xs = [-2, 2, -5];
	const ys = [-2, 2, -5];
	const colors = [
		"var(--color-gray-100)",
		"var(--color-gray-300)",
		"var(--color-gray-500)"
	];
</script>

<div class="stack">
	<div class="cards">
		<Card type="ghost" />
		{#each players as player, i}
			{@const orderI = order.indexOf(player)}
			<Card
				{player}
				top={`${ys[i]}px`}
				left={`${xs[i]}px`}
				transform={`rotate(${angles[i]}deg)`}
				background={colors[i]}
				zIndex={players.length - 1 - orderI}
				bind:order
			/>
		{/each}
	</div>
	<div class="label">{label}</div>
</div>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.cards {
		position: relative;
	}
	.label {
		font-weight: bold;
		margin-top: 1rem;
		text-align: center;
	}
</style>
