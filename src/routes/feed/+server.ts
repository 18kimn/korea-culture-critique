import { dirname, basename } from 'path';
import type { Post } from '$lib/types';
const siteURL = 'https://korea-culture-critique.org/';
const siteTitle = 'Korea · Culture · Critique';
const siteDescription =
	'Commentary on Korean culture from a critical left perspective';

/** produces formatted XML string for rss feed */
function render(posts: Post[]) {
	const postXML = posts
		.map(({ path, author, title, subtitle, created }) => {
			const slug = `${basename(dirname(path))}/${basename(
				path
			)}`;

			return `
      <entry>
        <title>${title}</title>
        <link rel="alternate" href="${siteURL}${slug}"/>
        <id>${siteURL}${slug}</id>
        ${subtitle ? `<summary>${subtitle}</summary>` : ''}
        <published>${new Date(created).toUTCString()}</published>
      </entry>
      `;
		})
		.join('');
	return `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${siteTitle}</title>
      <subtitle>${siteDescription}</subtitle>
      <link rel="self" href="${siteURL}" />
      <author>
        <name>Nathan Kim and Ji-hye Rhee</name>
        <email>nathanckim18@gmail.com</email>
        <uri> https://korea-culture-critique.org </uri>
      </author>
      <rights>All rights reserved ${new Date().getFullYear()}, Nathan Kim and Ji-hye Rhee</rights>
      ${postXML}
    </feed>
`;
}

/** on request, imports and delivers all of the markdown files */
export async function GET() {
	const paths = import.meta.glob('../posts/*/index.md');
	const posts: Post[] = await Promise.all(
		Object.entries(paths).map(async ([fullPath, resolver]) => {
			const { metadata } = await resolver();
			const path = fullPath.slice(2, 0 - 'index.md'.length);
			return { ...metadata, path };
		})
	).then((posts) => {
		return posts.sort(
			(a, b) => Date.parse(b.date) - Date.parse(a.date)
		);
	});

	const body = render(posts);
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};

	return new Response(body, { headers });
}
