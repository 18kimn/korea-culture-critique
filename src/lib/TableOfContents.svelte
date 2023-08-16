<script lang="ts">
	import type { Heading } from "./types";

    export let headings: Heading[] = []
</script>

<div>
    <ol>
    {#each headings as heading}
        <li>
            <a href={heading.slug}>{heading.title}</a>
            {#if heading.children}
                <svelte:self headings={heading.children} />
            {/if}
        </li>
    {/each}
    </ol>
</div>