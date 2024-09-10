<script>
	import { getContext, onMount } from "svelte";
	import rough from "roughjs";

	const { data, yScale, zScale, xGet, width } = getContext("LayerCake");

	export let id;

	const r = 7;

	const draw = () => {
		const svg = document.querySelector(`#chart-${id} svg`);
		if (!svg) return;

		const toClear = svg.querySelectorAll(`#chart-${id} svg path`);
		toClear.forEach((element) => {
			element.parentNode.removeChild(element);
		});

		const rc = rough.svg(svg);
		$zScale.domain().forEach((attr) => {
			const x1 = $xGet($data[0]) + 75;
			const y1 = $yScale($data[0][attr]) + 25;
			const x2 = $xGet($data[1]) + 75;
			const y2 = $yScale($data[1][attr]) + 25;
			const line = rc.line(x1, y1, x2, y2, {
				stroke: $zScale(attr),
				roughness: 1,
				strokeWidth: 3
			});
			const leftCircle = rc.circle(x1, y1, 15, {
				stroke: $zScale(attr),
				roughness: 1,
				strokeWidth: 3,
				fillStyle: "solid",
				fill: $zScale(attr)
			});
			const rightCircle = rc.circle(x2, y2, 15, {
				stroke: $zScale(attr),
				roughness: 1,
				strokeWidth: 3,
				fillStyle: "solid",
				fill: $zScale(attr)
			});
			svg.appendChild(line);
			svg.appendChild(leftCircle);
			svg.appendChild(rightCircle);
		});
	};

	$: $width, draw();

	onMount(() => {
		draw();
	});
</script>

{#each $data as d, i}
	{#each $zScale.domain() as attr}
		{@const left = i === 0}
		{@const right = i === $data.length - 1}
		{#if left || right}
			<text
				class={`${left ? "left" : "right"} ${attr}`}
				x={$xGet(d) + (left ? -(r * 2) : r * 2)}
				y={$yScale(d[attr])}
				fill={$zScale(attr)}
				text-anchor={left ? "end" : "start"}
			>
				{attr}
			</text>
		{/if}
	{/each}
{/each}

<style>
	text {
		font-family: var(--handwriting);
		font-size: 1.8rem;
		alignment-baseline: middle;
	}

	:global(#chart-1 .average.left) {
		transform: translate(0, -10px);
	}
	:global(#chart-1 .walks.left) {
		transform: translate(0, 10px);
	}
	:global(#chart-1 .average.right) {
		transform: translate(0, -10px);
	}
	:global(#chart-1 .walks.right) {
		transform: translate(0, 8px);
	}

	:global(#chart-2 .speed.left) {
		transform: translate(0, -5px);
	}
	:global(#chart-2 .walks.left) {
		transform: translate(0, 14px);
	}
	:global(#chart-2 .power.left) {
		transform: translate(0, 10px);
	}
	:global(#chart-2 .speed.right) {
		transform: translate(0, -22px);
	}
	:global(#chart-2 .average.right) {
		transform: translate(0, -6px);
	}
	:global(#chart-2 .walks.right) {
		transform: translate(0, 1px);
	}
	:global(#chart-2 .power.right) {
		transform: translate(0, 12px);
	}

	:global(#chart-3 .speed.left) {
		transform: translate(0, 12px);
	}
	:global(#chart-3 .walks.left) {
		transform: translate(0, 14px);
	}
	:global(#chart-3 .average.left) {
		transform: translate(0, -20px);
	}
	:global(#chart-3 .power.right) {
		transform: translate(0, -20px);
	}
	:global(#chart-3 .average.right) {
		transform: translate(0, 14px);
	}
	:global(#chart-3 .speed.right) {
		transform: translate(0, 5px);
	}

	:global(#chart-4 .average.left) {
		transform: translate(0, 5px);
	}
	:global(#chart-4 .average.right) {
		transform: translate(0, 5px);
	}
	:global(#chart-4 .walks.right) {
		transform: translate(0, 5px);
	}
	:global(#chart-4 .power.right) {
		transform: translate(0, -2px);
	}

	:global(#chart-5-7 .power.left) {
		transform: translate(0, -17px);
	}
	:global(#chart-5-7 .walks.left) {
		transform: translate(0, -5px);
	}
	:global(#chart-5-7 .average.left) {
		transform: translate(0, -1px);
	}
	:global(#chart-5-7 .speed.left) {
		transform: translate(0, 21px);
	}
	:global(#chart-5-7 .power.right) {
		transform: translate(0, -25px);
	}
	:global(#chart-5-7 .speed.right) {
		transform: translate(0, -3px);
	}
	:global(#chart-5-7 .walks.right) {
		transform: translate(0, 18px);
	}
	:global(#chart-5-7 .average.right) {
		transform: translate(0, 29px);
	}

	:global(#chart-8-9 .walks.left) {
		transform: translate(0, -5px);
	}
	:global(#chart-8-9 .average.left) {
		transform: translate(0, -5px);
	}
	:global(#chart-8-9 .power.left) {
		transform: translate(0, 10px);
	}
	:global(#chart-8-9 .walks.right) {
		transform: translate(0, -10px);
	}
	:global(#chart-8-9 .power.right) {
		transform: translate(0, 9px);
	}
</style>
