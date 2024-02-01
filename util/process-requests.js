import perfHooks from 'node:perf_hooks'
export default function processRequests (url, res) {
    const requests = [];
    for (let i = 0; i < 10; i++) {
        requests.push(fetch(url));
    }
    
    Promise.all(requests)
        .then(responses => Promise.all(responses.map(response => response.text())))
        .then(() => {
            const resources = perfHooks.performance.getEntriesByName(url);
            const durations = resources.map(resource => resource.duration);
            const average = durations.reduce((duration, sum) => sum + duration, 0) / durations.length;
            res.send({
                resource: url,
                durations: durations,
                average_duration: average
            });
        });
}