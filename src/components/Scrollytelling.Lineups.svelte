<script>
	import toronto from "$data/toronto.csv";
	import _ from "lodash";

	export let step;

	const stepShowModern = 4;
	const highlights = [
		{
			step: 1,
			era: "old",
			name: "Joe Carter"
		},
		{
			step: 6,
			era: "new",
			name: "Joe Carter"
		}
	];
	const colors = [
		"#f7d7c4",
		"#f7e2c4",
		"#f7ecc4",
		"#f7f7c4",
		"#e2f7c4",
		"#d7f7c4",
		"#c4f7c4",
		"#c4f7d7",
		"#c4f7e2"
	];
	const attr = ["oldSlot", "newSlot", "average", "power", "walks", "speed"];

	toronto.forEach((d) => {
		attr.forEach((attr) => {
			d[attr] = +d[attr];
		});
	});
</script>

<div class="lineups">
	{#each ["old", "new"] as lineup}
		{@const data = _.orderBy(toronto, lineup === "old" ? "oldSlot" : "newSlot")}
		<div
			class={lineup}
			class:visible={lineup === "old" || step >= stepShowModern}
		>
			<table>
				<tr>
					<th colspan="3"
						>{lineup === "old" ? 1993 : `"2024"`} Toronto Blue Jays</th
					>
				</tr>
				{#each data as { name, average, power, walks, speed }, i}
					{@const faded = highlights.find(
						(d) => d.step === step && d.era === lineup && d.name !== name
					)}
					{@const background =
						colors[
							_.orderBy(toronto, "oldSlot").findIndex((d) => d.name === name)
						]}
					<tr class:faded>
						<td>{i + 1}</td>
						<td style:background>
							{name}
						</td>
						<td>
							<table class="small">
								<tr>
									<td>Average</td>
									<td>Power</td>
									<td>Walks</td>
									<td>Speed</td>
								</tr>
								<tr>
									<td>{average}</td>
									<td>{power}</td>
									<td>{walks}</td>
									<td>{speed}</td>
								</tr>
							</table>
						</td>
					</tr>
				{/each}
			</table>
		</div>
	{/each}
</div>

<style>
	.lineups {
		position: sticky;
		top: 50%;
		transform: translate(0, -50%);
		display: flex;
		z-index: -1;
	}
	.old,
	.new {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 0.5rem;
		opacity: 0;
		transition: opacity 0.5s;
	}
	.visible {
		opacity: 1;
	}
	h3 {
		text-align: center;
	}
	table {
		width: 100%;
		table-layout: auto;
	}
	td {
		padding: 0 4px;
		border: 1px solid black;
		white-space: nowrap;
		vertical-align: middle;
	}
	tr {
		border: 1px solid black;
		transition: opacity 0.5s;
	}
	tr.faded {
		opacity: 0.2;
	}
	th {
		text-align: center;
	}
	.small {
		font-size: 0.75rem;
	}
</style>
