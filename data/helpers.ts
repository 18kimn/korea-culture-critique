import type {
	Position,
	Feature,
	FeatureCollection
} from 'geojson';
import { topology } from 'topojson-server';
import topojson from 'topojson-client';
import type { Topology } from 'topojson-specification';
import {
	presimplify,
	quantile,
	simplify
} from 'topojson-simplify';
import rewind from '@turf/rewind';

interface GeoGroup {
	meta: {
		country?: string;
		region?: string;
		subregion?: string;
		district?: string;
	};
	features: Feature[];
}

/** Short function to handle simplification and do nothing
 * if needed
 * @param simplification a number representing how many points to keep
 */
export function simplifyTopology(
	topo: Topology,
	simplification: number
) {
	//@ts-ignore I could not be bothered
	const indexed = presimplify(topo);
	const simplified = simplify(
		indexed,
		quantile(indexed, simplification)
	);
	return simplified;
}

/** Checks to see if an array of coords is actually just the same coord repeated
 * which (I think) can occur when topojson snaps a multipolygon to all of the same point
 */
function isAllEqual(array: Position[]) {
	const first = array[0];
	return array.every(
		(coord) => coord[0] === first[0] && coord[1] === first[1]
	);
}

/** Given a multipolygon-based feature topology, wraps each polygon from
 * the topology as its own topology and stringifies the result
 *
 * Essentially prepares the object for writing as a NDJSON object
 */
export function stringifyTopology(
	topo: Topology,
	meta: GeoGroup['meta'],
	quantization: number
) {
	const copied = JSON.parse(JSON.stringify(topo));

	const shape = topojson.feature(copied, 'dummy') as
		| Feature
		| FeatureCollection;
	let coords: Position[][][];
	if (shape.type === 'Feature') {
		// @ts-ignore
		coords = shape.geometry.coordinates;
	} else if (shape.type === 'FeatureCollection') {
		// @ts-ignore
		coords = shape.features[0].geometry.coordinates;
	} else {
		throw new Error('unexpected geometry encountered :(');
	}
	// shape.features[0].geometry.coordinates

	const featureString = coords
		.map((polygonCoords) => {
			if (isAllEqual(polygonCoords[0])) return '';
			const feature = {
				type: 'Feature',
				properties: meta,
				geometry: {
					type: 'Polygon',
					coordinates: polygonCoords
				}
			} as Feature;

			// rewind() is needed because I believe sf outputs the
			// wrong geoJSON winding order, resulting in the entire world except for
			// my polygon being drawn
			// see https://stackoverflow.com/questions/49311001/d3-js-drawing-geojson-incorrectly for the explanation
			const wound = rewind(feature as any, { reverse: true });
			const topo = topology({ shape: wound }, quantization);
			return JSON.stringify(topo) + '\n';
		})
		.join('')
		.trim();
	return featureString;
}
