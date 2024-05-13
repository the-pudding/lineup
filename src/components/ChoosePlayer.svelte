<script>
	import Results from "$components/ChoosePlayer.Results.svelte";
	import _ from "lodash";

	let chosen;

	const onClick = (attr) => {
		if (chosen === attr) chosen = undefined;
		else chosen = attr;
	};
</script>

<h3>Choose Your Player</h3>
<div class="cards">
	{#each ["speed", "average", "power", "walks"] as attr, i}
		<div
			class="card"
			class:chosen={chosen === attr}
			on:click={() => onClick(attr)}
		>
			{attr}
		</div>
	{/each}
</div>

{#if chosen}
	<Results attr={chosen} />
{/if}

<style>
	.cards {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	.card {
		height: 250px;
		width: 200px;
		background: var(--color-gray-100);
		margin: 0 2px;
		text-align: center;
		padding-top: 3rem;
	}
	.card:hover {
		cursor: pointer;
	}
	.card.chosen {
		background: var(--color-gray-300);
		outline: 3px solid var(--color-green);
	}
</style>
