<script>
	import Card from "$components/Card.svelte";
	import cards from "$data/cards.csv";
	import _ from "lodash";
</script>

<div class="all-cards">
	{#each cards as card, i}
		<div class="card-wrapper">
			<Card
				{i}
				id={_.kebabCase(card.name)}
				info={{ ...card }}
				withWidth={true}
			/>
		</div>
	{/each}
</div>

<style>
	.all-cards {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}
	.card-wrapper {
		position: relative;
	}
</style>
