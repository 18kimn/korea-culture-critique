<script lang="ts">
	import type { Post } from '$lib/types';
	import { prettyDate, adjustDate } from '$lib/utils/string';
	export let data;

	const posts = data.posts as Post[];
</script>

<div class="container">
	<div class="content">
		<h1>our writing</h1>
		{#each posts as post}
			<div class="post">
				<h2><a href="/posts{post.path}">{post.title}</a></h2>
				<h3>{post.subtitle}</h3>
				<span>{prettyDate(adjustDate(post.created))}</span>
			</div>
		{/each}
	</div>
	<div class="spacer" />
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		padding: 2rem;
		display: grid;
		justify-content: center;
		align-items: center;
	}

	.content {
		max-width: 72ch;
	}

	.post {
		margin: 2rem 0;
	}

	h1 {
		font-size: 3rem;
	}
	h2 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.3rem;
	}
</style>
