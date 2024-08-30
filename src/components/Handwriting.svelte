<script>
	export let text;
	export let wonkiness = 10;
	export let small = false;
</script>

<div class="wrapper">
	{#each text.split(" ") as word}
		<div class="word" class:small>
			{#each word as letter}
				{@const dy = letter === "’" ? 0 : Math.random() * wonkiness}
				{@const angle = Math.random() * (wonkiness / 2)}
				<div
					class="letter"
					style:transform={`translate(0, ${dy}px) rotate(${angle}deg)`}
				>
					{letter}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		font-family: var(--handwriting);
		width: fit-content;
	}
	.word {
		display: flex;
		margin: 0 0.4rem;
	}
	.word.small {
		margin: 0 0.2rem;
	}
	.word:first-of-type {
		margin-left: 0;
	}
	.word:last-of-type {
		margin-right: 0;
	}
</style>
