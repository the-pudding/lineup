<script>
	export let player;
	export let type;
	export let top;
	export let left;
	export let transform;
	export let background;
	export let zIndex;
	export let order;

	let side = "front";

	const onClick = () => {
		if (order[0].id !== player.id) {
			order = [player, ...order.filter((d) => d !== player)];
		} else {
			side = side === "front" ? "back" : "front";
		}
	};
</script>

<div
	class="card"
	class:flipped={side === "back"}
	class:ghost={type === "ghost"}
	style:top
	style:left
	style:transform
	style:background
	style:z-index={zIndex}
	on:click={onClick}
>
	<div class="inner">
		<div class={side}>
			{player?.name}
			<!-- {#if side === "front"}
				This is the <strong>front</strong> of the card.
			{:else if side === "back"}
				This is the <strong>back</strong> of the card.
			{/if} -->
		</div>
	</div>
</div>

<style>
	.card {
		position: absolute;
		width: 200px;
		height: 300px;
		border-radius: 5px;
		perspective: 1000px;
		/* background: var(--color-gray-100); */
	}
	.card:hover {
		cursor: pointer;
	}
	.card.ghost {
		position: static;
		visibility: hidden;
	}
	.inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 1s;
		transform-style: preserve-3d;
		border: 1px solid #ccc;
	}
	.flipped .inner {
		transform: rotateY(180deg);
	}
	.front,
	.back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}
	.back {
		transform: rotateY(180deg);
		background: lavender;
	}
</style>
