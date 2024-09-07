<script>
	import _ from "lodash";

	export let name;

	$: flipped = false;

	const onClick = () => {
		flipped = !flipped;
	};
</script>

<div class="card" class:flipped on:click={onClick}>
	<div class="front">
		<img
			src={`assets/cards/${_.kebabCase(name).toLowerCase()}.png`}
			alt={`Baseball card of ${name}`}
			loading="lazy"
		/>
	</div>
	<div class="back">
		<p>back</p>
	</div>
</div>

<style>
	.card {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 0.25rem;
	}
	.front {
		height: 100%;
	}
	img {
		height: 100%;
		border-radius: 0.25rem;
	}
</style>
