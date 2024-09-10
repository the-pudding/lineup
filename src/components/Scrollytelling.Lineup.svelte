<script>
	import Handwriting from "$components/Handwriting.svelte";
	import _ from "lodash";
	import { scaleLinear } from "d3-scale";
	import { interpolateRgb } from "d3-interpolate";
	import { flip } from "svelte/animate";
	import variables from "$data/variables.json";
	import changeOpacity from "$utils/changeOpacity.js";

	export let era;
	export let year;
	export let visible;
	export let data;
	export let highlights;
	export let step;

	const attr = ["average", "power", "walks", "speed"];
	const startColor = changeOpacity(variables.color["green-dark"], 0.5);
	const endColor = variables.color["green-bright"];
	const colorScale = scaleLinear()
		.domain([0, 5])
		.interpolate(interpolateRgb)
		.range([startColor, endColor]);
</script>

<div class={era} class:visible>
	<table class="outer">
		<tr class="head">
			<th colspan="3">{year} Toronto Blue Jays</th>
		</tr>
		<tr class="head-2">
			<td>Pos.</td>
			<td>Player</td>
			<td>Attributes (0-5)</td>
		</tr>
		{#each data as { name, average, power, walks, speed }, i (name)}
			{@const stats = { average, power, walks, speed }}
			{@const faded =
				highlights.find((d) => d.era === era && d.step === step) &&
				highlights
					.filter((d) => d.era === era && d.step === step)
					.every((d) => d.name !== name)}
			<tr
				class={`${name.split(" ")[1].toLowerCase()} row`}
				class:faded
				animate:flip={{
					delay: visible ? 1000 : 500,
					duration: visible ? 2500 : 0
				}}
			>
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

<style>
	.old,
	.new {
		position: relative;
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
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
		border: 2px solid rgb(11, 44, 77);
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
		font-family: var(--sans);
	}
	.bottom td {
		padding: 2px 0;
	}
	.top,
	.bottom {
		border-right: 0px;
	}
	table.inner {
		font-size: 0.8rem;
	}
</style>
