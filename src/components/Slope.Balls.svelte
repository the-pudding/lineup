<script>
	import { getContext, onMount } from "svelte";
	import rough from "roughjs";
	import { currentSection } from "$stores/misc.js";

	const { data, yScale, zScale, xGet, x } = getContext("LayerCake");

	export let i;
	export let id;

	const r = 7;

	onMount(() => {
		const svg = document.querySelector(`#chart-${id} svg`);
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
				strokeWidth: 3
			});
			const rightCircle = rc.circle(x2, y2, 15, {
				stroke: $zScale(attr),
				roughness: 1,
				strokeWidth: 3
			});
			svg.appendChild(line);
			svg.appendChild(leftCircle);
			svg.appendChild(rightCircle);
		});
	});
</script>

{#each $data as d, i}
	{#each $zScale.domain() as attr}
		{@const left = i === 0}
		{@const right = i === $data.length - 1}
		{@const next = $x(d) !== 2020 ? $data[i + 1] : null}
		{#if next}
			<!-- <line
				x1={$xGet(d)}
				y1={$yScale(d[attr])}
				x2={$xGet(next)}
				y2={$yScale(next[attr])}
				stroke={$zScale(attr)}
				stroke-width={r * 2}
				opacity="0.6"
			/> -->
		{/if}

		<!-- <circle cx={$xGet(d)} cy={$yScale(d[attr])} {r} fill={$zScale(attr)} /> -->

		{#if left || right}
			<text
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
		font-size: 1.4rem;
		alignment-baseline: middle;
	}
	line {
		/* background-image: linear-gradient(
			to right,
			rgba(255, 225, 0, 0.1),
			rgba(255, 225, 0, 0.7) 4%,
			rgba(255, 225, 0, 0.3)
		); */
	}
</style>
