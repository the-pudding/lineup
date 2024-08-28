<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Section from "$components/Section.svelte";
	import inView from "$actions/inView.js";
	import viewport from "$stores/viewport.js";
	import {
		selectedCard,
		currentSection,
		loadedSections
	} from "$stores/misc.js";
	import _ from "lodash";
	import { onMount } from "svelte";

	export let sections;

	const activeSections = {
		0: [0],
		1: [1],
		2: [2],
		3: [3],
		4: [4, 5, 6],
		5: [7, 8]
	};

	let progressVisible = false;

	const load = (section) => {
		console.log("load", section);
		$loadedSections[section] = true;
	};

	const sectionChange = () => {
		$selectedCard = undefined;

		if (!$loadedSections[$currentSection]) {
			load($currentSection);
		}

		if (
			$currentSection + 1 < 6 &&
			!$loadedSections[$currentSection + 1] &&
			$currentSection !== undefined
		) {
			load($currentSection + 1);
		}
	};

	$: $currentSection, sectionChange();

	onMount(() => {
		load(0);
	});
</script>

<div class="progress" class:visible={progressVisible}>
	{#each _.range(9) as i}
		{@const active =
			$currentSection !== undefined
				? activeSections[$currentSection].includes(i)
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
	<Scrolly bind:value={$currentSection}>
		{#each sections as props, i}
			<Section {...props} {i} />
		{/each}
	</Scrolly>
</div>

<style>
	.sections {
		position: relative;
		max-width: 630px;
		margin: 0 auto;
	}
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
		background: var(--color-gray-300);
		height: 20px;
		width: 50px;
		margin: 2px 0;
		transition: background-color calc(var(--1s) * 0.2);
	}
	.active {
		background: var(--color-gray-800);
	}
</style>
