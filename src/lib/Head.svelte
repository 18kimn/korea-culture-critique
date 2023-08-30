<script lang="ts">
	import { page } from '$app/stores';
	export let title: string;
	export let subtitle: string;
	export let twitterUser = '';
	export let imageURL: string;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	{#if subtitle}
		<meta name="twitter:description" content={subtitle} />
		<meta property="og:description" content={subtitle} />
	{/if}
	{#if twitterUser}
		<meta name="twitter:site" content={twitterUser} />
	{/if}
	<meta name="twitter:image" content={imageURL} />
	<meta property="og:image" content={imageURL} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>
