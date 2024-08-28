<script>
	import { LayerCake, Svg } from "layercake";
	import { scaleBand } from "d3-scale";
	import Bar from "$components/layercake/Bar.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import slopeData from "$data/slope.csv";
	import Toggle from "$components/helpers/Toggle.svelte";

	const attributes = ["speed", "power", "average", "walks"];
	const data = slopeData
		.filter(
			(d) =>
				d.slot === "1" ||
				d.slot === "2" ||
				d.slot === "3" ||
				d.slot === "4" ||
				d.slot === "5-7" ||
				d.slot === "8-9"
		)
		.map((d) => {
			const obj = { ...d };
			attributes.forEach((attr) => {
				obj[attr] = +d[attr];
			});
			return obj;
		});

	const xKey = "slot";
	const eras = [
		{ value: "1970-2009", text: "1970-2009" },
		{ value: "2010-present", text: "2010-present" }
	];
	let toggleValues = attributes.map((d) => eras[0].value);
</script>

{#each attributes as attr, i}
	{@const attributeData = data
		.filter((d) => d.era === toggleValues[i])
		.map((d) => ({ slot: d.slot, [attr]: d[attr] }))}

	<h2>{attr}</h2>
	<div class="attr">
		<div class="chart-container">
			<LayerCake
				padding={{ bottom: 20, left: 35 }}
				x={xKey}
				y={attr}
				xScale={scaleBand().paddingInner(0.05)}
				yDomain={[0, 5]}
				data={attributeData}
			>
				<Svg>
					<AxisX tickMarks />
					<AxisY tickMarks />
					<Bar vertical={true} fill="var(--color-green)" />
				</Svg>
			</LayerCake>
		</div>
		<Toggle
			label="era"
			style="inner"
			bind:value={toggleValues[i]}
			options={eras}
		/>
	</div>
{/each}

<style>
	.attr {
		display: flex;
	}
	.chart-container {
		width: 50%;
		height: 250px;
	}
</style>
