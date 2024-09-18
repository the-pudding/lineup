<script>
	import Back from "$components/Card.Back.svelte";
	import _ from "lodash";
	import mq from "$stores/mq.js";
	import { currentSection } from "$stores/misc.js";

	export let id;
	export let i;
	export let sectionI;
	export let info;
	export let active;

	const focusableSelector = ["button", "a", '[tabindex]:not([tabindex="-1"])']
		.map((selector) => `#${id} .back ${selector}:not(section.main)`)
		.join(",");

	const trapFocus = () => {
		const backEl = document.querySelector(`#${id} .back .main`);
		backEl.focus();
	};

	const onClick = () => {
		if (!active) return;
		flipped = !flipped;
		if (flipped) trapFocus();
	};

	const onKeyDown = (e) => {
		if (!$mq.desktop) return;
		if (
			e.keyCode === 13 &&
			$currentSection === sectionI &&
			active &&
			!flipped
		) {
			// Enter
			e.preventDefault();
			onClick();
		} else if (trapped) {
			const focusableElements = document.querySelectorAll(focusableSelector);
			console.log(focusableElements);
			const firstFocusable = focusableElements[0];
			const lastFocusable = focusableElements[focusableElements.length - 1];

			if (e.keyCode === 9) {
				// Tab
				if (e.shiftKey) {
					if (document.activeElement === firstFocusable) {
						lastFocusable.focus();
						e.preventDefault();
					}
				} else {
					if (document.activeElement === lastFocusable) {
						firstFocusable.focus();
						e.preventDefault();
					}
				}
			}
		}
	};

	$: if ((!active || $currentSection !== sectionI) && flipped) flipped = false;
	$: name = info?.name;
	$: flipped = false;
	$: trapped = active && flipped;
</script>

<svelte:window on:keydown={onKeyDown} />

<button
	tabindex="-1"
	class="card"
	{id}
	class:active
	class:flipped
	on:click={onClick}
>
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
		<Back {id} {i} {info} {flipped} />
	</div>
</button>

<style>
	.card {
		position: relative;
		width: 100%;
		height: 100%;
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
	}
</style>
