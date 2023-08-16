<script>
    export let caption = ""
    export let src = ""
</script>

<div class="container">
    <div class="image-container">
        <img alt={caption} {src}/>
        <em>{caption}</em>
    </div>
</div>

<style> 
    em {
        width: 100%;
        text-align: center;
        display: block;
    }
    
    .container {
        width: 100%;
        display: flex;
        place-content: center;
    }

	.image-container {
		max-width: min(100%, 50ch);
		max-height: 100%;
	}
    
    img {
        max-width: 100%;
        max-height: 100%;
    }
</style>