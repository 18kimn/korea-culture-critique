<script lang="ts">
	import Korea from '$lib/Korea.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import { prettyDate, adjustDate } from '$lib/utils/string';
	import { page } from '$app/stores';
	import type { Post } from '$lib/types';

	export let data;
	const posts = [
		...data.posts.map((post: Post) => ({
			...post,
			path: `/posts/${post.path}`
		})),
		{
			created: '2023-08-25',
			title: 'About this site',
			subtitle: '',
			path: '/about',
			postData: null,
			author: 'Nathan Kim and Ji-hye Rhee'
		}
	].sort((a: Post, b: Post) => {
		return (
			Number(new Date(b.created)) - Number(new Date(a.created))
		);
	}) as Post[];

	/* Can't figure out why Svelte doesn't transition it in automatically */
	let shouldShow = false;
	onMount(() => {
		shouldShow = true;
	});
	const words = ['Korea · ', 'Culture · ', 'Critique'];

	const displayTitle = `Korea, Culture, Critique`;
	const subtitle =
		'Korea, Culture, Critique is a blog for critical reflection on contemporary Korea.';
	const imageURL = '/favicon.png';
</script>

<svelte:head>
	<title>{displayTitle}</title>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={displayTitle} />
	{#if subtitle}
		<meta name="twitter:description" content={subtitle} />
		<meta property="og:description" content={subtitle} />
	{/if}
	<meta name="twitter:image" content={imageURL} />
	<meta property="og:image" content={imageURL} />
	<meta
		property="og:url"
		content="https://korea-culture-critique.org"
	/>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={displayTitle} />
</svelte:head>
<div class="container">
	<div class="left">
		<div class="left-container">
			{#if shouldShow}
				<div class="title">
					<h1>
						{#each words as word, index}
							<span
								in:fade={{
									delay: !$navigating ? index * 600 : 0
								}}>{word}</span
							>
						{/each}
					</h1>
					<h2 in:fade={{ delay: 1800 }}>
						by Ji-hye Rhee and Nathan Kim
					</h2>
				</div>
				<div
					class="posts"
					in:fade={{ delay: !$navigating ? 1800 : 0 }}
				>
					Recent content:
					{#each posts as post}
						<div class="post">
							<div class="title-bar">
								<div>
									<h2 class="post-title">
										<a href={post.path}>{post.title}</a>
									</h2>
									<span
										><em
											>{prettyDate(adjustDate(post.created))}</em
										></span
									>
								</div>
								<h3 class="author">by {post.author}</h3>
							</div>
						</div>
					{/each}
					<div>
						Contact:
						<li>nathanckim18@gmail.com</li>
						<li>@rheedacted</li>
						<li>@nathanckim</li>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="korea">
		<Korea />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		padding: 2rem;
		place-items: center;
		flex-grow: 1;
		gap: 2rem;
	}

	.left,
	.korea {
		height: 100%;
	}

	.left {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.left-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4rem;
	}

	.korea {
		flex: 1;
		min-height: 100%;
		min-width: 35vw;
	}

	h2 {
		font-size: 1.5rem;
	}

	.posts {
		width: 100%;
	}

	.post {
		height: fit-content;
		margin: 1rem 0;
	}

	.title-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.post-title,
	.author {
		font-size: 1rem;
		margin: 0;
	}

	.author {
		max-width: 40%;
		text-align: right;
	}

	li {
		display: block;
		padding-left: 1rem;
	}
</style>
