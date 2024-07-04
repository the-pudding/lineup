<script>
	import { selectedCard } from "$stores/misc.js";

	export let name;
	export let era;
	export let rank;

	let zIndex = 3 - rank;

	const angles = [-2, 5, -10];
	const ys = [0, 0, -20];

	const onClick = () => {
		$selectedCard = name;
	};
</script>

<img
	src={`assets/cards/${era === "1970-2009" ? "old" : "new"}-${rank}.png`}
	style:z-index={zIndex}
	style:transform={`rotate(${angles[rank - 1]}deg) translate(-50%, ${ys[rank - 1]}px)`}
	on:click={onClick}
/>

<style>
	img {
		height: 250px;
		position: absolute;
		left: 50%;
		top: 0;
		transition: top 0.2s;
	}
	img:hover {
		cursor: pointer;
		top: -10px;
	}
</style>
