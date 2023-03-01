export function animatePaths(
	svg: SVGElement,
	useLength?: boolean
) {
	if (!svg) return;
	const paths = svg.querySelectorAll('path');
	paths.forEach((path, index) => {
		path.style.transition = 'none';
		if (useLength) {
			const length = path.getTotalLength();
			path.style.strokeDasharray = `${length} ${length}`;
			path.style.strokeDashoffset = length.toString();
		} else {
			path.style.strokeDasharray = `1000 500`;
		}
		path.getBoundingClientRect();
		path.style.transition = 'stroke-dashoffset 2s ease-in-out';
		setTimeout(() => {
			path.style.strokeDashoffset = useLength ? '0' : '1000';
		}, 100 * index);
	});
}
