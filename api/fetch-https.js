import { processRequests } from '../util/process-requests.js';
import { postDurationMetrics } from '../util/datadog.js';
export const maxDuration = 20;

let temp = 'cold';

/**
 * 
 * @param {import('node:http').IncomingMessage} req 
 * @param {import('node:http').OutgoingMessage} res 
 */
export default async function handler(req, res) {
    const context = {
        host: req.headers.host,
        endpoint: new URL('https://example.com'),
        temp
    }

    const durations = await processRequests(context);
    await postDurationMetrics(context, durations);

    res.send({
        context,
        durations,
    });

    temp = 'warm';
}