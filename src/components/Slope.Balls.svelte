<script>
	import { getContext } from "svelte";
	const { data, yScale, zScale, xGet, x } = getContext("LayerCake");
</script>

{#each $data as d, i}
	{#each $zScale.domain() as attr}
		{@const left = i === 0}
		{@const right = i === $data.length - 1}
		{@const next = $x(d) !== 2020 ? $data[i + 1] : null}
		{#if next}
			<line
				x1={$xGet(d)}
				y1={$yScale(d[attr])}
				x2={$xGet(next)}
				y2={$yScale(next[attr])}
				stroke={$zScale(attr)}
				stroke-width="4"
				opacity="0.6"
			/>
		{/if}

		<circle cx={$xGet(d)} cy={$yScale(d[attr])} r="8" fill={$zScale(attr)} />

		{#if left || right}
			<text
				x={$xGet(d) + (left ? -12 : 12)}
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
		font-family: var(--mono);
		font-size: 0.8rem;
		alignment-baseline: middle;
	}
</style>
