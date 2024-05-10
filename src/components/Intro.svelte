<script>
	import copy from "$data/copy.json";
</script>

{#each copy.intro1 as { value }}
	<p>{@html value}</p>
{/each}

<div class="viz">CHOOSE YOUR PLAYER</div>

{#each copy.intro2 as { value }}
	<p>{@html value}</p>
{/each}

<div class="viz">RESHUFFLE CHART</div>

{#each copy.intro3 as { value }}
	<p>{@html value}</p>
{/each}

<style>
	.viz {
		background-color: var(--color-gray-100);
		padding: 1rem;
		margin: 2rem 0;
		height: 200px;
	}
</style>
