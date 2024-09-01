<script>
	import { currentSection } from "$stores/misc.js";
	import _ from "lodash";

	export let visible;

	const activeSections = {
		0: [0],
		1: [1],
		2: [2],
		3: [3],
		4: [4, 5, 6],
		5: [7, 8]
	};
</script>

<div class="progress" class:visible>
	{#each _.range(9) as i}
		{@const active =
			$currentSection !== undefined
				? activeSections[$currentSection].includes(i)
				: false}
		<div class="block" class:active />
	{/each}
</div>

<style>
	.progress {
		position: fixed;
		top: 3rem;
		left: 3rem;
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.5);
	}
	.progress.visible {
		opacity: 1;
	}
	.block {
		background: var(--color-green-dark);
		opacity: 0.4;
		height: 20px;
		width: 50px;
		margin: 2px 0;
		transition: none;
	}
	.active {
		opacity: 1;
		background: var(--color-green-bright);
		border: 2px solid black;
	}
</style>
