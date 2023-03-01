/* Written to learn the Streams API
 * See https://github.com/canjs/can-ndjson-stream/blob/master/can-ndjson-stream.js
 * for the source of this code, as I've made only minor modifications
 * Some hints also from
 * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/cancel and
 * other places on MDN
 */
import { geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import { projection } from '$lib/updateProjection';
import type { Shape } from '$lib/types';

/** translates topojson to render-able geojson */
export function parseTopo(topo: Topology | Shape) {
	const geoFeature = (
		topo.type === 'Topology'
			? feature(topo, topo.objects.shape)
			: topo
	) as Shape;

	geoFeature.properties.path = geoPath(projection)(geoFeature);
	return geoFeature;
}

/** given a fetch response, parses the stream into features that can
 * be placed into the topo */
function streamer(
	response: Response,
	cb: (newElement: any) => void
) {
	if (!response.body) return;
	const reader = response.body.getReader();
	const decoder = new TextDecoder();

	let currentString = '';
	reader
		.read()
		.then(async function process({
			done,
			value
		}): Promise<void> {
			if (done) {
				const element = parseTopo(
					JSON.parse(currentString.trim())
				);
				cb(element);
				reader.cancel();
				// to make TS happy, return empty promise
				return Promise.resolve();
			}

			const newString = decoder.decode(value, { stream: true });
			currentString += newString;
			const lines = currentString.split('\n');

			lines.forEach((line, i) => {
				if (i === lines.length - 1) return;
				// why is trim() necessary here?
				const parsed = JSON.parse(line.trim());
				if (line.length) cb(parseTopo(parsed));
			});
			// the last line of the chunk can never be expected to be complete until
			// the end of the stream is received, so just save it
			currentString = lines[lines.length - 1];

			return reader.read().then(process);
		});
}

function streamData(url: string, cb: (newElement: any) => void) {
	fetch(url)
		.then((response) => streamer(response, cb))
		.catch((err) => console.log(err));
}

export default streamData;
