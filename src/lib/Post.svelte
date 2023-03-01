<script lang="ts">
	import { getFootnotes } from './footnotes';
	import type { Footnote } from './footer';
	import { prettyDate, adjustDate } from '$lib/utils/string';
	import { last } from '$lib/utils/misc';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Post {
		date: string | Date;
		title: string;
		subtitle: string;
		path: string;
		modified?: string[];
		tags?: string[];
		content?: string;
		postData: any;
	}

	let footnotes: Footnote[] = [];
	let pairs: {
		node: Element;
		footnotes?: Footnote[];
	}[] = [];

	onMount(() => {
		footnotes = getFootnotes();
		/* After Svelte does an initial (invisible) render, 
    grab that information and represent it with footnotes alongside it*/
		const nodes = [
			...(document.querySelector('.article-shadow')
				?.children as HTMLCollection)
		];

		pairs = nodes.map((node) => {
			const footnoteReferences =
				node.querySelectorAll('[id^="fn-"]');
			if (!footnoteReferences?.length) return { node };
			const footnoteIDs = [...footnoteReferences].map(
				(el) => `#${el.id}`
			);
			const containingFootnotes = footnotes.filter((footnote) =>
				footnoteIDs.includes(footnote.href)
			);
			return { node, footnotes: containingFootnotes };
		});
	});

	export let data = {} as Post;
	let width: number;

	$: ({ title, subtitle, modified, date, tags } = data);
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
					<div class="section-wrapper">
						<div class="section">
							<h1>{@html title}</h1>
							{#if subtitle}<h2>{subtitle}</h2>{/if}
							<div class="meta">
								<span id="date">
									{#if modified?.length && last(modified) !== date}
										<em>Created:</em>
									{/if}
									{prettyDate(adjustDate(date))}
								</span>
								{#if modified?.length && last(modified) !== date}
									<span id="modified">
										<em>Last modified: </em>
										{prettyDate(adjustDate(last(modified)))}
									</span>
								{/if}
								{#if tags?.length}
									<span id="tags">
										<em> Tagged with: </em>
										<code>{tags.join(', ')}</code>
									</span>
								{/if}
							</div>
						</div>
					</div>
					<div class="spacer" />
					{#each pairs as pair, index}
						<div
							class="section-wrapper"
							in:fade={{ delay: index * 150 }}
						>
							<div class="section">
								{@html pair.node.outerHTML}
							</div>
						</div>
						{#if pair.footnotes && width > 1000}
							<div
								class="footnotes"
								in:fade={{ delay: index * 150 + 150 }}
							>
								{#each pair.footnotes as footnote}
									<div class="footnote">
										{footnote.index + 1}
										{@html footnote.html}
									</div>
								{/each}
							</div>
						{:else}
							<div class="spacer" />
						{/if}
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

	.article {
		display: grid;
		grid-template-columns: 3fr 1fr;
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

	.section {
		width: 68ch;
	}

	.footnote {
		font-size: 0.8rem;
		margin: 1rem 0;
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
