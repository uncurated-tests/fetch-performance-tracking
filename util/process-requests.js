import perfHooks from 'node:perf_hooks'

/**
 * 
 * @param {URL} endpoint 
 */
async function executeRequests(endpoint) {
    const now = perfHooks.performance.now();

    const requests = [];
    for (let i = 0; i < 5; i++) {
        requests.push(fetch(endpoint));
    }

    const responses = await Promise.all(requests);
     // consuming response body is necessary to get timing
    await Promise.all(responses.map(response => response.text()));

    const entries = perfHooks.performance.getEntriesByName(endpoint);

    const durations = []
    for (const entry of entries) {
        if (entry.startTime > now) {
            durations.push(entry.duration)
        }
    }
    return durations;
}

/**
 * 
 * @param {{ endpoint: URL; host: string; temp: 'cold' | 'warm'; isCron: boolean; }} context 
 * @returns {Promise<{ first: number[]; second: number[] }>}
 */
export async function processRequests (context) {
    const first = await executeRequests(context.endpoint);
    const second = await executeRequests(context.endpoint);

    return { first, second };
}
