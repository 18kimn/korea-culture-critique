export async function load({ params }) {
	const { slug } = params;
	const promised = import(`../${slug}/index.md`);

	const Post = await promised;
	return {
		Post,
		...Post.metadata
	};
}
