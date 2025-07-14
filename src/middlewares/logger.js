const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logDir = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const logFilePath = path.join(logDir, 'app.log');

const log = (level, message, meta = {}) => {
  const entry = JSON.stringify({ ts: new Date().toISOString(), level, message, ...meta }) + '\n';
  fs.appendFile(logFilePath, entry, (err) => {
    if (err) process.stderr.write(`LOGGER WRITE ERROR: ${err.message}\n`);
  });
};

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    log('INFO', 'HTTP_ACCESS', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: Date.now() - start,
    });
  });
  next();
};

module.exports = { log, loggerMiddleware };
//plag 