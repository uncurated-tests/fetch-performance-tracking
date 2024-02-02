import processRequests from '../util/process-requests.js';
export const maxDuration = 10;
export default async function handler(req, res) {
    const url = new URL('http://example.com');
    await processRequests(url, res);
}