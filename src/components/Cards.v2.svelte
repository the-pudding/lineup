<script>
	import Handwriting from "$components/Handwriting.svelte";
	import Card from "$components/Card.v2.svelte";
	import _ from "lodash";
	import { selectedCard } from "$stores/misc.js";
	import { register } from "swiper/element/bundle";
	import mq from "$stores/mq.js";

	export let data;
	export let id;

	let swiperEl;
	let active = 1;
	let dataCleaned = _.groupBy(data, "era");

	const eras = [
		{ id: "1970-2009", name: "Pre-Stats" },
		{ id: "2010-present", name: "Post-Stats" }
	];

	const onSlideChange = (e) => {
		const [swiper] = e.detail;
		active = swiper.activeIndex;
	};

	const onClick = (index) => {
		if (!$mq.desktop) return;
		if (swiperEl) swiperEl.swiper.slideTo(index);
	};

	_.forEach(dataCleaned, (group) => {
		group.forEach((item, index) => {
			item.zIndex = group.length - index;
		});
	});

	register();

	$: fade = $selectedCard !== undefined;
	$: currentEra = eras.find((d) => d.id === data[active].era);
</script>

<h3 class:fade>
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
				<Card id={_.kebabCase(card.name)} info={card} active={active === i} />
			</swiper-slide>
		{/each}
	</swiper-container>

	<div class="click">
		<Handwriting text="Click to flip to the back!" wonkiness={2} small={true} />
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
		color: var(--color-power);
	}
	.subtitle {
		font-family: var(--mono);
		font-size: 0.9rem;
		color: var(--color-gray-800);
	}
	.click {
		font-size: 1.5rem;
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
