<script>
	import Header from '$lib/Header.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Korea · Culture · Critique</title>
</svelte:head>
<div>
	<Header />
	<div class="page-container">
		{#key $page.route}
			<div class="page" in:fade={{ delay: 300 }}>
				<slot />
			</div>
		{/key}
	</div>
</div>

<style>
	@import './globals.css';

	div {
		display: flex;
		flex-direction: column;
	}

	.page-container {
		display: grid;
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}

	.page-container,
	.page {
		width: 100%;
		height: 100%;
	}
</style>
