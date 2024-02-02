import { request } from 'undici';
export async function postDurationMetric (durations, url) {
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
                            name: process.env.VERCEL_ENV === 'development' ? 'localhost' : process.env.VERCEL_URL,
                            type: "host",
                        },
                        {
                            name: url,
                            type: "url"
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
