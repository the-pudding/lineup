<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");

	export let fill = "#ccc";
	export let vertical = false;
</script>

<g>
	{#each $data as d, i}
		{@const x = vertical ? $xGet(d) : $xScale.range()[0]}
		{@const y = vertical ? $yGet(d) : $yGet(d)}
		{@const width = vertical ? $xScale.bandwidth() : $xGet(d)}
		{@const height = vertical
			? $yScale.range()[0] - $yGet(d)
			: $yScale.bandwidth()}
		<rect data-id={i} {x} {y} {width} {height} {fill} />
	{/each}
</g>
