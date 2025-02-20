const { CORS_ORIGINS, HOST_IP } = require('../config/envs');
const invalidRequestLogger = require('../utils/invalidRequestLogger');

const allowedOrigins = (CORS_ORIGINS || '').split(',').map(origin => origin.trim());

const validateRequest = (req, res, next) => {
    const origin = req.headers.origin;

    // Get the client's IP address; this is the IP assigned to the container in Docker.
    const dockerIp = req.ip || req.connection.remoteAddress;

    // Get the 'X-Forwarded-For' header, which contains the real client IP and the Cloudflare proxy IP.
    const clientIp = req.headers['x-forwarded-for'];

    if (origin) {
        if (allowedOrigins.includes(origin)) {
            next();
        } else {
            invalidRequestLogger(`Invalid Origin: ${origin}, DOCKERIZED IP: ${dockerIp}, CLIENT IP: ${clientIp}`);
            res.status(403).send('Forbidden');
        }
    } else if (dockerIp === '127.0.0.1' || dockerIp === '::1' || dockerIp === '::ffff:127.0.0.1' || dockerIp === HOST_IP) {
        next();
    } else {
        invalidRequestLogger(`Not Local: DOCKERIZED IP: ${dockerIp}, CLIENT IP: ${clientIp}`);
        res.status(403).send('Forbidden');
    }
};

module.exports = validateRequest;