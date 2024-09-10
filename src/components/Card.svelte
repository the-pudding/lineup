<script>
	import Back from "$components/Card.Back.svelte";
	import _ from "lodash";

	export let id;
	export let i;
	export let info;
	export let active;

	$: name = info?.name;
	$: flipped = false;

	const onClick = () => {
		if (!active) return;
		flipped = !flipped;
	};

	$: if (!active && flipped) flipped = false;
</script>

<button class="card" class:active class:flipped on:click={onClick}>
	<div class="placeholder" />
	<div class="front">
		<img
			src={`assets/cards/${_.kebabCase(name).toLowerCase()}.png`}
			alt={`Baseball card of ${name}`}
			loading="lazy"
		/>
		<div class="swiper-lazy-preloader"></div>
	</div>
	<div class="back">
		<Back {id} {i} {info} />
	</div>
</button>

<style>
	.card {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 0.25rem;
		transition: transform calc(var(--1s) * 0.75);
		transform-style: preserve-3d;
		background: none;
		padding: 0;
		margin: 0;
	}
	.front,
	.back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		top: 0;
		border-radius: 0.25rem;
	}
	.front {
		height: 100%;
	}
	.back {
		transform: rotateY(180deg);
	}
	.placeholder {
		visibility: hidden;
		background: none;
		height: 400px;
		aspect-ratio: 0.716/1;
	}
	.flipped {
		transform: rotateY(180deg);
	}
	img {
		height: 100%;
		border-radius: 0.25rem;
	}
</style>
