<script>
	import _ from "lodash";
	import unweighted from "$data/unweighted.csv";
	import Slope from "$components/Slope.svelte";
</script>

<article>
	{#each _.range(1, 10) as i}
		{@const data = unweighted.filter((d) => +d.lineup_slot === i)}
		<div>
			<strong>Batting position {i}</strong>
			<Slope {data} />
		</div>
	{/each}
</article>

<style>
	article {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		max-width: calc(900px + 4.5rem);
		margin: auto;
	}
</style>
