<script>
	import Annotations from "$components/Scrollytelling.Annotations.svelte";
	import Lineup from "$components/Scrollytelling.Lineup.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import toronto from "$data/toronto.csv";
	import _ from "lodash";

	export let steps;

	let value;

	const highlights = [
		{
			era: "old",
			name: "Joe Carter",
			step: 1
		},
		{
			era: "old",
			name: "Rickey Henderson",
			step: 2
		},
		{
			era: "old",
			name: "Devon White",
			step: 2
		},
		{
			era: "old",
			name: "Roberto Alomar",
			step: 2
		},
		{
			era: "old",
			name: "John Olerud",
			step: 2
		},
		{
			era: "old",
			name: "Paul Molitor",
			step: 2
		},
		{ era: "old", name: "Tony Fernandez", step: 6 },
		{ era: "new", name: "Tony Fernandez", step: 6 },
		{ era: "old", name: "Rickey Henderson", step: 6 },
		{ era: "new", name: "Rickey Henderson", step: 6 },
		{ era: "old", name: "Devon White", step: 6 },
		{ era: "new", name: "Devon White", step: 6 },
		{ era: "old", name: "John Olerud", step: 7 },
		{ era: "new", name: "John Olerud", step: 7 },
		{ era: "old", name: "Paul Molitor", step: 7 },
		{ era: "new", name: "Paul Molitor", step: 7 },
		{ era: "old", name: "Roberto Alomar", step: 7 },
		{ era: "new", name: "Roberto Alomar", step: 7 },
		{ era: "old", name: "Joe Carter", step: 8 },
		{ era: "new", name: "Joe Carter", step: 8 }
	];
	toronto.forEach((d) => {
		["average", "power", "walks", "speed", "oldSlot", "newSlot"].forEach(
			(a) => {
				d[a] = +d[a];
			}
		);
	});
	const allNames = _.uniq(
		toronto.map((d) => d.name.split(" ")[1].toLowerCase())
	);
</script>

<div class="scrolly">
	<div class="spacer" />

	<div class="sticky">
		{#each ["old", "new"] as era}
			{@const year = era === "old" ? "1993" : `"2024"`}
			{@const visible = era === "old" || value >= 5}
			{@const data =
				era === "new" && value < 5
					? _.orderBy(toronto, "oldSlot")
					: _.orderBy(toronto, `${era}Slot`)}
			<Lineup {era} {year} {visible} {data} {highlights} step={value} />
		{/each}

		<Annotations step={value} {highlights} {allNames} />
	</div>

	<Scrolly bind:value>
		{#each steps as step, i}
			<div class="step">
				<p>{@html step.value}</p>
			</div>
		{/each}
	</Scrolly>

	<div class="spacer" />
</div>

<style>
	.scrolly {
		max-width: 900px;
		margin: auto;
	}
	.spacer {
		height: 35vh;
	}
	.step {
		margin: 80vh auto;
		border: 3px solid black;
		background: var(--color-bg);
		max-width: 630px;
		text-align: center;
		z-index: 1000;
		line-height: 1.7;
	}
	.step p {
		padding: 1rem;
	}
	.sticky {
		position: sticky;
		top: 50%;
		display: flex;
		gap: 0.5rem;
		transform: translate(0, -50%);
		z-index: -1;
	}
	:global(span.player) {
		font-weight: bold;
		white-space: nowrap;
	}
</style>
