<script lang="ts">
	import { animatePaths } from '$lib/animatePaths';
	import { onMount } from 'svelte';

	export let paths: string[];
	let svg: SVGElement;

	onMount(() => {
		animatePaths(svg);
	});
</script>

<div class="mgh">
	<svg
		bind:this={svg}
		width="473"
		height="577"
		viewBox="0 0 473 577"
	>
		{#each paths as path, index}
			<g style="--animation-delay: {200 * index}ms;">
				{@html path}
			</g>
		{/each}
	</svg>
</div>

<style>
	.mgh :global(path) {
		stroke-dasharray: 0 1;
		stroke-dashoffset: 0;
		fill-opacity: 0;
		animation: 500ms ease-in-out var(--animation-delay) 1 normal
			forwards running animateOpacity;
	}

	@keyframes animateOpacity {
		0% {
			fill-opacity: 0;
		}
		100% {
			fill-opacity: 1;
		}
	}
</style>
