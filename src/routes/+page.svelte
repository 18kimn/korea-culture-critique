<script>
	import Korea from '$lib/Korea.svelte';
</script>

<div class="container">
	<div class="title">
		<h1>Korea · Culture · Critique</h1>
		<h2>by Isabelle Rhee and Nathan Kim</h2>
	</div>
	<div class="content">
		<Korea />
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: 3fr 2fr;
		padding: 2rem;
		place-items: center;
		flex-grow: 1;
	}

	.container div {
		height: 100%;
	}

	.title {
		display: flex;
		flex-direction: column;
		place-content: center;
	}

	.content {
		min-height: 100%;
		width: 100%;
	}

	h2 {
		font-size: 1.5rem;
	}
</style>
