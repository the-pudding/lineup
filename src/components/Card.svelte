<script>
	let side = "front";

	const flip = () => {
		side = side === "front" ? "back" : "front";
	};
</script>

<div class="card" class:flipped={side === "back"}>
	<div class="inner">
		<div class={side}>
			{#if side === "front"}
				This is the <strong>front</strong> of the card.
			{:else if side === "back"}
				This is the <strong>back</strong> of the card.
			{/if}
		</div>
	</div>
</div>
<button on:click={flip}>flip</button>

<style>
	.card {
		width: 200px;
		height: 300px;
		border-radius: 5px;
		perspective: 1000px;
	}
	.card:hover {
		cursor: pointer;
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
	}
</style>
