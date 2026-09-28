const express = require("express");

const logger = require("./middlewares/logger");
const routes = require("./routes/book.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const PORT = 3000;

app.use(logger);

app.use(express.json());

app.use(routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
