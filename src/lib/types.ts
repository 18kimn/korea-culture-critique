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
	cover?: string;
	postData: any;
	author: string;
}

export interface Heading {
	slug: string;
	level: number;
	title: string;
	children?: Heading[];
}
