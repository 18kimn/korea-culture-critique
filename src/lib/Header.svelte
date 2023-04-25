<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	type Route = {
		path: string;
		name: string;
	};

	const routes: Route[] = [
		{ path: '/', name: 'home' },
		{ path: '/about', name: 'about' },
		// { path: '/posts', name: 'posts' },
		{ path: '/contact', name: 'contact' },
		{ path: '/feed', name: 'feed' }
	];
</script>

<div class="header" in:fade>
	<nav>
		{#each routes as route}
			<a
				class:selected={route.path === $page.route.id}
				href={route.path}>{route.name}</a
			>
		{/each}
	</nav>
</div>

<style>
	.header {
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 1rem 0;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		gap: 1rem 2rem;
	}

	a {
		color: black;
	}

	.selected {
		font-weight: bold;
	}
</style>
