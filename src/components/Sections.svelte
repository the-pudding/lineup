<script>
	import Progress from "$components/Progress.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Section from "$components/Section.svelte";
	import inView from "$actions/inView.js";
	import viewport from "$stores/viewport.js";
	import { currentSection, loadedSections } from "$stores/misc.js";
	import _ from "lodash";
	import { onMount } from "svelte";

	export let sections;

	let progressVisible = false;

	const load = (section) => {
		$loadedSections[section] = true;
	};

	const sectionChange = () => {
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

{#if $viewport.width > 775}
	<Progress visible={progressVisible} {sections} />
{/if}

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
		opacity: 1;
		transition: opacity 0.5s;
	}
	.fade {
		opacity: 0.1;
	}
</style>
