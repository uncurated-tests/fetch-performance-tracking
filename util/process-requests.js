import perfHooks from 'node:perf_hooks'
import { postDurationMetric } from './datadog.js';
export default async function processRequests (url, res) {
    const now = perfHooks.performance.now();

    const requests = [];
    for (let i = 0; i < 10; i++) {
        requests.push(fetch(url));
    }
    
    const responses = await Promise.all(requests);
    await Promise.all(responses.map(response => response.text()));

    const resources = perfHooks.performance.getEntriesByName(url);
    const durations = resources.filter(resource => resource.startTime > now).map(resource => resource.duration);
    const average = durations.reduce((duration, sum) => sum + duration, 0) / durations.length;

    await postDurationMetric(durations, url);

    res.send({
        resource: url,
        durations: durations,
        average_duration: average
    });
}