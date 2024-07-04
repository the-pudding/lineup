<script>
	import { selectedCard } from "$stores/misc.js";
	import playersData from "$data/players.csv";
	import stats from "$data/stats.csv";

	const columns = ["season", "walks", "average", "power", "speed"];

	$: info = playersData.find((d) => d.name === $selectedCard);
	$: seasons = stats.filter((d) => d.name === $selectedCard);
</script>

{#if info}
	<div class="card">
		<div class="top">
			<div class="number">{info.number || "#40"}</div>
			<div class="bg">
				<div class="name">{info.name}</div>
				<div class="position">{info.position || "SS"}</div>
			</div>
		</div>

		<div class="border">
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
								<td>{season[column] || 0}</td>
							{/each}
						</tr>
					{/each}

					<tr>
						{#each columns as column, i}
							{@const average =
								seasons.reduce((acc, d) => acc + +d[column], 0) /
								seasons.length}
							<td class="average">{i === 0 ? "" : average.toFixed(1)}</td>
						{/each}
					</tr>
				</table>
				<div class="description">{info.name} was a great guy.</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.card {
		background: white;
		padding: 1rem;
		font-family: var(--sans);
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		background: tan;
		border: 6px solid black;
		border-bottom: none;
		padding: 0 1rem;
	}
	.name {
		font-weight: bold;
		font-size: 2rem;
		text-transform: uppercase;
	}
	.border {
		background: red;
		padding: 4px;
		border: 2px solid black;
	}
	.main {
		background: white;
		border: 2px solid black;
		padding: 10px;
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
		border-bottom: 3px solid black;
	}
	.description {
		margin-top: 3rem;
		text-align: center;
	}
</style>
