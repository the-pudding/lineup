<script>
	import Handwriting from "$components/Handwriting.svelte";
	import Card from "$components/Card.svelte";
	import _ from "lodash";
	import { selectedCard } from "$stores/misc.js";
	import shuffleIcon from "$svg/shuffle.svg";

	export let data;
	export let id;

	const eras = [
		{ id: "1970-2009", name: "Pre-Stats" },
		{ id: "2010-present", name: "Post-Stats" }
	];
	let dataCleaned = _.groupBy(data, "era");
	_.forEach(dataCleaned, (group) => {
		group.forEach((item, index) => {
			item.zIndex = group.length - index;
		});
	});

	const shuffle = (era) => {
		const elements = dataCleaned[era.id];
		elements.forEach((el) => {
			if (el.zIndex + 1 > elements.length) {
				el.zIndex = 1;
			} else {
				el.zIndex += 1;
			}
		});
		dataCleaned = dataCleaned;
	};
</script>

<div class="cards-wrapper">
	<h3>
		<Handwriting text={`Players that exemplify batting #${id}`} wonkiness={3} />
	</h3>
	<div class="click">
		<Handwriting
			text={`Click on a card to flip it over and see the back!`}
			wonkiness={0}
			small={true}
		/>
	</div>

	<div class="cards">
		{#each eras as era, i}
			<div class="era">
				<div class="stack">
					{#each dataCleaned[era.id] as card, i}
						{@const maxZIndex = dataCleaned[era.id].length}
						<Card
							{i}
							id={_.kebabCase(card.name)}
							zIndex={card.zIndex}
							{maxZIndex}
							info={{ ...card }}
						/>
					{/each}
				</div>
				<div class="label">{era.name}</div>
				<div class="sublabel">({era.id})</div>

				<button
					class="shuffle"
					on:click={() => shuffle(era)}
					disabled={$selectedCard}
				>
					{@html shuffleIcon}
				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.cards-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	h3 {
		font-family: var(--handwriting);
		font-size: 2.5rem;
	}
	.click {
		font-size: 1.3rem;
		font-family: var(--handwriting);
	}
	.cards {
		display: flex;
		align-items: center;
		width: 100%;
		margin: 2.5rem 0;
	}
	.era {
		position: relative;
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.stack {
		margin-bottom: 1rem;
		position: relative;
	}
	.label,
	.sublabel {
		font-weight: bold;
		text-align: center;
	}
	.sublabel {
		font-size: 0.9rem;
		color: var(--color-gray-700);
		font-family: var(--mono);
	}
	button {
		height: 1.5rem;
		width: 1.5rem;
		padding: 0;
		background: none;
		margin-top: 1rem;
	}
</style>
