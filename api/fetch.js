import perfHooks from 'node:perf_hooks'
export default function handler(req, res) {
    const url = new URL('http://example.com')
    fetch(url)
        .then(res => res.text()) // necessary to flush response to get PerformancyEntry
        .then(() => {
            const resources = perfHooks.performance.getEntriesByName(url);
            res.send({
                duration: resources[0]?.duration
            })
        })
}