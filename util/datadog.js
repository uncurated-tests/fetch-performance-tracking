import { client, v2 } from "@datadog/datadog-api-client";

const configuration = client.createConfiguration();
const apiInstance = new v2.MetricsApi(configuration);

export function postDurationMetric (durations) {
    apiInstance
        .submitMetrics({
            body: {
                series: [
                    {
                        metric: "fetch.performance.1",
                        type: 0,
                        points: durations.map(duration => ({
                            timestamp: Date.now(),
                            value: duration
                        })),
                    }
                ]
            }
        })
        .then(data => {
            console.log(`Metrics submitted successfully. Returned data: ${JSON.stringify(data)}`)
        })
        .catch(error => {
            console.error(error)
        });
}