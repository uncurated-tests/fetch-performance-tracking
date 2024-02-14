import { processRequests } from '../util/process-requests.js';
import { postDurationMetrics } from '../util/datadog.js';
export const maxDuration = 10;

let temp = 'cold';

/**
 * 
 * @param {import('node:http').IncomingMessage} req 
 * @param {import('node:http').OutgoingMessage} res 
 */
export default async function handler(req, res) {
    console.log(req.headers);
    console.log('x-vercel-deployment-url', req.headers['x-vercel-deployment-url']);
    console.log('host', req.headers['host']);

    const context = {
        host: req.headers.host,
        endpoint: new URL('http://example.com'),
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