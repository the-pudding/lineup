<script>
	import Handwriting from "$components/Handwriting.svelte";
	import Card from "$components/Card.v2.svelte";
	import _ from "lodash";
	import { selectedCard } from "$stores/misc.js";
	import { register } from "swiper/element/bundle";

	export let data;
	export let id;

	let swiperEls = [];
	let active = [0, 0];
	let dataCleaned = _.groupBy(data, "era");

	const eras = [
		{ id: "1970-2009", name: "Pre-Stats" },
		{ id: "2010-present", name: "Post-Stats" }
	];

	const onSlideChange = (e, i) => {
		const [swiper] = e.detail;
		active[i] = swiper.activeIndex;
	};

	_.forEach(dataCleaned, (group) => {
		group.forEach((item, index) => {
			item.zIndex = group.length - index;
		});
	});

	register();

	$: fade = $selectedCard !== undefined;
</script>

<h3 class:fade>
	<Handwriting
		text={`Iconic ${id === "1" ? `leadoff (#1)` : id === "4" ? `cleanup (#4)` : `#${id}`} hitters`}
		wonkiness={3}
	/>
</h3>

<div class="cards">
	{#each eras as { id, name }, i}
		<div class="title">{name}</div>
		<div class="subtitle">({id})</div>

		<swiper-container
			bind:this={swiperEls[i]}
			initial-slide={1}
			effect="coverflow"
			slides-per-view={"auto"}
			centered-slides={true}
			on:swiperslidechange={(e) => onSlideChange(e, i)}
		>
			{#each dataCleaned[id] as card}
				<swiper-slide lazy="true">
					<Card {...card} />
				</swiper-slide>
			{/each}
		</swiper-container>
	{/each}
</div>

<style>
	.cards {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.title {
		font-weight: bold;
	}
	.subtitle {
		font-family: var(--mono);
		font-size: 0.9rem;
		color: var(--color-gray-800);
	}
	swiper-container {
		width: 100%;
		height: 300px;
		margin: 1rem 0;
	}
	swiper-slide {
		width: auto;
	}
	h3 {
		font-family: var(--handwriting);
		font-size: 2.5rem;
	}
</style>
