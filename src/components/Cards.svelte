<script>
	import Handwriting from "$components/Handwriting.svelte";
	import Card from "$components/Card.svelte";
	import _ from "lodash";
	import { currentSection } from "$stores/misc.js";
	import { register } from "swiper/element/bundle";
	import mq from "$stores/mq.js";
	import { onMount } from "svelte";

	export let data;
	export let id;
	export let sectionI;

	let swiperEl;
	let active = 1;

	const eras = [
		{ id: "1970-2009", name: "Classic Era" },
		{ id: "2010-present", name: "Analytics Era" }
	];

	const onSlideChange = (e) => {
		const [swiper] = e.detail;
		active = swiper.activeIndex;
	};

	const onClick = (index) => {
		if (!$mq.desktop) return;
		if (swiperEl) swiperEl.swiper.slideTo(index);
	};

	const onKeyDown = (e) => {
		if ($currentSection !== sectionI || !$mq.desktop) return;
		if (e.keyCode === 37) {
			// Left
			e.preventDefault();
			swiperEl.swiper.slidePrev();
		} else if (e.keyCode === 39) {
			// Right
			e.preventDefault();
			swiperEl.swiper.slideNext();
		}
	};

	register();

	$: currentEra = eras.find((d) => d.id === data[active].era);

	onMount(() => {
		const links = document.querySelectorAll(`section#batting-${id} .back a`);
		links.forEach((link) => link.setAttribute("tabindex", "-1"));
	});
</script>

<svelte:window on:keydown={onKeyDown} />

<h3>
	<Handwriting
		text={`Iconic ${id === "1" ? `leadoff (#1)` : id === "4" ? `cleanup (#4)` : `#${id}`} hitters`}
		wonkiness={3}
	/>
</h3>

<div class="cards">
	<div class="title">{currentEra.name}</div>
	<div class="subtitle">({currentEra.id})</div>

	<swiper-container
		bind:this={swiperEl}
		initial-slide={1}
		effect="coverflow"
		coverflowEffect={{ scale: 0.75, stretch: 50 }}
		speed={500}
		slides-per-view={"auto"}
		centered-slides={true}
		auto-height={true}
		on:swiperslidechange={onSlideChange}
	>
		{#each data as card, i}
			<swiper-slide on:click={() => onClick(i)}>
				<Card
					id={_.kebabCase(card.name)}
					{i}
					{sectionI}
					info={card}
					active={active === i}
				/>
			</swiper-slide>
		{/each}
	</swiper-container>

	<div class="click">
		<Handwriting
			text={`^ ${$mq.desktop ? "Click" : "Tap"} to view the back!`}
			wonkiness={2}
			small={true}
		/>
		<div class="keys">
			{$mq.desktop
				? "To navigate cards: click, swipe, or use arrow keys."
				: "Swipe left or right to navigate between cards."}
		</div>
	</div>
</div>

<style>
	.cards {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.era {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1rem 0;
	}
	.title {
		font-weight: bold;
		color: var(--color-green-dark);
	}
	.subtitle {
		font-family: var(--mono);
		font-size: 0.9rem;
		color: var(--color-gray-800);
	}
	.click {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 1.5rem;
	}
	.keys {
		font-size: 0.9rem;
		font-family: var(--mono);
		color: var(--color-gray-800);
		margin-top: 0.5rem;
	}
	swiper-container {
		width: 100vw;
		margin: 1rem 0;
		overflow: hidden;
	}
	swiper-slide {
		height: 400px;
		width: auto;
		transform: translate(50%, 0);
	}
	swiper-slide:hover {
		cursor: pointer;
	}
	:global(.swiper-slide-shadow-left) {
		background: rgba(91, 99, 75, 0.3);
		background: linear-gradient(
			to left,
			rgba(91, 99, 75, 0),
			rgba(91, 99, 75, 0.3)
		);
	}
	:global(.swiper-slide-shadow-right) {
		background: rgba(91, 99, 75, 0.3);
		background: linear-gradient(
			to left,
			rgba(91, 99, 75, 0.3),
			rgba(91, 99, 75, 0)
		);
	}
	h3 {
		font-family: var(--handwriting);
		font-size: 2.5rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}
</style>
