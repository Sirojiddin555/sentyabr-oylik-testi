const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(
  __dirname,
  "..",
  "database",
  "data.json"
);

async function readBooks() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeBooks(books) {
  await fs.writeFile(
    filePath,
    JSON.stringify(books, null, 2),
    "utf-8"
  );
}

// TOPSHIRIQ 1 + 3
async function getBooks(query = {}) {
  let books = await readBooks();

  const {
    page = "1",
    limit = "5",
    genre,
    search
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    !Number.isInteger(limitNumber) ||
    limitNumber < 1 ||
    limitNumber > 20
  ) {
    const error = new Error(
      "page and limit must be positive integers (limit max 20)"
    );

    error.status = 400;
    throw error;
  }

  // Genre filter
  if (genre) {
    books = books.filter(
      (book) =>
        book.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  // Search
  if (search) {
    const searchText = search.toLowerCase();

    books = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText)
    );
  }

  const total = books.length;

  const totalPages =
    total === 0
      ? 0
      : Math.ceil(total / limitNumber);

  const start =
    (pageNumber - 1) * limitNumber;

  const data = books.slice(
    start,
    start + limitNumber
  );

  return {
    data,
    meta: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages
    }
  };
}

// TOPSHIRIQ 1
async function getBookById(id) {
  const books = await readBooks();

  return books.find(
    (book) => book.id === id
  );
}

// TOPSHIRIQ 2
async function createBook(bookData) {
  const books = await readBooks();

  const maxId = books.reduce(
    (max, book) => Math.max(max, book.id),
    0
  );

  const newBook = {
    id: maxId + 1,
    title: bookData.title,
    author: bookData.author,
    genre: bookData.genre,
    year: bookData.year,
    price: bookData.price,
    cover: null
  };

  books.push(newBook);

  await writeBooks(books);

  return newBook;
}

module.exports = {
  getBooks,
  getBookById,
  createBook
};

