<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { updateProjection } from './updateProjection';
	import type { Shape } from './types';
	import { geoPath } from 'd3-geo';
	import { projection } from '$lib/updateProjection';
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
			width = container.clientWidth;
			height = container.clientHeight;
			updateProjection(width, height);
			korea = korea.map((shape) => {
				shape.properties.path = geoPath(projection)(shape);
				return shape;
			});
		});
		container && ro.observe(container);
		return () => ro.disconnect();
	});
</script>

<div class="container" bind:this={container}>
	<svg bind:this={svg} {width} {height}>
		{#each korea as shape, index}
			<path
				in:fade={{ delay: 2 * index, duration: 1000 }}
				d={shape.properties.path}
				fill="#0085ca"
				stroke="#0085ca"
				stroke-width="1"
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
</style>
