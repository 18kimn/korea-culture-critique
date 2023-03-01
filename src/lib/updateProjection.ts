import { geoOrthographic } from 'd3-geo';
const bounds = {
	type: 'LineString',
	coordinates: [
		[130, 43],
		[125, 33]
	]
};

export const projection = geoOrthographic().rotate([
	-120, -30, -8
]);

/** just mutates a single object instead of creating
 * a new one, so references to the old are updated automatically
 * don't yell at me about mutability
 * */
export function updateProjection(width: number, height: number) {
	projection.fitExtent(
		[
			[0, 0],
			[width, height]
		],
		bounds as any as FeatureCollection
	);
}
