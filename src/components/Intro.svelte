<script>
	import ChoosePlayer from "$components/ChoosePlayer.svelte";
	import copy from "$data/copy.json";
</script>

{#each copy.intro1 as { value }}
	<p>{@html value}</p>
{/each}

<div class="viz">
	<ChoosePlayer />
</div>

{#each copy.intro2 as { value }}
	<p>{@html value}</p>
{/each}

<div class="viz">RESHUFFLE CHART</div>

{#each copy.intro3 as { value }}
	<p>{@html value}</p>
{/each}

<style>
	.viz {
		margin: 3rem 0;
	}
</style>
