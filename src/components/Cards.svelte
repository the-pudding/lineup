<script>
	import Card from "$components/Card.svelte";
	import _ from "lodash";

	export let data;
	export let id;

	const eras = [
		{ id: "1970-2009", name: "Pre-Stats" },
		{ id: "2010-present", name: "Post-Stats" }
	];
	const attributes = [
		"win_shares",
		"average",
		"power",
		"walks",
		"speed",
		"pct_at_slot",
		"rank"
	];
	const dataCleaned = _.groupBy(
		data.map((d) => {
			const obj = d;
			attributes.forEach((attr) => {
				obj[attr] = +d[attr];
			});
			return obj;
		}),
		"era"
	);
	const shuffle = () => {
		eras.forEach((era) => {
			dataCleaned[era.id] = [
				dataCleaned[era.id][1],
				dataCleaned[era.id][2],
				dataCleaned[era.id][0]
			];
		});
	};
</script>

<div class="cards">
	{#each eras as era, i}
		<div class="era">
			<div class="stack">
				{#each dataCleaned[era.id] as card, i}
					<Card {...card} {i} {id} />
				{/each}
			</div>
			<div class="label">{era.name}</div>
			<div class="sublabel">({era.id})</div>
		</div>

		{#if i === 0}
			<button class="shuffle" on:click={shuffle}>shuffle</button>
		{/if}
	{/each}
</div>

<style>
	.cards {
		display: flex;
		align-items: center;
		width: 100%;
		margin: 2.5rem 0;
	}
	.era {
		position: relative;
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.stack {
		margin-bottom: 1rem;
		position: relative;
	}
	.label,
	.sublabel {
		font-weight: bold;
		text-align: center;
	}
	.sublabel {
		font-size: 0.9rem;
		color: var(--color-gray-700);
		font-family: var(--mono);
	}
</style>
