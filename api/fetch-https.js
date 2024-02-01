import processRequests from '../util/process-requests.js';
export const maxDuration = 10
export default function handler(req, res) {
    const url = new URL('https://example.com');
    processRequests(url, res);
}