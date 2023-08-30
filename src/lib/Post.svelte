<script lang="ts">
	import { getFootnotes } from './footnotes';
	import type { Footnote } from './footnotes';
	import { prettyDate, adjustDate } from '$lib/utils/string';
	import { last } from '$lib/utils/misc';
	import { onMount } from 'svelte';
	import type { Post } from './types';
	import makeTOC from './utils/makeTOC';
	import TableOfContents from './TableOfContents.svelte';
	import Head from './Head.svelte';
	import { page } from '$app/stores';

	let rows: {
		node: Element;
		footnotes?: Footnote[];
	}[] = [];
	let nodes: Element[] = [];
	onMount(() => {
		const footnotes = getFootnotes();
		/* After Svelte does an initial (invisible) render, 
    grab that information and represent it with footnotes alongside it*/
		nodes = [
			...(document.querySelector('.article-shadow')
				?.children as HTMLCollection)
		];

		rows = nodes.map((node) => {
			const footnoteReferences =
				node.querySelectorAll('[id^="fn-"]');
			if (!footnoteReferences?.length)
				return {
					node
				};
			const footnoteIDs = [...footnoteReferences].map(
				(el) => `#${el.id}`
			);
			const containingFootnotes = footnotes.filter((footnote) =>
				footnoteIDs.includes(footnote.href)
			);
			return {
				node,
				footnotes: containingFootnotes
			};
		});
	});

	function insertElement(
		target: Element,
		{ elm }: { elm: Element | Element[] }
	) {
		if (!Array.isArray(elm)) elm = [elm];
		elm.forEach((el) =>
			target.insertAdjacentElement('afterbegin', el)
		);
	}

	export let data = {} as Post;
	let width: number;

	$: ({ title, subtitle, modified, created, author, cover } =
		data);
	$: displayTitle = `${title} ⋅ Korea, Culture, Critique`;
	$: twitterUser =
		author === 'Ji-hye Rhee' ? '@rheedacted' : '@nathanckim';
	$: imageURL = cover
		? `${$page.url.origin}/images/${$page.params.slug}/${cover}`
		: '';
</script>

<svelte:window bind:innerWidth={width} />
<Head title={displayTitle} {subtitle} {twitterUser} {imageURL} />
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
							<div class="section-content">
								<div class="title">
									<h1>{@html title}</h1>
									{#if subtitle}<h2>{subtitle}</h2>{/if}
								</div>
								<div class="meta">
									<div class="line">
										<p>{author}</p>
										<p id="date">
											{#if modified?.length && last(modified) !== created}
												<em>Created:</em>
											{/if}
											{prettyDate(adjustDate(created))}
										</p>
										{#if modified?.length && last(modified) !== created}
											<span id="modified">
												<em>Last modified: </em>
												{prettyDate(adjustDate(last(modified)))}
											</span>
										{/if}
									</div>
								</div>
								<div class="table-of-contents">
									<em>In this post:</em>
									<TableOfContents headings={makeTOC(nodes)} />
								</div>
							</div>
						</div>
					</div>
					<div class="spacer" />
					{#each rows as row}
						<div class="row">
							<div class="section-wrapper">
								<div class="section-content">
									<div
										use:insertElement={{
											elm: row.node
										}}
									/>
								</div>
							</div>
							{#if width > 1000}
								<div class="sidebar-content">
									{#if row.footnotes}
										<div class="footnotes">
											{#each row.footnotes as footnote}
												<div class="footnote">
													{footnote.index + 1}.
													{@html footnote.html}
												</div>
											{/each}
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

	.section-content {
		overflow-x: auto;
		overflow-wrap: anywhere;
		width: min(80ch, 80vw);
	}

	.sidebar-content {
		min-width: 0;
	}

	.footnotes {
		padding: 0 2rem;
		overflow-wrap: anywhere;
	}

	.footnote,
	:global(.footnote a) {
		font-size: 0.8rem;
		margin: 0.5rem 0;
		max-width: 60ch;
	}

	.meta {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.meta p {
		margin: 0.5rem 0;
	}

	h1 {
		white-space: normal;
		font-size: 2.5rem;
	}

	h1 :global(code) {
		background: none;
	}

	.section-content :global(.heading-link:hover) {
		background: gray;
	}

	.title {
		margin: 2rem 0;
	}
	.title * {
		margin: 0.5rem 0;
	}

	.section-content :global(h2) {
		font-size: 1.5rem;
	}

	.section-content :global(h3) {
		font-size: 1.2rem;
	}

	.section-content :global(a) {
		font-family: var(--font);
		font-size: 1rem;
		margin: 0rem;
		color: #0015ab;
		text-decoration: none;
		transition: all ease-in-out 200ms;
	}

	.section-content :global(a:hover) {
		color: red;
		text-decoration: underline;
	}

	.section-content :global(.heading-link) {
		margin: 0.3rem;
		opacity: 0;
		transition: opacity ease-in-out 200ms;
	}

	.section-content :global(.heading:hover a) {
		opacity: 1;
	}

	.section-content :global(sup a),
	.section-content :global(.backlink) {
		font-size: 0.8rem;
	}

	.section-content :global(pre) {
		font-size: 0.8rem;
		white-space: pre-wrap;
	}

	.section-content :global(.caption) {
		font-size: 0.8rem;
		display: block;
		width: 100%;
		text-align: center;
	}

	.section-content:global(img) {
		width: 100%;
	}

	.section-content:global(iframe) {
		width: 100%;
		height: 100vh;
	}

	.section-content:global(blockquote) {
		background: #ebebeb;
		padding: 1rem;
		margin: 0.5rem 1rem;
		border-left: solid 5px black;
	}

	.section-content:global(blockquote > h1) {
		font-size: 1.3rem;
	}
</style>
