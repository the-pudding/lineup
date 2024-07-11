<script>
	import playersData from "$data/players.csv";
	import stats from "$data/stats.csv";
	import _ from "lodash";

	export let name;

	const columns = ["season", "walks", "average", "power", "speed"];

	$: info = playersData.find((d) => d.name === name);
	$: seasons = stats.filter((d) => d.name === name);

	const styles = [
		{ bg: "#A6A78B", fg: "#38394D", main: "#BEAD2A" },
		{ bg: "#FEFDEB", fg: "#A5670E", main: "white" }
	];
	const style = styles[0];
</script>

{#if info}
	<div
		class="card"
		style={`--card-bg: ${style.bg}; --card-fg: ${style.fg}; --card-main: ${style.main}`}
	>
		<div class="top">
			<div class="number">{info.number || "#40"}</div>
			<div class="bg">
				<div class="name">{info.name}</div>
				<div class="position">{info.position || "SS"}</div>
			</div>
		</div>

		<div class="main">
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
			<div class="description">{info.name} was a great guy.</div>
		</div>
	</div>
{/if}

<style>
	.card {
		background: var(--card-bg);
		padding: 1rem;
		font-family: var(--sans);
		display: flex;
		flex-direction: column;
		aspect-ratio: 10 / 14;
		max-height: 665px;
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: var(--card-fg);
	}
	.number {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.position {
		font-size: 1.5rem;
		margin-left: 1rem;
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
		font-weight: bold;
		font-size: 2rem;
		text-transform: uppercase;
		font-style: italic;
	}
	.main {
		flex: 1;
		background: var(--card-main);
		color: var(--card-fg);
		border: 6px solid var(--card-fg);
		padding: 10px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	table {
		font-family: var(--mono);
	}
	th {
		font-weight: bold;
		text-transform: uppercase;
	}
	td {
		padding: 0;
	}
	tr:first-of-type,
	tr:nth-last-of-type(2) {
		border-bottom: 3px solid var(--card-fg);
	}
	.description {
		margin-top: 1rem;
		text-align: center;
	}
</style>
