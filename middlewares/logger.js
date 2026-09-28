const fs = require("fs");
const path = require("path");

const logsDir = path.join(
  __dirname,
  "..",
  "logs"
);

const accessLog = path.join(
  logsDir,
  "access.log"
);

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, {
    recursive: true
  });
}

function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration =
      Date.now() - start;

    const log =
      `[${new Date().toISOString()}] ` +
      `${req.method} ${req.originalUrl} ` +
      `${res.statusCode} - ${duration}ms\n`;

    fs.appendFile(
      accessLog,
      log,
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );
  });

  next();
}

module.exports = logger;

