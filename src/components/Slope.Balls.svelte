<script>
	import { getContext } from "svelte";
	const { data, yScale, zScale, xGet, x } = getContext("LayerCake");

	const r = 7;

	const lightenHex = (hex, percent = 0.5) => {
		hex = hex.replace(/^#/, "");
		let bigint = parseInt(hex, 16);
		let r = (bigint >> 16) & 255;
		let g = (bigint >> 8) & 255;
		let b = bigint & 255;

		r = Math.min(255, Math.floor(r + (255 - r) * percent));
		g = Math.min(255, Math.floor(g + (255 - g) * percent));
		b = Math.min(255, Math.floor(b + (255 - b) * percent));

		return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
	};
	const darkenHex = (hex, percent = 0.5) => {
		hex = hex.replace(/^#/, "");
		let bigint = parseInt(hex, 16);
		let r = (bigint >> 16) & 255;
		let g = (bigint >> 8) & 255;
		let b = bigint & 255;

		r = Math.max(0, Math.floor(r * (1 - percent)));
		g = Math.max(0, Math.floor(g * (1 - percent)));
		b = Math.max(0, Math.floor(b * (1 - percent)));

		return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
	};
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
				stroke-width={r * 2}
				opacity="0.6"
			/>
		{/if}

		<circle cx={$xGet(d)} cy={$yScale(d[attr])} {r} fill={$zScale(attr)} />

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
		font-family: var(--mono);
		font-size: 0.8rem;
		alignment-baseline: middle;
	}
</style>
