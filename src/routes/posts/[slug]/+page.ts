export async function load({ params }) {
	const { slug } = params;
	console.log(slug);
	const promised = import(`../${slug}/index.md`);

	const Post = await promised;
	return {
		Post,
		...Post.metadata
	};
}
