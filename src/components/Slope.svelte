<script>
	import copy from "$data/copy.json";
	import Balls from "$components/Slope.Balls.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { scaleOrdinal, scalePoint } from "d3-scale";
	import { LayerCake, Svg } from "layercake";
	import _ from "lodash";
	import { loadedSections } from "$stores/misc.js";

	export let sectionI;
	export let id;
	export let data;
	export let title;

	const xKey = "era";
	const xDomain = ["1970-2009", "2010-present"];
	const attributes = ["speed", "average", "power", "walks"];
	const colors = attributes.map((d) => `var(--color-${d})`);

	const dataCleaned = data.map((d) => {
		const obj = { [xKey]: d[xKey] };
		attributes.forEach((attr) => {
			obj[attr] = +d[attr];
		});
		return obj;
	});
	const attributesExplainer = copy.body
		.find((d) => d.type === "methods")
		.value.find((d) => d.type === "ul").value;

	$: loaded = $loadedSections[sectionI];
</script>

<div class="slope chart-container" id={`chart-${id}`}>
	<div class="chart-title">{title}</div>

	<LayerCake
		x={xKey}
		xScale={scalePoint()}
		{xDomain}
		data={dataCleaned}
		yDomain={[0, 5]}
		zScale={scaleOrdinal()}
		zDomain={attributes}
		zRange={colors}
		padding={{ top: 25, right: 75, bottom: 0, left: 75 }}
	>
		<Svg>
			<AxisX dy={20} />
			<AxisY textAnchor={"end"} />
			<AxisY gridlines={false} dxTick={"100%"} textAnchor={"start"} />

			{#if loaded}
				<Balls {id} />
			{/if}
		</Svg>
	</LayerCake>
</div>

<div class="methods">
	<details>
		<summary>What are these attributes?</summary>
		<ul>
			{#each attributesExplainer as { value }}
				<li>{@html value}</li>
			{/each}
		</ul>
		<div>See <a href="#methods">methodology</a> for more.</div>
	</details>
</div>

<style>
	.methods {
		font-family: var(--mono);
		color: var(--color-gray-800);
		margin-top: 2rem;
		width: 100%;
		max-width: 500px;
		font-size: 0.9rem;
	}
	ul {
		margin: 1.5rem 0;
	}
	summary:hover {
		cursor: pointer;
	}
	.chart-container {
		font-family: var(--mono);
		width: 100%;
		max-width: 400px;
		height: 300px;
		margin-top: 2rem;
		margin-bottom: 3rem;
	}
	.chart-title {
		font-weight: bold;
	}
	:global(.slope .x-axis text) {
		font-size: 18px;
	}
	:global(.slope .y-axis text) {
		font-size: 14px;
		alignment-baseline: mathematical;
	}
	:global(strong.average:not(#methods strong.average)) {
		color: var(--color-average);
		border-bottom: 3px solid var(--color-average);
	}
	:global(strong.power:not(#methods strong.power)) {
		color: var(--color-power);
		border-bottom: 3px solid var(--color-power);
	}
	:global(strong.speed:not(#methods strong.speed)) {
		color: var(--color-speed);
		border-bottom: 3px solid var(--color-speed);
	}
	:global(strong.walks:not(#methods strong.walks)) {
		color: var(--color-walks);
		border-bottom: 3px solid var(--color-walks);
	}
</style>
