<script>
	import Handwriting from "$components/Handwriting.svelte";
	import toronto from "$data/toronto.csv";
	import _ from "lodash";
	import { scaleLinear } from "d3-scale";
	import { interpolateRgb } from "d3-interpolate";

	export let step;

	const attr = ["average", "power", "walks", "speed"];
	const stepShowModern = 4;
	const highlights = [
		{
			step: 1,
			era: "old",
			name: "Joe Carter"
		}
	];

	const startColor = "rgba(255,0,0,0.4)";
	const endColor = "rgba(0,255,0,0.4)";
	const colorScale = scaleLinear()
		.domain([0, 5])
		.interpolate(interpolateRgb)
		.range([startColor, endColor]);

	toronto.forEach((d) => {
		[...attr, "oldSlot", "newSlot"].forEach((a) => {
			d[a] = +d[a];
		});
	});
</script>

<div class="lineups">
	{#each ["old", "new"] as lineup}
		{@const data = _.orderBy(toronto, lineup === "old" ? "oldSlot" : "newSlot")}
		<div
			class={lineup}
			class:visible={lineup === "old" || step >= stepShowModern}
		>
			<table class="outer">
				<tr class="head">
					<th colspan="3"
						>{lineup === "old" ? 1993 : `"2024"`} Toronto Blue Jays</th
					>
				</tr>
				<tr class="head-2">
					<td>Pos.</td>
					<td>Player</td>
					<td>Attributes</td>
				</tr>
				{#each data as { name, average, power, walks, speed }, i}
					{@const stats = { average, power, walks, speed }}
					{@const faded = highlights.find(
						(d) => d.step === step && d.era === lineup && d.name !== name
					)}
					<tr class:faded>
						<td>{i + 1}</td>
						<td class="name">
							<Handwriting text={name.split(" ")[1]} wonkiness={3} />
						</td>
						<td class="contains-table">
							<table class="inner">
								<tr class="top">
									{#each attr as a}
										<td>{a === "average" ? "avg" : a}</td>
									{/each}
								</tr>
								<tr class="bottom">
									{#each attr as a}
										<td style:background={colorScale(stats[a])}>{stats[a]}</td>
									{/each}
								</tr>
							</table>
						</td>
					</tr>
				{/each}
			</table>
		</div>
	{/each}
</div>

<style>
	.lineups {
		position: sticky;
		top: 50%;
		transform: translate(0, -50%);
		display: flex;
		z-index: -1;
	}
	.old,
	.new {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 0.5rem;
		padding: 0.5rem;
		background: white;
		border: 4px solid black;
		opacity: 0;
		transition: opacity 0.5s;
	}
	.old .outer {
		border: 2px solid dodgerblue;
	}
	.new .outer {
		border: 2px solid darkblue;
	}
	.visible {
		opacity: 1;
	}
	h3 {
		text-align: center;
	}
	table {
		width: 100%;
		table-layout: auto;
		font-family: var(--serif);
		text-transform: uppercase;
	}
	td {
		padding: 0 4px;
		white-space: nowrap;
		vertical-align: middle;
		text-align: center;
	}
	td.name {
		font-family: var(--handwriting);
		font-size: 1.3rem;
		text-align: left;
	}
	td.contains-table {
		padding: 0;
	}
	td:not(.contains-table):not(.inner td):not(.name) {
		border: 1px solid black;
	}
	.inner td {
		border-right: 1px solid black;
	}
	.inner td:last-child {
		border-right: 0px;
	}
	tr {
		border: 1px solid black;
		transition: opacity 0.5s;
	}
	tr.head {
		font-family: var(--sans);
		font-size: 1.2rem;
		border: none;
	}
	tr.head-2 td {
		font-size: 0.8rem;
	}
	tr.faded {
		opacity: 0.2;
	}
	th {
		text-align: center;
	}
	.top {
		border-top: 0px;
	}
	.bottom {
		border-bottom: 0px;
		font-family: var(--handwriting);
		font-size: 1rem;
	}
	.top,
	.bottom {
		border-right: 0px;
	}
	table.inner {
		font-size: 0.8rem;
	}
</style>
