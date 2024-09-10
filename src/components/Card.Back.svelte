<script>
	import stats from "$data/back-stats.csv";
	import _ from "lodash";
	import csvDownload from "$utils/csvDownload.js";
	import variables from "$data/variables.json";
	import { scaleLinear } from "d3-scale";
	import { interpolateRgb } from "d3-interpolate";
	import downloadIcon from "$svg/download.svg";
	import changeOpacity from "$utils/changeOpacity.js";

	export let id;
	export let i;
	export let info;

	const { name, height, weight, throws, bats, hometown, birthday, blurb } =
		info;
	const columns = ["season", "walks", "average", "power", "speed"];

	const styles = [
		{ edge: "#DFDCDA", fg: "#44455D", name: "white", bg: "white" },
		{ edge: "#79aebd", fg: "#04041a", name: "#eee9e9", bg: "#eee9e9" },
		{ edge: "#DBD3B8", fg: "#222", name: "#eee9e9", bg: "#eee9e9" },
		{ edge: "#0E161D", fg: "#0E161D", name: "#d0edfa", bg: "white" },
		{ edge: "#fd7069", fg: "black", name: "white", bg: "white" },
		{ edge: "white", fg: "#091E37", name: "white", bg: "#f0f6fa" }
	];

	const download = (e) => {
		e.stopPropagation();
		const csvContent = csvDownload(forDownload);
		const link = document.createElement("a");
		link.href = csvContent;
		link.download = `${id}.csv`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const startColor = changeOpacity(variables.color["green-dark"], 0.5);
	const endColor = variables.color["green-bright"];
	const colorScale = scaleLinear()
		.domain([0, 5])
		.interpolate(interpolateRgb)
		.range([startColor, endColor]);

	$: style = styles[i % styles.length];
	$: seasons = stats.filter((d) => _.deburr(d.name) === _.deburr(name));
	$: forDownload = seasons.map((d) => ({
		season: d.season,
		walks: d.walks,
		average: d.average,
		power: d.power,
		speed: d.speed
	}));
	$: if (seasons.length === 0 || !seasons) console.log({ id, seasons });
</script>

<div
	class="back"
	style={`--card-edge: ${style.edge}; --card-name: ${style.name}; --card-fg: ${style.fg}; --card-bg: ${style.bg}`}
>
	<div class="name">
		{name}
	</div>

	<div class="main">
		<div class="info">
			<span>Height: {height}</span>
			<span>Weight: {weight} lbs</span>
			<span>Bats: {bats}</span>
			<span>Throws: {throws}</span>
			<span>Hometown: {hometown}</span>
			<span>Birthday: {birthday}</span>
		</div>

		<div class="fun">
			<figure class="img-wrapper">
				<img src={`assets/back-images/${id}.png`} />
				<figcaption>This image is AI-generated.</figcaption>
			</figure>
			<div class="fact-text">{@html blurb}</div>
		</div>

		<div class="table">
			<table>
				<tr>
					{#each columns as column}
						{@const label =
							column === "season"
								? "yr"
								: column === "average"
									? "avg"
									: column}
						<th>{label}</th>
					{/each}
				</tr>

				{#each seasons as season}
					<tr>
						{#each columns as column}
							<td
								style:background={column === "season"
									? ""
									: colorScale(season[column])}>{season[column]}</td
							>
						{/each}
					</tr>
				{/each}

				<tr>
					{#each columns as column, i}
						{@const average =
							seasons.reduce((acc, d) => acc + +d[column], 0) / seasons.length}
						<td
							class="average"
							style:background={i === 0 ? "" : colorScale(average.toFixed(1))}
							>{i === 0 ? "AVG" : average.toFixed(1)}</td
						>
					{/each}
				</tr>
			</table>
		</div>

		<button class="download" on:click={download}>
			Download data
			<span>{@html downloadIcon}</span>
		</button>
	</div>
</div>

<style>
	.back {
		border-radius: 0.25rem;
		background: var(--card-edge);
		padding: 10px;
		font-family: var(--sans);
		display: flex;
		flex-direction: column;
		aspect-ratio: 10 / 14;
		height: 100%;
	}
	.bg {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: var(--card-fg);
		color: var(--card-bg);
		border-bottom: none;
		padding: 0 1rem;
		margin-bottom: 2px;
	}
	.name {
		font-size: 1.4rem;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		color: var(--card-name);
		background: var(--card-fg);
		width: 100%;
		height: 32px;
		padding-top: 2px;
	}
	.main {
		background: var(--card-bg);
		color: var(--card-fg);
		border: 2px solid var(--card-fg);
		padding: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: scroll;
	}
	.info {
		font-size: 0.68rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.info span {
		margin: 0 0.5rem;
	}
	.fun {
		display: flex;
		align-items: center;
		margin: 1rem 0;
		gap: 0.5rem;
	}
	.fact-text {
		font-size: 0.8rem;
	}
	.table {
		margin: 1rem 0 0.5rem 0;
		font-size: 0.9rem;
	}
	.download {
		display: flex;
		align-items: center;
		font-size: 0.7rem;
		align-self: start;
		background: none;
		color: var(--card-fg);
	}
	.download span {
		height: 18px;
		display: flex;
		margin-left: 4px;
	}
	.download:hover {
		color: var(--color-green-medium);
	}
	figure {
		height: 132px;
		width: 132px;
		flex-shrink: 0;
	}
	figcaption {
		margin-top: 2px;
		font-size: 10px;
		color: var(--color-gray-700);
		text-align: center;
	}
	img {
		filter: grayscale(100%);
		border: 2px solid var(--card-fg);
	}
	table {
		font-family: var(--mono);
	}
	th {
		font-weight: bold;
		text-align: center;
		text-transform: uppercase;
		padding: 0;
	}
	td {
		padding: 0;
		text-align: center;
	}
	tr:first-of-type,
	tr:nth-last-of-type(2) {
		border-bottom: 1px solid var(--card-fg);
	}
</style>
