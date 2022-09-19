const { v4: uuid } = require("uuid");
let authors = require('./authors').authors

let books = [
  {
    title: "Name of the Wind",
    genre: "Fantasy",
    id: uuid(),
    authorId: authors[0].id,
  },
  {
    title: "The Final Empire",
    genre: "Fantasy",
    id: uuid(),
    authorId: authors[1].id,
  },
  { title: "The Long Earth", 
    genre: "Sci-Fi", 
    id: uuid(), 
    authorId: authors[2].id },
  {
    title: "The Hero of Ages",
    genre: "Fantasy",
    id: uuid(),
    authorId: authors[1].id,
  },
  {
    title: "The Colour of Magic",
    genre: "Fantasy",
    id: uuid(),
    authorId: authors[2].id,
  },
  {
    title: "The Light Fantastic",
    genre: "Fantasy",
    id: uuid(),
    authorId: authors[2].id,
  },
];

const getBooks = (req, res) => {
  console.log(`Books in the database: ${books}`);
  res.send(books);
};

const addBook = (req, res) => {
  const book = req.body;

  books.push({ id: uuid(), ...book });

  console.log(`Book with title [${book.title}] added to the database.`);
};

const getBook = (req, res) => {
  const foundBook = books.find((book)=> book.id === req.params.id)
  res.send(foundBook);
};

const deleteBook = (req, res) => {
  books = books.filter((book) => book.id !== req.params.id);
  console.log(`book with id ${req.params.id} has been deleted`);
  res.send(`book with id ${req.params.id} has been deleted`);
};

const updateBook = (req, res) => {
  const book = books.find((bookname) => bookname.id === req.params.id);

  book.title = req.body.title;
  // book.author = req.body.author;
  book.genre = req.body.genre;

  console.log(
    `book title has been updated ${book.title} and genre has been updated to ${book.genre}`
  );
  res.send(
    `book title has been updated ${book.title} and genre has been updated to ${book.genre}`
  );
};

module.exports = { books, getBooks , getBook, addBook, updateBook, deleteBook};