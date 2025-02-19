const fs = require('fs');
const path = require('path');

const logEntry = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n`;
    const logDir = path.join(__dirname, 'logs');
    const logFilePath = path.join(logDir, 'invalid_requests.log');

    fs.mkdir(logDir, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating log directory:', err);
            return;
        }

        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });
    });
}

module.exports = logEntry;