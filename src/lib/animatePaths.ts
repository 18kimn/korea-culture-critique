export function animatePaths(svg: SVGElement) {
	if (!svg) return;
	const paths = svg.querySelectorAll('path');
	paths.forEach((path) => {
		path.style.transition = 'none';
		const length = path.getTotalLength();
		path.style.strokeDasharray = `${length} ${length}`;
		path.style.strokeDashoffset = length.toString();
		path.getBoundingClientRect();
		path.style.transition =
			'stroke-dashoffset 2s ease-in-out, stroke-dasharray 2s ease-in-out';
		path.style.strokeDashoffset = '0';
		path.style.strokeDasharray = `${length} ${length}`;
	});
}
