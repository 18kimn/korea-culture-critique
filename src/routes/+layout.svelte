<script>
	import Header from '$lib/Header.svelte';
</script>

<div>
	<Header />
	<slot />
</div>

<style>
	@import './globals.css';

	div {
		display: flex;
		flex-direction: column;
	}
</style>
