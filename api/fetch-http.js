import { processRequests } from '../util/process-requests.js';
import { postDurationMetrics } from '../util/datadog.js';
import { isCron } from '../util/isCron.js';

export const maxDuration = 10;

let temp = 'cold';

/**
 * 
 * @param {import('node:http').IncomingMessage} req 
 * @param {import('node:http').OutgoingMessage} res 
 */
export default async function handler(req, res) {
    console.log(req.headers);
    console.log('authorization', req.headers.get('authorization'));

    const context = {
        host: req.headers.host,
        endpoint: new URL('http://example.com'),
        temp,
        isCron: isCron(req.headers.get('authorization'))
    }

    const durations = await processRequests(context);
    await postDurationMetrics(context, durations);

    res.send({
        context,
        durations,
    });

    temp = 'warm';
}