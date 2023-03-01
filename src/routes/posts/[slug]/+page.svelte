<script lang="ts">
	import Post from '$lib/Post.svelte';
	export let data: any;
	const Article = data.Post.default;
</script>

{#if data}
	<Post {data}>
		<Article />
	</Post>
{/if}
