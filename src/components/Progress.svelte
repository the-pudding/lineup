<script>
	import { currentSection } from "$stores/misc.js";
	import _ from "lodash";

	export let visible;
	export let sections;

	const sectionsPlus = sections.map((d, i) => ({
		...d,
		n: d.id === "5-7" ? 3 : d.id === "8-9" ? 2 : 1
	}));

	const onClick = (i) => {
		const sectionEl = document.getElementById(
			_.kebabCase(sectionsPlus[i].title)
		);
		sectionEl.scrollIntoView({ behavior: "smooth" });

		setTimeout(() => {
			$currentSection = i;
		}, 1000);
	};
</script>

<div class="progress" class:visible>
	{#each sectionsPlus as section, i}
		<button
			class="blocks"
			class:active={$currentSection === i}
			on:click={() => onClick(i)}
		>
			{#each _.range(section.n) as j}
				{@const blockI = section.id === "8-9" ? i + j + 3 : i + j + 1}
				<div class="block">{blockI}</div>
			{/each}
		</button>
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
		display: block;
		background: #c5c9b7;
		font-family: var(--mono);
		margin: 2px 0;
		height: 20px;
		width: 50px;
		transition: none;
	}
	.blocks {
		margin: -2px 0;
	}
	.blocks:hover .block {
		background: #888f6f;
	}
	.blocks:focus {
		outline-offset: 0;
	}
	.active {
		opacity: 1;
		background: var(--color-green-bright);
		outline: 2px solid black;
		padding: 0 2px;
		transform: translate(-2px, 0);
	}
	.active .block {
		opacity: 0.4;
	}
	button {
		display: block;
		padding: 0;
		margin: 0;
		background: none;
		border-radius: 0;
	}
</style>
