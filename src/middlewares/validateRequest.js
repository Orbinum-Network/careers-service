const { CORS_ORIGINS, HOST_IP } = require('../config/envs');
const logEntry = require('../utils/logEntry');

const allowedOrigins = (CORS_ORIGINS || '').split(',').map(origin => origin.trim());

const validateRequest = (req, res, next) => {
    const origin = req.headers.origin;
    const ip = req.ip || req.connection.remoteAddress;
    
    if (origin) {
        if (allowedOrigins.includes(origin)) {
            next();
        } else {
            logEntry(`Invalid Origin: ${origin}, IP: ${ip}`);
            res.status(403).send('Forbidden');
        }
    } else if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1' || ip === HOST_IP) {
        next();
    } else {
        logEntry(`Not Local: IP: ${ip}`);
        res.status(403).send('Forbidden');
    }
};

module.exports = validateRequest;