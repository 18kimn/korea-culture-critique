import type { Feature, FeatureCollection } from 'geojson';

export interface Shape extends Feature {
	properties: {
		startTime: number;
		path: string | null;
	};
}

export interface Shapes extends FeatureCollection {
	features: Shape[];
}
