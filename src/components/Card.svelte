<script>
	import Back from "$components/Card.Back.svelte";
	import viewport from "$stores/viewport.js";
	import { selectedCard } from "$stores/misc.js";
	import _ from "lodash";
	import chevronLeft from "$svg/chevron-left.svg";
	import chevronRight from "$svg/chevron-right.svg";
	import close from "$svg/close.svg";
	import { onMount } from "svelte";

	export let i;
	export let id;
	export let allIds;
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

	const closeCard = () => {
		$selectedCard = undefined;
	};
	const advance = (direction) => {
		const index = allIds.indexOf(id);
		let newIndex = index + direction;
		if (newIndex < 0) newIndex = allIds.length - 1;
		if (newIndex >= allIds.length) newIndex = 0;

		$selectedCard = allIds[newIndex];
	};
	const onClick = () => {
		if ($selectedCard) return;

		dx = $viewport.width / 2 - cardEl.getBoundingClientRect().left - cardWidth;
		dy =
			$viewport.height / 2 -
			cardEl.getBoundingClientRect().top -
			cardHeightEnlarged / 2;

		if (!$selectedCard) $selectedCard = id;
	};
	const onKeyDown = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onClick();
		}
	};

	const findPosition = () => {
		if (!cardEl) return;
		dx = $viewport.width / 2 - cardEl.getBoundingClientRect().left - cardWidth;
		dy =
			$viewport.height / 2 -
			cardEl.getBoundingClientRect().top -
			cardHeightEnlarged / 2;
	};

	onMount(() => {
		findPosition();
	});

	$: if ($selectedCard === id) findPosition();

	$: flipped = $selectedCard === id;
	$: fade = $selectedCard && $selectedCard !== id;
	$: disabled =
		(zIndex < maxZIndex && !$selectedCard) ||
		($selectedCard && $selectedCard !== id);
	$: imgSrc = `assets/cards/${id}.png`;
</script>

{#if withWidth || i === 0}
	<div class="placeholder" style:height={`${cardHeight}px`} />
{/if}

<div
	class="card"
	class:flipped
	class:disabled
	class:fade
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
		<button class="close" on:click|stopPropagation={closeCard}
			>{@html close}</button
		>
		<button class="arrow left" on:click|stopPropagation={() => advance(-1)}
			>{@html chevronLeft}</button
		>
		<button class="arrow right" on:click|stopPropagation={() => advance(1)}
			>{@html chevronRight}</button
		>
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
		transition:
			transform var(--flip-speed),
			opacity calc(var(--1s) * 0.5);
	}
	.card.flipped {
		transform: translate(var(--dx), var(--dy));
		transition: transform var(--flip-speed);
	}
	.card.disabled {
		pointer-events: none;
	}
	.card.fade {
		opacity: 0;
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
		display: flex;
		align-items: center;
	}
	.flipped .back {
		transform: perspective(1000px) rotateY(0deg);
	}

	button {
		background: none;
		padding: 0;
		margin: 0;
	}
	.arrow {
		position: absolute;
		height: 100%;
		width: 50px;
	}
	.arrow:hover :global(svg polyline),
	.close:hover :global(svg line) {
		stroke: var(--color-green-medium);
	}
	.left {
		left: 0;
		transform: translate(-100%, 0);
	}
	.right {
		right: 0;
		transform: translate(100%, 0);
	}
	.close {
		position: absolute;
		height: 40px;
		width: 40px;
		top: 0;
		right: 0;
		transform: translate(100%, -100%);
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
