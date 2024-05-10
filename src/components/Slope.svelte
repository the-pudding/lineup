<script>
	import Balls from "$components/Slope.Balls.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import { scaleOrdinal } from "d3-scale";
	import { LayerCake, Svg } from "layercake";
	import _ from "lodash";

	export let data;

	const xKey = "decade";
	const attributes = ["speed", "average", "power", "walks"];
	const colors = ["#FFC857", "#E9724C", "#C5283D", "#255F85"];

	const showInBetween = false;

	const dataCleaned = data.map((d) => {
		const obj = { decade: +d.decade };
		attributes.forEach((attr) => {
			obj[attr] = +d[attr];
		});
		return obj;
	});
	const dataAveraged = dataCleaned.reduce((acc, d) => {
		const decade = d.decade;
		if (
			(decade === 1970 || decade === 1980 || decade === 1990) &&
			!acc.some((j) => j.decade === 1971)
		) {
			const averaged = attributes.reduce(
				(obj, attr) => {
					const filteredDecades = dataCleaned.filter(
						(d) => d.decade === 1970 || d.decade === 1980 || d.decade === 1990
					);
					obj[attr] = _.meanBy(filteredDecades, attr);
					return obj;
				},
				{ decade: 1971 }
			);
			return [...acc, averaged];
		} else if (decade === 2020) {
			return [...acc, d];
		}
		return acc;
	}, []);
</script>

<div class="chart-container">
	<LayerCake
		x={xKey}
		data={showInBetween ? dataCleaned : dataAveraged}
		yDomain={[0, 5]}
		zScale={scaleOrdinal()}
		zDomain={attributes}
		zRange={colors}
		padding={{ top: 0, right: 75, bottom: 0, left: 75 }}
	>
		<Svg>
			<AxisX ticks={[1970, 2020]} />
			<AxisY textAnchor={"end"} />
			<AxisY gridlines={false} dxTick={"100%"} textAnchor={"start"} />
			<Balls />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 200px;
		margin: 2rem 0;
	}
</style>
