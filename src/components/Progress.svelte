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
		const sectionEl = document.getElementById(`batting-${sectionsPlus[i].id}`);
		sectionEl.scrollIntoView({ behavior: "smooth" });

		setTimeout(() => {
			$currentSection = i;
		}, 1000);
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 49) {
			onClick(0);
		} else if (e.keyCode === 50) {
			onClick(1);
		} else if (e.keyCode === 51) {
			onClick(2);
		} else if (e.keyCode === 52) {
			onClick(3);
		} else if (e.keyCode === 53 || e.keyCode === 54 || e.keyCode === 55) {
			onClick(4);
		} else if (e.keyCode === 56 || e.keyCode === 57) {
			onClick(5);
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="progress" class:visible>
	{#each sectionsPlus as section, i}
		<button
			tabindex="-1"
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
		font-size: 0.8rem;
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.5);
	}
	.progress.visible {
		opacity: 1;
	}
	.block {
		display: flex;
		align-items: center;
		justify-content: center;
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

	@media (max-width: 900px) {
		.progress {
			top: 1rem;
			left: 1rem;
		}
	}
</style>
