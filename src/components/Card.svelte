<script>
	import Back from "$components/Card.Back.svelte";
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";

	export let name;
	export let era;
	export let rank;

	let zIndex = 3 - rank;
	let flipped = false;
	let cardEl;
	let cardWidth;
	let dx;
	let dy;

	const cardHeight = 250;
	const angles = [-2, 5, -10];
	const ys = [0, 0, -20];

	const onClick = () => {
		flipped = !flipped;
		dx = $viewport.width / 2 - cardEl.getBoundingClientRect().left - cardWidth;
		dy = $viewport.height / 2 - cardEl.getBoundingClientRect().top - cardHeight;
	};
	const onKeyDown = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick();
		}
	};
</script>

<img
	class="ghost"
	style="--card-height: {cardHeight}px"
	src={`assets/cards/${era === "1970-2009" ? "old" : "new"}-${rank}.png`}
	alt={`Baseball card of ${name}`}
/>

<div
	class="card"
	class:flipped
	style="--card-height: {cardHeight}px; --double: {cardHeight *
		2}px; --dx: {dx}px; --dy: {dy}px; --fast-flip: 0.5s; --slow-flip: 1.5s"
	on:click={onClick}
	on:keydown={onKeyDown}
	role="button"
	tabindex="0"
	bind:this={cardEl}
	bind:clientWidth={cardWidth}
>
	<img
		class="ghost"
		class:flipped
		src={`assets/cards/${era === "1970-2009" ? "old" : "new"}-${rank}.png`}
		alt={`Baseball card of ${name}`}
	/>
	<div class="back" class:flipped>
		<Back {name} />
	</div>
	<div class="front" class:flipped>
		<img
			src={`assets/cards/${era === "1970-2009" ? "old" : "new"}-${rank}.png`}
			alt={`Baseball card of ${name}`}
			class:flipped
		/>
	</div>
</div>

<style>
	img {
		width: auto;
		border-radius: 0.25rem;
	}
	.ghost {
		visibility: hidden;
	}
	img {
		height: var(--card-height);
		transition: height var(--fast-flip);
		transform-origin: center center;
	}
	img.flipped {
		height: var(--double);
		transition: height var(--slow-flip);
	}
	.card {
		position: absolute;
		top: 0;
		border-radius: 0.25rem;
		transform-origin: center center;
		transition:
			transform var(--fast-flip),
			height var(--fast-flip);
	}
	.card.flipped {
		transform: translate(var(--dx), var(--dy));
		transition:
			transform var(--slow-flip),
			height var(--slow-flip);
		z-index: 1000;
	}
	.card:hover {
		cursor: pointer;
	}
	.front,
	.back {
		position: absolute;
		top: 0;
		box-sizing: border-box;
		border-radius: 0.25rem;
		width: 100%;
		height: 100%;
		box-shadow:
			0 4px 6px -1px #0000001a,
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: transform var(--fast-flip) ease;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		background-color: #ebf4ff;
	}
	.front {
		transform: perspective(1000px) rotateY(0deg);
	}
	.front.flipped {
		transform: perspective(1000px) rotateY(-180deg);
	}
	.back {
		transform: perspective(1000px) rotateY(180deg);
	}
	.back.flipped {
		transform: perspective(1000px) rotateY(0deg);
	}
</style>
