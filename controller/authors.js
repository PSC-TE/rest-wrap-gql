const { v4: uuid } = require("uuid");

let authors = [
  { name: "Patrick Rothfuss", age: 44, id: uuid() },
  { name: "Brandon Sanderson", age: 42, id: uuid() },
  { name: "Terry Pratchett", age: 66, id: uuid() },
];

const getAuthors = (req, res) => {
  console.log(`Authors in the database: ${authors}`);

  res.send(authors);
};

const addAuthor = (req, res) => {
  const author = req.body;
  authors.push({ id: uuid(), ...author });
  console.log(`Author with name [${author.name}] added to the database.`);
};

const getAuthor = (req, res) => {
  const foundAuthor = authors.find((author) => author.id === req.params.id);
  res.send(foundAuthor);
};

const deleteAuthor = (req, res) => {
  authors = authors.filter((author) => author.id !== req.params.id);
  console.log(`author with id ${req.params.id} has been deleted`);
  res.send(`author with id ${req.params.id} has been deleted`);
 
};

const updateAuthor = (req, res) => {
  const author = authors.find((author) => author.id === req.params.id);

  author.name = req.body.name;
  // book.author = req.body.author;
  author.age = req.body.age;

  console.log(
    `author name has been updated to ${author.name} and age has been updated to ${author.age}`
  );
  res.send(
    `author name has been updated to ${author.name} and age has been updated to ${author.age}`
  );
};

module.exports = { authors, getAuthors, getAuthor, addAuthor, updateAuthor, deleteAuthor };
