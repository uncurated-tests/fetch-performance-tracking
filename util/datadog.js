import { request } from 'undici';
/**
 * 
 * @param {string} host 
 * @param {URL} endpoint 
 * @param {number[]} durations 
 */
export async function postDurationMetric (host, endpoint, durations) {
    console.log('host: ', host.toString())
    console.log('resource: ', endpoint.toString())
    const { statusCode, body } = await request('https://api.datadoghq.com/api/v2/series', {
        method: 'POST',
        body: JSON.stringify({
            series: [
                {
                    metric: "fetch.performance.1",
                    type: 0,
                    points: durations.map(duration => ({
                        timestamp: Math.round(new Date().getTime() / 1000),
                        value: duration
                    })),
                    resources: [
                        {
                            name: host.startsWith("localhost") ? "localhost" : host,
                            type: "host",
                        },
                        {
                            name: endpoint.toString(),
                            type: "endpoint"
                        }
                    ]
                },
            ]
        }),
        headers: {
            'DD-API-KEY': process.env.DD_API_KEY,
            'DD-APPLICATION-KEY': process.env.DD_APP_KEY,
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Content-Encoding": "Identity"
        }
    });

    const json = await body.json();
    console.log(`Metrics submitted successfully (Status Code: ${statusCode}). Returned data: ${JSON.stringify(json)}`);
}
