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

export interface Post {
	created: string | Date;
	title: string;
	subtitle: string;
	path: string;
	modified?: string[];
	content?: string;
	postData: any;
	author: string;
}
