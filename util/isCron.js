/**
 * 
 * @param {string} authorization 
 * @returns 
 */
export function isCron (authorization) {
    return authorization === `Bearer ${process.env.CRON_SECRET}`;
}