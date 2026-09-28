function validateBook(req, res, next) {
  const {
    title,
    author,
    genre,
    year,
    price
  } = req.body;

  const errors = [];

  if (
    typeof title !== "string" ||
    title.trim().length < 2
  ) {
    errors.push(
      "title is required (min 2 chars)"
    );
  }

  if (
    typeof author !== "string" ||
    author.trim().length < 2
  ) {
    errors.push(
      "author is required (min 2 chars)"
    );
  }

  const allowedGenres = [
    "Programming",
    "Fiction",
    "History"
  ];

  if (
    typeof genre !== "string" ||
    !allowedGenres.includes(genre)
  ) {
    errors.push(
      "genre must be one of: Programming, Fiction, History"
    );
  }

  if (
    !Number.isInteger(year) ||
    year < 1000 ||
    year > 2026
  ) {
    errors.push(
      "year must be an integer between 1000 and 2026"
    );
  }

  if (
    typeof price !== "number" ||
    price <= 0
  ) {
    errors.push(
      "price must be a positive number"
    );
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors
    });
  }

  next();
}

module.exports = validateBook;

