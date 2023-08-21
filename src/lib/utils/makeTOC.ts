import type { Heading } from '$lib/types';

export default function (nodes: Element[]) {
	const headings: Heading[] = (
		nodes.filter((node) =>
			node.tagName.match(/^H([0-9])/)
		) as HTMLHeadingElement[]
	)
		.map((heading) => {
			const level = Number(heading.tagName.replace('H', ''));
			const slug =
				'#' +
				heading.innerText.toLowerCase().replace(/[^\w]+/g, '-');
			return {
				level,
				slug,
				title: heading.innerText
			};
		})
		.reduce((acc, h) => {
			if (!acc.length) return [h];

			const lastElement = acc[acc.length - 1];
			if (lastElement.level > h.level) {
				const newItem = lastElement.children
					? {
							...lastElement,
							children: [...lastElement.children, h]
					  }
					: { ...lastElement, children: [h] };
				return [...acc.slice(0, -1), newItem];
			}

			return [...acc, h];
		}, [] as Heading[]);

	return headings;
}
