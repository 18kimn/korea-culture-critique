export type Footnote = {
	index: number;
	id: string;
	html: string;
	href: string;
};

export function getFootnotes(): Footnote[] {
	const raw = [
		...document.getElementsByClassName('footnotes')
	][0]?.children;
	if (!raw) return [];
	return [...raw].map((footnote, index) => {
		const a = footnote.querySelector(
			'.backlink'
		) as HTMLAnchorElement;
		return {
			index,
			id: footnote.id,
			html: footnote.innerHTML,
			href: a.getAttribute('href') as string
		};
	});
}
