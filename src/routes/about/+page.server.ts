import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export async function load() {
	console.log(fs.readdirSync('.'));
	const __dirname = dirname(fileURLToPath(import.meta.url));

	const paths = fs
		.readFileSync(resolve(__dirname, 'mgh.svg'), 'utf-8')
		.split('\n');

	return {
		paths
	};
}
