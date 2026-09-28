const fs = require("fs");
const path = require("path");

const logsDir = path.join(
  __dirname,
  "..",
  "logs"
);

const errorLog = path.join(
  logsDir,
  "error.log"
);

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, {
    recursive: true
  });
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  // 500 xatolarni error.log ga yozamiz
  if (status >= 500) {
    const log =
      `[${new Date().toISOString()}] ` +
      `ERROR ${req.method} ${req.originalUrl} - ` +
      `${err.message}\n`;

    fs.appendFile(
      errorLog,
      log,
      (error) => {
        if (error) {
          console.error(error);
        }
      }
    );

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }

  // 400/404
  return res.status(status).json({
    success: false,
    message: err.message
  });
}

module.exports = errorHandler;

