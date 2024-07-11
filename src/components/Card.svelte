<script>
	import Back from "$components/Card.Back.svelte";

	export let name;
	export let era;
	export let rank;

	let zIndex = 3 - rank;
	let flipped = false;

	const cardHeight = 250;
	const angles = [-2, 5, -10];
	const ys = [0, 0, -20];

	const onClick = () => {
		flipped = !flipped;
	};
</script>

<div
	class="card"
	class:flipped
	style:height="{cardHeight}px"
	on:click={onClick}
>
	<img
		class="ghost"
		style:height="{cardHeight}px"
		src={`assets/cards/${era === "1970-2009" ? "old" : "new"}-${rank}.png`}
	/>
	<div class="back" class:flipped>
		back
		<!-- <Back {name} /> -->
	</div>
	<div class="front" class:flipped>
		<img
			style:height="{cardHeight}px"
			src={`assets/cards/${era === "1970-2009" ? "old" : "new"}-${rank}.png`}
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
	.card {
		position: relative;
		border-radius: 0.25rem;
		transition:
			position 0.5s,
			top 0.5s,
			left 0.5s,
			transform 0.5s;
	}
	.card:hover {
		cursor: pointer;
	}
	.card.flipped {
		transform: scale(2);
		transition:
			position 1.5s,
			top 1.5s,
			left 1.5s,
			transform 1.5s;
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
		transition: transform 0.5s ease;
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
