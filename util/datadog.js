import { request } from 'undici';

/**
 * 
 * @param {{ endpoint: URL; host: string; temp: 'cold' | 'warm'; }} context 
 * @param {{ first: number[]; second: number[] }} durations 
 */
export async function postDurationMetrics (context, durations) {
    const headers = {
        'DD-API-KEY': process.env.DD_API_KEY,
        'DD-APPLICATION-KEY': process.env.DD_APP_KEY,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Content-Encoding": "Identity"
    };
    const responses = await Promise.all(
        Object.entries(durations).map(
            ([ key, durationList ]) => request('https://api.datadoghq.com/api/v2/series', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    series: [
                        {
                            metric: "fetch.performance.2",
                            type: 0,
                            points: durationList.map(duration => ({
                                timestamp: Math.round(new Date().getTime() / 1000),
                                value: duration
                            })),
                            resources: [
                                {
                                    name: context.host.startsWith("localhost") ? "localhost" : host,
                                    type: "host",
                                },
                                {
                                    name: context.endpoint.toString(),
                                    type: "endpoint"
                                },
                                {
                                    name: context.temp,
                                    type: "temp"
                                },
                                {
                                    name: key,
                                    type: "request_order"
                                }
                            ]
                        },
                    ]
                }),
            })
        )
    );

    for (const response of responses) {
        const json = await response.body.json();
        console.log(`Metrics submitted successfully (Status Code: ${response.statusCode}). Returned data: ${JSON.stringify(json)}`);

    }
}
