<script>
	import { getContext, onMount } from "svelte";
	import rough from "roughjs";

	const { data, yScale, zScale, xGet } = getContext("LayerCake");

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

		// const oldAvg =
		// 	($data[0].speed + $data[0].average + $data[0].walks + $data[0].power) / 4;
		// const newAvg =
		// 	($data[1].speed + $data[1].average + $data[1].walks + $data[1].power) / 4;
		// const x1 = $xGet($data[0]) + 75;
		// const x2 = $xGet($data[1]) + 75;
		// const y1 = $yScale(oldAvg) + 25;
		// const y2 = $yScale(newAvg) + 25;
		// const line = rc.line(x1, y1, x2, y2, {
		// 	stroke: "var(--color-gray-300)",
		// 	roughness: 1,
		// 	strokeWidth: 3
		// });
		// const leftCircle = rc.circle(x1, y1, 15, {
		// 	stroke: "var(--color-gray-300)",
		// 	roughness: 1,
		// 	strokeWidth: 3
		// });
		// const rightCircle = rc.circle(x2, y2, 15, {
		// 	stroke: "var(--color-gray-300)",
		// 	roughness: 1,
		// 	strokeWidth: 3
		// });
		// svg.appendChild(line);
		// svg.appendChild(leftCircle);
		// svg.appendChild(rightCircle);
	});
</script>

{#each $data as d, i}
	{#each $zScale.domain() as attr}
		{@const left = i === 0}
		{@const right = i === $data.length - 1}
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
</style>
