<script>
	import { onMount } from "svelte";
	import _ from "lodash";

	export let step;
	export let highlights;
	export let allNames;

	const arrowLength = 25;
	const strokeWidth = 5;
	let lineCoords = [];

	const getCoords = (name) => {
		const left = document.querySelector(`.old .${name}`);
		const right = document.querySelector(`.new .${name}`);
		const nameEl = left.querySelector(".name");
		const containerWidth = left.offsetParent.offsetParent.offsetWidth;

		const x1 = left.offsetLeft + nameEl.offsetLeft + nameEl.offsetWidth;
		const y1 = left.offsetTop + left.offsetHeight / 2 + 16;
		const x2 = right.offsetLeft + containerWidth + 16;
		const y2 = right.offsetTop + right.offsetHeight / 2 + 16;

		return { x1, y1, x2, y2 };
	};

	onMount(() => {
		allNames.forEach((name) => {
			lineCoords = [...lineCoords, getCoords(name)];
		});
	});
</script>

<svg id="annotations">
	{#each lineCoords as { x1, x2, y1, y2 }, i}
		{@const name = allNames[i]}
		{@const visible =
			highlights.filter(
				(d) => d.name.toLowerCase().includes(name) && d.step === step
			).length === 2}
		<g class:visible>
			<line {x1} {y1} {x2} {y2} stroke-width={strokeWidth} />
			<line
				x1={x2}
				y1={y2}
				x2={x2 -
					arrowLength * Math.cos(Math.atan2(y2 - y1, x2 - x1) - Math.PI / 8)}
				y2={y2 -
					arrowLength * Math.sin(Math.atan2(y2 - y1, x2 - x1) - Math.PI / 8)}
				stroke-width={strokeWidth}
			/>
			<line
				x1={x2}
				y1={y2}
				x2={x2 -
					arrowLength * Math.cos(Math.atan2(y2 - y1, x2 - x1) + Math.PI / 8)}
				y2={y2 -
					arrowLength * Math.sin(Math.atan2(y2 - y1, x2 - x1) + Math.PI / 8)}
				stroke-width={strokeWidth}
			/>
		</g>
	{/each}
</svg>

<style>
	svg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	line {
		stroke: var(--color-gray-800);
		stroke-linecap: round;
	}
	:global(#annotations g) {
		opacity: 0;
		transition: opacity 0.25s;
	}
	:global(#annotations g.visible) {
		opacity: 0.9;
	}
</style>
