import perfHooks from 'node:perf_hooks'
import { postDurationMetric } from './datadog.js';

/**
 * 
 * @param {string} host 
 * @param {URL} endpoint 
 * @param {import('node:http').OutgoingMessage} res 
 */
export default async function processRequests (host, endpoint, res) {
    const now = perfHooks.performance.now();

    const requests = [];
    for (let i = 0; i < 10; i++) {
        requests.push(fetch(endpoint));
    }
    
    const responses = await Promise.all(requests);
    await Promise.all(responses.map(response => response.text()));

    const entries = perfHooks.performance.getEntriesByName(endpoint);
    const durations = entries.filter(entry => entry.startTime > now).map(entry => entry.duration);

    await postDurationMetric(host, endpoint, durations);

    res.send({
        endpoint,
        durations,
    });
}