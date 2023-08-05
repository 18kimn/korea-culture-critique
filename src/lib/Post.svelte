<script lang="ts">
	import { getFootnotes } from './footnotes';
	import { getImages } from './images';
	import type { Footnote } from './footnotes';
	import type { Image } from './images';
	import { prettyDate, adjustDate } from '$lib/utils/string';
	import { last } from '$lib/utils/misc';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { Post } from './types';

	let rows: {
		node: Element;
		footnotes?: Footnote[];
		image?: Image;
	}[] = [];

	onMount(() => {
		const footnotes = getFootnotes();
		const images = getImages();
		/* After Svelte does an initial (invisible) render, 
    grab that information and represent it with footnotes alongside it*/
		const nodes = [
			...(document.querySelector('.article-shadow')
				?.children as HTMLCollection)
		];

		rows = nodes.map((node, index) => {
			const footnoteReferences =
				node.querySelectorAll('[id^="fn-"]');
			if (!footnoteReferences?.length)
				return {
					node,

					image: images.find((image) => image.index === index)
				};
			const footnoteIDs = [...footnoteReferences].map(
				(el) => `#${el.id}`
			);
			const containingFootnotes = footnotes.filter((footnote) =>
				footnoteIDs.includes(footnote.href)
			);
			return {
				node,
				footnotes: containingFootnotes,
				image: images.find((image) => image.index === index)
			};
		});
	});

	export let data = {} as Post;
	let width: number;

	$: ({ title, subtitle, modified, created } = data);
</script>

<svelte:window bind:innerWidth={width} />
<div class="container">
	{#if data.title}
		<div class="content">
			<div>
				<div class="article-shadow">
					<slot />
				</div>
				<div class="article">
					<div class="row">
						<div class="section-wrapper">
							<div class="section">
								<h1>{@html title}</h1>
								{#if subtitle}<h2>{subtitle}</h2>{/if}
								<div class="meta">
									<span id="date">
										{#if modified?.length && last(modified) !== created}
											<em>Created:</em>
										{/if}
										{prettyDate(adjustDate(created))}
									</span>
									{#if modified?.length && last(modified) !== created}
										<span id="modified">
											<em>Last modified: </em>
											{prettyDate(adjustDate(last(modified)))}
										</span>
									{/if}
								</div>
							</div>
						</div>
					</div>
					<div class="spacer" />
					{#each rows as row, index}
						<div class="row">
							<div
								class="section-wrapper"
								in:fade={{ delay: index * 150 }}
							>
								<div class="section">
									{@html row.node.outerHTML}
								</div>
							</div>
							{#if width > 1000}
								<div class="sidebar-content">
									{#if row.footnotes}
										<div
											class="footnotes"
											in:fade={{ delay: index * 150 + 150 }}
										>
											{#each row.footnotes as footnote}
												<div class="footnote">
													{footnote.index + 1}.
													{@html footnote.html}
												</div>
											{/each}
										</div>
									{/if}
									{#if row.image}
										<div class="image">
											<img
												src={row.image.url}
												alt={row.image.caption}
											/>
											{row.image.caption}
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.content {
		overflow-x: auto;
		overflow-wrap: break-word;
		padding: 2rem;
	}

	.article-shadow {
		display: none;
	}

	@media (max-width: 1000px) {
		.article {
			grid-template-columns: 1fr;
		}
	}

	.section-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.row {
		display: grid;
		grid-template-columns: 1fr 30%;
	}

	.section {
		width: min(80ch, 80vw);
	}

	.sidebar-content {
		min-width: 0;
	}

	.footnotes {
		padding: 0 2rem;
	}

	.footnote {
		font-size: 0.8rem;
		margin: 0.5rem 0;
		max-width: 60ch;
	}

	.meta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	h1 {
		white-space: normal;
		font-size: 2rem;
	}

	h1 :global(code) {
		background: none;
	}

	.content :global(.heading-link:hover) {
		background: gray;
	}

	.content :global(h2) {
		font-size: 1.5rem;
	}

	.content :global(h3) {
		font-size: 1.2rem;
	}

	.content :global(a) {
		font-family: var(--font);
		font-size: 1rem;
		margin: 0rem;
		color: #0015ab;
		text-decoration: none;
		transition: all ease-in-out 200ms;
	}

	.content :global(a:hover) {
		color: red;
		text-decoration: underline;
	}

	.content :global(.heading-link) {
		margin: 0.3rem;
		opacity: 0;
		transition: opacity ease-in-out 200ms;
	}

	.content :global(.heading:hover a) {
		opacity: 1;
	}

	.content :global(sup a),
	.content :global(.backlink) {
		font-size: 0.8rem;
	}

	.content :global(pre) {
		font-size: 0.8rem;
		white-space: pre-wrap;
	}

	.content :global(.caption) {
		font-size: 0.8rem;
		display: block;
		width: 100%;
		text-align: center;
	}

	.content :global(img) {
		width: 100%;
	}

	.content :global(iframe) {
		width: 100%;
		height: 100vh;
	}

	.content :global(blockquote) {
		background: #ebebeb;
		padding: 1rem;
		margin: 0.5rem 1rem;
		border-left: solid 5px black;
	}

	.content :global(blockquote > h1) {
		font-size: 1.3rem;
	}
</style>
