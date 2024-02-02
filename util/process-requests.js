import perfHooks from 'node:perf_hooks'
import { postDurationMetric } from './datadog.js';
export default async function processRequests (host, resource, res) {
    const now = perfHooks.performance.now();

    const requests = [];
    for (let i = 0; i < 10; i++) {
        requests.push(fetch(resource));
    }
    
    const responses = await Promise.all(requests);
    await Promise.all(responses.map(response => response.text()));

    const entries = perfHooks.performance.getEntriesByName(resource);
    const durations = entries.filter(entry => entry.startTime > now).map(entry => entry.duration);

    await postDurationMetric(host, resource, durations);

    res.send({
        resource,
        durations,
    });
}