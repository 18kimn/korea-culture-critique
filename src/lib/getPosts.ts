export async function load() {
	const posts = await Promise.all(
		Object.entries(
			import.meta.glob('../routes/posts/*/*md')
		).map(async ([path, resolver]) => {
			const meta = (await resolver()).metadata;
			// the '/routes/posts' at beginning and 'index.md' or '.md' at end need to be chopped off
			const start = '../routes/posts/'.length;
			const postPath = path.slice(start, 0 - 'index.md'.length);
			return {
				...meta,
				path: postPath
			};
		})
	);

	return {
		posts
	};
}
