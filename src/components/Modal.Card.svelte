<script>
	import { selectedCard } from "$stores/misc.js";
	import cardData from "$data/cards.csv";

	const columns = ["yr", "walks", "avg", "power", "speed"];

	$: data = cardData.find((d) => d.id === $selectedCard);
</script>

{#if data}
	<div class="card">
		<div class="top">
			<div class="number">{data.number || "#40"}</div>
			<div class="bg">
				<div class="name">{data.name}</div>
				<div class="position">{data.position || "SS"}</div>
			</div>
		</div>

		<div class="border">
			<div class="main">
				<table>
					<tr>
						{#each columns as column}
							<th>{column}</th>
						{/each}
					</tr>
					<tr>
						<td>100</td>
						<td>100</td>
						<td>100</td>
						<td>100</td>
						<td>100</td>
					</tr>
					<tr>
						<td>100</td>
						<td>100</td>
						<td>100</td>
						<td>100</td>
						<td>100</td>
					</tr>
					<tr>
						<td></td>
						<td>100</td>
						<td>100</td>
						<td>100</td>
						<td>100</td>
					</tr>
				</table>
				<div class="description">{data.name} was a great guy.</div>
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
	tr:first-of-type,
	tr:nth-last-of-type(2) {
		border-bottom: 3px solid black;
	}
	.description {
		margin-top: 300px;
		text-align: center;
	}
</style>
