<script>
	import { selectedCard } from "$stores/misc.js";
	import Card from "$components/Modal.Card.svelte";
</script>

<div class="modal" class:visible={$selectedCard}>
	<button on:click={() => ($selectedCard = undefined)}>x</button>

	<Card />
</div>

<style>
	.modal {
		background: #222;
		padding: 3rem;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1000;
		display: none;
	}
	.modal.visible {
		display: block;
	}
	button {
		position: absolute;
		top: 0;
		right: 0;
		color: white;
		background: none;
		padding: 10px 10px 0 0;
		font-size: 1.5rem;
	}
</style>
