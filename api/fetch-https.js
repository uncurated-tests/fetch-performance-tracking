import processRequests from '../util/process-requests.js';
export const maxDuration = 20;
export default async function handler(req, res) {
    const url = new URL('https://example.com');
    await processRequests(url, res);
}