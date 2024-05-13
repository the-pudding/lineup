<script>
	import { LayerCake, Svg } from "layercake";
	import Column from "$components/layercake/Column.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { scaleBand } from "d3-scale";
	import raw from "$data/extremes.csv";
	import _ from "lodash";

	export let attr;

	const cleaned = raw.map((d) => ({
		speed: +d.speed,
		average: +d.average,
		power: +d.power,
		walks: +d.walks,
		...d
	}));
	$: data = cleaned.map((d) => ({
		batting_position: d.batting_position,
		value: d[attr]
	}));
	$: likelyPosition = _.maxBy(data, "value")?.batting_position;

	const xKey = "batting_position";
	const yKey = "value";
</script>

<div class="results">
	<h4>
		Based on your choice, you'd likely be up <strong>{likelyPosition}</strong>!
	</h4>
	<div class="chart-container">
		<LayerCake
			padding={{ top: 20, right: 20, bottom: 20, left: 40 }}
			x={xKey}
			y={yKey}
			xScale={scaleBand().paddingInner(0.02).round(true)}
			yDomain={[0, 0.4]}
			{data}
		>
			<Svg>
				<AxisX gridlines={false} />
				<AxisY gridlines={true} ticks={4} formatTick={(d) => `${d * 100}%`} />
				<Column
					fill={"var(--color-gray-300)"}
					fillHighlight={"var(--color-green)"}
				/>
			</Svg>
		</LayerCake>
	</div>
</div>

<style>
	.results {
		margin-top: 2rem;
	}
	.chart-container {
		height: 200px;
		width: 100%;
	}
</style>
