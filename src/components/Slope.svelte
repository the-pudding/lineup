<script>
	import Balls from "$components/Slope.Balls.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { scaleOrdinal, scalePoint } from "d3-scale";
	import { LayerCake, Svg } from "layercake";
	import _ from "lodash";

	export let data;
	export let title;

	const xKey = "era";
	const xDomain = ["1970-2009", "2010-present"];
	const attributes = ["speed", "average", "power", "walks"];
	const colors = ["#FFC857", "#E9724C", "#C5283D", "#255F85"];

	const dataCleaned = data.map((d) => {
		const obj = { [xKey]: d[xKey] };
		attributes.forEach((attr) => {
			obj[attr] = +d[attr];
		});
		return obj;
	});
</script>

<div class="chart-container">
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
			<Balls />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		font-family: var(--mono);
		width: 100%;
		max-width: 400px;
		height: 300px;
		margin: 2rem 0;
	}
	.chart-title {
		font-weight: bold;
	}
</style>
