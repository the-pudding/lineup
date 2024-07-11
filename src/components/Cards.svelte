<script>
	import Card from "$components/Card.svelte";
	import _ from "lodash";

	export let data;

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
		"pct_at_slot"
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
</script>

<div class="cards">
	{#each eras as era, i}
		<div class="era">
			<div class="stack">
				{#each dataCleaned[era.id].slice(0, 1) as card}
					<Card {...card} />
				{/each}
			</div>
			<div class="label">{era.name}</div>
			<div class="sublabel">({era.id})</div>
		</div>
	{/each}
</div>

<style>
	.cards {
		display: flex;
		width: 100%;
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
