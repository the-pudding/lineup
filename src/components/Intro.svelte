<script>
	import Lineups from "$components/Intro.Lineups.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";

	let value;

	const steps = [
		"This is the batting lineup of the 2000 Cleveland Indians.",
		"Tk something highlighting a specific player and that points out why their attributes made them suited for that spot in the old school style.",
		"The rules have changed since then, with the influence of analytics changing how the game is played.",
		"We looked at all the stats tk and how they've changed and calculated what this team's lineup order would have been if it was today.",
		"Here's the lineup of the hypothetical 2024 Cleveland Indians.",
		"Tk pointing out some of the big changes"
	];
</script>

<section id="intro">
	<Lineups step={value} />

	<div class="spacer" />
	<Scrolly bind:value>
		{#each steps as text, i}
			<div class="step">
				<p>{text}</p>
			</div>
		{/each}
	</Scrolly>

	<div class="spacer" />
</section>

<style>
	section {
		max-width: 900px;
		margin: auto;
	}
	.spacer {
		height: 75vh;
	}
	.step {
		margin: 80vh auto;
		border: 2px solid black;
		background: var(--color-bg);
		max-width: 500px;
		text-align: center;
		z-index: 1000;
	}
	.step p {
		padding: 1rem;
	}
</style>
