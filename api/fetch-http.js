import processRequests from '../util/process-requests.js';
export const maxDuration = 10;
export default async function handler(req, res) {
    await processRequests(req.headers.host, 'http://example.com', res);
}