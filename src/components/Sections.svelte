<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Section from "$components/Section.svelte";
	import copy from "$data/copy.json";
	import inView from "$actions/inView.js";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";

	const activeSections = {
		0: [0],
		1: [1],
		2: [2],
		3: [3],
		4: [4, 5, 6],
		5: [7, 8]
	};
	let progressVisible = false;
	let currentSection = 0;
</script>

<div class="progress" class:visible={progressVisible}>
	{#each _.range(9) as i}
		{@const active =
			currentSection !== undefined
				? activeSections[currentSection].includes(i)
				: false}
		<div class="block" class:active />
	{/each}
</div>

<div
	class="sections"
	use:inView={{ bottom: $viewport.height / 2 }}
	on:enter={() => (progressVisible = true)}
	on:exit={() => (progressVisible = false)}
>
	<Scrolly bind:value={currentSection}>
		{#each copy.sections as props, i}
			<Section {...props} {i} bind:currentSection />
		{/each}
	</Scrolly>
</div>

<style>
	.sections {
		position: relative;
	}
	.progress {
		position: fixed;
		top: 3rem;
		left: 3rem;
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.5);
	}
	.visible {
		opacity: 1;
	}
	.block {
		background: var(--color-gray-100);
		height: 20px;
		width: 50px;
		margin: 2px 0;
		transition: background-color calc(var(--1s) * 0.2);
	}
	.active {
		background: var(--color-green);
	}
</style>
