<script>
	import _ from "lodash";

	export let step;

	const old = [
		"Kenny Lofton",
		"Omar Vizquel",
		"Roberto Alomar",
		"Manny Ramirez",
		"Jim Thome",
		"Richie Sexson",
		"Travis Fryman",
		"Wil Cordero",
		"Ricky Ledee"
	];
	const modern = [
		"Omar Vizquel",
		"Roberto Alomar",
		"Travis Fryman",
		"Jim Thome",
		"Kenny Lofton",
		"Manny Ramirez",
		"Richie Sexson",
		"Wil Cordero",
		"Ricky Ledee"
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
</script>

<div class="lineups">
	<div class="old" class:visible={true}>
		<table>
			<tr>
				<th colspan="3">2000 Cleveland Indians</th>
			</tr>
			{#each old as name, i}
				<tr class:faded={step === 1 && i !== 1}>
					<td>{i + 1}</td>
					<td style:background={colors[i]}>{name}</td>
					<table class="small">
						{#each [1, 2, 3, 4] as d}
							<tr>
								<td>Stat</td>
								<td>Stat</td>
							</tr>
						{/each}
					</table>
				</tr>
			{/each}
		</table>
	</div>
	<div class="new" class:visible={step >= 4}>
		<table>
			<tr>
				<th colspan="3">"2024" Cleveland Indians</th>
			</tr>
			{#each modern as name, i}
				<tr>
					<td>{i + 1}</td>
					<td style:background={colors[old.findIndex((d) => d === name)]}
						>{name}</td
					>
					<table class="small">
						{#each [1, 2, 3, 4] as d}
							<tr>
								<td>Stat</td>
								<td>Stat</td>
							</tr>
						{/each}
					</table>
				</tr>
			{/each}
		</table>
	</div>
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
	td {
		padding: 0;
		border: 1px solid black;
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
