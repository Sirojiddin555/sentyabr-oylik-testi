const express = require("express");

const router = express.Router();

const bookController =
  require("../controllers/book.controller");

const validateBook =
  require("../middlewares/validateBook");

// GET /books
router.get(
  "/books",
  bookController.getBooks
);

// GET /books/:id
router.get(
  "/books/:id",
  bookController.getBookById
);

// POST /books
router.post(
  "/books",
  validateBook,
  bookController.createBook
);

// Debug error
router.get(
  "/debug/error",
  bookController.debugError
);

module.exports = router;

