import processRequests from '../util/process-requests.js';
export const maxDuration = 20;

/**
 * 
 * @param {import('node:http').IncomingMessage} req 
 * @param {import('node:http').OutgoingMessage} res 
 */
export default async function handler(req, res) {
    await processRequests(req.headers.host, new URL('https://example.com'), res);
}