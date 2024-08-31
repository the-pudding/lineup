<script>
	import Back from "$components/Card.Back.svelte";
	import viewport from "$stores/viewport.js";
	import { selectedCard } from "$stores/misc.js";
	import _ from "lodash";

	export let i;
	export let id;
	export let info;
	export let zIndex;
	export let maxZIndex;
	export let withWidth = false;

	let cardEl;
	let cardWidth;
	let dx;
	let dy;

	const cardHeight = 250;
	const cardHeightEnlarged = 600;
	const angles = [-2, 5, -10];

	const onClick = () => {
		dx = $viewport.width / 2 - cardEl.getBoundingClientRect().left - cardWidth;
		dy =
			$viewport.height / 2 -
			cardEl.getBoundingClientRect().top -
			cardHeightEnlarged / 2;

		if (!$selectedCard) $selectedCard = id;
		else $selectedCard = undefined;
	};
	const onKeyDown = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick();
		}
	};

	$: flipped = $selectedCard === id;
	$: disabled = zIndex < maxZIndex || ($selectedCard && $selectedCard !== id);
	$: imgSrc = `assets/cards/${id}.png`;
</script>

{#if withWidth || i === 0}
	<div class="placeholder" style:height={`${cardHeight}px`} />
{/if}

<div
	class="card"
	class:flipped
	class:disabled
	style:z-index={flipped ? 1000 : zIndex}
	style="--angle: {withWidth
		? 0
		: angles[
				i
			]}deg; --card-height: {cardHeight}px; --card-height-enlarged: {cardHeightEnlarged}px; --dx: {dx}px; --dy: {dy}px; --flip-speed: 0.5s"
	on:click={onClick}
	on:keydown={onKeyDown}
	role="button"
	tabindex="0"
	bind:this={cardEl}
	bind:clientWidth={cardWidth}
>
	<div class="placeholder" />
	<div class="back">
		{#key info}
			<Back {id} {info} {flipped} />
		{/key}
	</div>
	<div class="front">
		<img src={imgSrc} alt={`Baseball card of ${info.name}`} />
	</div>
</div>

<style>
	.card {
		position: absolute;
		top: 0;
		border-radius: 0.25rem;
		transform-origin: center center;
		transform: rotate(var(--angle));
		transition: transform var(--flip-speed);
	}
	.card.flipped {
		transform: translate(var(--dx), var(--dy));
		transition: transform var(--flip-speed);
	}
	.card.disabled {
		pointer-events: none;
	}
	.card:hover {
		cursor: pointer;
	}
	.card:not(.flipped):hover {
		transform: translateY(-10px) rotate(var(--angle));
		transition: transform 0.2s;
	}

	.front,
	.back {
		position: absolute;
		top: 0;
		box-sizing: border-box;
		border-radius: 0.25rem;
		aspect-ratio: 10 / 14;
		width: 100%;
		height: 100%;
		box-shadow:
			0 4px 6px -1px #0000001a,
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		transition: transform var(--flip-speed) ease;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		background-color: #a6a78b;
	}
	.front {
		transform: perspective(1000px) rotateY(0deg);
	}
	.flipped .front {
		transform: perspective(1000px) rotateY(-180deg);
	}
	.back {
		transform: perspective(1000px) rotateY(180deg);
	}
	.flipped .back {
		transform: perspective(1000px) rotateY(0deg);
	}

	img {
		height: var(--card-height);
		width: auto;
		border-radius: 0.25rem;
	}
	.placeholder {
		height: var(--card-height);
		width: auto;
		aspect-ratio: 10 / 14;
		visibility: hidden;
	}
	img,
	.placeholder {
		transition: height var(--flip-speed);
		transform-origin: center center;
	}
	.flipped img,
	.flipped .placeholder {
		height: var(--card-height-enlarged);
	}
</style>
