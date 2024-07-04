<script>
	import Card from "$components/Card.svelte";
	import _ from "lodash";

	export let data;

	const stacks = ["1970-2009", "2010-present"];
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
	{#each stacks as stackId}
		<div class="stack">
			{#each dataCleaned[stackId] as card}
				<Card {...card} />
			{/each}
			<div class="ghost" />
			<div class="label">{stackId}</div>
		</div>
	{/each}
</div>

<style>
	.cards {
		display: flex;
		width: 100%;
	}
	.stack {
		position: relative;
		width: 50%;
	}
	.ghost {
		height: 250px;
	}
	.label {
		font-weight: bold;
		text-align: center;
		margin-top: 2rem;
	}
</style>
