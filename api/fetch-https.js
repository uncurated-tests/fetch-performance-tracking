import processRequests from '../util/process-requests.js';
export const maxDuration = 20;
export default async function handler(req, res) {
    await processRequests(req.headers.host, 'https://example.com', res);
}