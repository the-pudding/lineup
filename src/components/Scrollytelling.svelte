<script>
	import Lineups from "$components/Scrollytelling.Lineups.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";

	export let steps;

	let value;
</script>

<div class="scrolly">
	<div class="spacer" />

	<Lineups step={value} />

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
		height: 75vh;
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

	:global(span.player) {
		background: var(--color-gray-100);
		border: 2px solid var(--color-gray-300);
		border-radius: 4px;
		padding: 0px 4px;
		white-space: nowrap;
	}
	:global(span.player):hover {
		cursor: pointer;
		background: var(--color-gray-200);
	}
</style>
