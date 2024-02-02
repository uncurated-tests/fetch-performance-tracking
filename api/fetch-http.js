import processRequests from '../util/process-requests.js';
export const maxDuration = 10;
export default async function handler(req, res) {
    const host = new URL(req.headers.host);
    const resource = new URL('http://example.com');
    await processRequests(host, resource, res);
}