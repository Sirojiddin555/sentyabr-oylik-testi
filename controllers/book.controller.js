const bookService = require("../services/book.service");

async function getBooks(req, res, next) {
  try {
    const result = await bookService.getBooks(
      req.query
    );

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta
    });
  } catch (error) {
    next(error);
  }
}


async function getBookById(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      const error = new Error("Invalid book id");
      error.status = 400;
      throw error;
    }

    const book =
      await bookService.getBookById(id);

    if (!book) {
      const error =
        new Error("Book not found");

      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
}



async function createBook(req, res, next) {
  try {
    const book =
      await bookService.createBook(req.body);

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
}


function debugError(req, res, next) {
  next(new Error("Test server error"));
}

module.exports = {
  getBooks,
  getBookById,
  createBook,
  debugError
};
