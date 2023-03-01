import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import type { FeatureCollection } from 'geojson';
import { simplifyTopology, stringifyTopology } from './helpers';
import { topology } from 'topojson-server';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compressionParams = {
	quantization: 10000,
	simplification: 0.05
};

/** */
async function processShapes() {
	const shapes = (await fs
		.readFile(resolve(__dirname, 'raw/borders.json'), 'utf-8')
		.then((text: string) =>
			JSON.parse(text)
		)) as FeatureCollection;
	const { quantization, simplification } = compressionParams;
	const topo = topology({ dummy: shapes }, quantization);
	const writeDir = resolve(__dirname, '../static');
	const simplified = simplifyTopology(topo, simplification); //@ts-ignore
	const featureString = stringifyTopology(
		simplified,
		{},
		quantization
	);

	await fs.mkdir(writeDir, { recursive: true });
	fs.writeFile(`${writeDir}/borders.json`, featureString);
}

processShapes();
