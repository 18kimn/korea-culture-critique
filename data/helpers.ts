import type {
	Position,
	Feature,
	FeatureCollection,
	Polygon
} from 'geojson';
import { topology } from 'topojson-server';
import topojson from 'topojson-client';
import type { Objects, Topology } from 'topojson-specification';
import {
	presimplify,
	quantile,
	simplify
} from 'topojson-simplify';
import rewind from '@turf/rewind';

/** Short function to handle simplification and do nothing
 * if needed
 * @param simplification a number representing how many points to keep
 */
export function simplifyTopology(topo: Topology) {
	const indexed = presimplify(topo);
	const simplified = simplify(indexed);
	return simplified;
}

/** Given a multipolygon-based feature topology, wraps each polygon from
 * the topology as its own topology and stringifies the result
 *
 * Essentially prepares the object for writing as a NDJSON object
 */
export function stringifyTopology(
	topo: Topology<Objects<{ [name: string]: any }>>,
	quantization: number
) {
	const copied = JSON.parse(JSON.stringify(topo));

	const shape = topojson.feature(
		copied,
		'dummy'
	) as unknown as FeatureCollection;

	const coords: Position[][][] = [];

	shape.features.forEach((feature) => {
		coords.push((feature.geometry as Polygon).coordinates);
	});

	const featureString = coords
		.map((polygonCoords: Position[][]) => {
			return windAndString(polygonCoords, quantization);
		})
		.join('')
		.trim();
	return featureString;
}

function windAndString(
	polygonCoords: Position[][],
	quantization: number
) {
	const feature = {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: polygonCoords
		}
	} as Feature<Polygon>;

	// rewind() is needed because I believe sf outputs the
	// wrong geoJSON winding order, resulting in the entire world except for
	// my polygon being drawn
	// see https://stackoverflow.com/questions/49311001/d3-js-drawing-geojson-incorrectly for the explanation
	const wound = rewind(feature, { reverse: true });
	const topo = topology({ shape: wound }, quantization);
	const string = JSON.stringify(topo) + '\n';
	return string;
}
