export type Image = {
	url: string;
	caption: string;
	index: number;
};

export function getImages(): Image[] {
	const container = document.querySelector('.article-shadow');
	if (!container) return [];
	const images = [...container.querySelectorAll('p:has(img)')];
	if (!images) return [];
	return images.map((el) => {
		const index = [...container.children].findIndex(
			(item) => item === el
		);
		const image = {
			url: (el.children[0] as HTMLImageElement).src,
			caption: (el.children[0] as HTMLImageElement).alt,
			index
		};
		el.remove();
		return image;
	});
}
