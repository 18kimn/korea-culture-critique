<script lang="ts">
	import { onMount } from 'svelte';
	import { updateProjection } from './updateProjection';
	import type { Shape } from './types';
	import { geoPath } from 'd3-geo';
	import { projection } from '$lib/updateProjection';
	import { animatePaths } from '$lib/animatePaths';
	import type { Topology } from 'topojson-specification';
	import { feature } from 'topojson-client';

	let svg: SVGElement;
	let container: HTMLDivElement;
	let width: number;
	let height: number;

	let korea: Shape[] = [];

	onMount(async () => {
		const topos = (await fetch('/borders.json')
			.then((res) => res.text())
			.then((text) =>
				text.split('\n').map((string) => JSON.parse(string))
			)) as Topology[];
		korea = topos.map((topo) => {
			const geoFeature = feature(
				topo,
				topo.objects.shape
			) as Shape;
			geoFeature.properties.path =
				geoPath(projection)(geoFeature);
			return geoFeature;
		});

		const ro = new ResizeObserver(() => {
			if (!svg) return;
			console.log('resizing');
			width = container.clientWidth;
			height = container.clientHeight;
			updateProjection(width, height);
			korea = korea.map((shape) => {
				shape.properties.path = geoPath(projection)(shape);
				return shape;
			});
			animatePaths(svg);
		});

		ro.observe(container);
	});
</script>

<div class="container" bind:this={container}>
	<svg bind:this={svg} {width} {height}>
		{#each korea as shape}
			<path
				style="--animation-delay: {Math.random() *
					korea.length *
					50}ms"
				d={shape.properties.path}
				stroke-width={0.6}
				stroke="#000000"
				fill="skyblue"
			/>
		{/each}
	</svg>
</div>

<style>
	.container,
	svg {
		width: 100%;
		height: 100%;
	}

	.container {
		position: relative;
	}
	svg {
		position: absolute;
		top: 0;
		left: 0;
	}

	path {
		opacity: 0;
		animation: 3000ms ease-in-out var(--animation-delay) 1 normal
			forwards running animateOpacity;
	}

	@keyframes animateOpacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
