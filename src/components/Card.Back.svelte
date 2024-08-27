<script>
	import stats from "$data/back-stats.csv";
	import _ from "lodash";

	export let info;
	export let flipped;

	const { name, height, weight, throws, bats, hometown, birthday, blurb } =
		info;

	const columns = ["season", "walks", "average", "power", "speed"];

	$: seasons = stats.filter((d) => d.name === name);

	const style = { bg: "#B5B69E", fg: "#44455D", main: "#C9BB35" };
</script>

<div
	class="back"
	class:visible={flipped}
	style={`--card-bg: ${style.bg}; --card-fg: ${style.fg}; --card-main: ${style.main}`}
>
	<div class="name">
		{name}
	</div>

	<div class="main">
		<div class="info">
			Height: {height} Weight: {weight} Throws: {throws} Bats: {bats} Hometown: {hometown}
			Born: {birthday}
		</div>

		<div class="fun">
			<div
				style="background: lightgrey; height: 100px; width: 100px; flex-shrink: 0; margin-right: .5rem"
			></div>
			<div>{@html blurb}</div>
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
							<td>{season[column]}</td>
						{/each}
					</tr>
				{/each}

				<tr>
					{#each columns as column, i}
						{@const average =
							seasons.reduce((acc, d) => acc + +d[column], 0) / seasons.length}
						<td class="average">{i === 0 ? "" : average.toFixed(1)}</td>
					{/each}
				</tr>
			</table>
		</div>

		<div class="download">Download data</div>
	</div>
</div>

<style>
	.back {
		border-radius: 0.25rem;
		background: var(--card-bg);
		padding: 0.75rem;
		font-family: var(--sans);
		display: flex;
		flex-direction: column;
		aspect-ratio: 10 / 14;
		height: 100%;
		transition: opacity 0.2s;
		opacity: 0;
	}
	.back.visible {
		transition: opacity 0.2s 0.5s;
		opacity: 1;
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
		font-size: 1.8rem;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		color: var(--card-bg);
		background: var(--card-fg);
		width: 100%;
		height: 40px;
	}
	.main {
		height: calc(100% - 40px);
		background: var(--card-main);
		color: var(--card-fg);
		border: 2px solid var(--card-fg);
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.info {
		text-align: center;
		font-size: 0.75rem;
	}
	.fun {
		display: flex;
		align-items: center;
		margin: 1rem 0;
		text-align: center;
	}
	.table {
		overflow: scroll;
		margin: 1rem 0;
	}
	.download {
		font-size: 0.75rem;
	}

	table {
		font-family: var(--mono);
	}
	th {
		font-weight: bold;
		text-transform: uppercase;
		padding: 0;
	}
	td {
		padding: 0;
	}
	tr:first-of-type,
	tr:nth-last-of-type(2) {
		border-bottom: 1px solid var(--card-fg);
	}
</style>
