const graphql = require('graphql');
const _ = require('lodash');
let books = require('../controller/books').books
let authors = require('../controller/authors').authors
const { v4: uuid } = require("uuid");

const {GraphQLString, GraphQLID, GraphQLInt, 
  GraphQLObjectType, GraphQLSchema,GraphQLList, GraphQLNonNull} = graphql;

  const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return _.find(authors, { id: parent.authorId });
        },
      },
    }),
  });

  const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          return _.filter(books, { authorId: parent.id });
        },
      },
    }),
  });

  const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          return books;
        },
      },

      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
          return authors;
        },
      },

      book: {
        type: BookType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return _.find(books, { id: args.id });
        },
      },

      author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          return _.find(authors, { id: args.id });
        },
      },
    },
  });

  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      addBook: {
        type: BookType,
        args: {
          title: { type: GraphQLString },
          genre: { type: GraphQLString },
          authorId: { type: GraphQLID },
        },
        resolve(parent, args) {
          let book = {
            id: uuid(),
            title: args.title,
            genre: args.genre,
            authorId: args.authorId,
          };
          books.push(book);
          return book;
        },
      },

      addAuthor: {
        type: AuthorType,
        args: {
          name: { type: GraphQLString },
          age: { type: GraphQLInt },
        },
        resolve(parent, args) {
          let author = {
            name: args.name,
            age: args.age,
            id: uuid(),
          };
          authors.push(author);
          return author;
        },
      },

      editBook: {
        type: BookType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
          title: { type: GraphQLString },
          genre: { type: GraphQLString },
        },
        resolve(parents, args) {
          const index = books.findIndex((b) => b.id === args.id);
          if (index > -1) {
            if (args.name) {
              books[index].title == args.title;
            }
            if (args.genre) {
              books[index].genre == args.genre;
            }
          }
          return books[index];
        },
      },

      deleteBook: {
        type: BookType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve(parent, args) {
          const indexOfBook = books.findIndex((b) => b.id === args.id);
          if (indexOfBook > -1) {
            const deletedBook = books.splice(indexOfBook, 1)[0];
            return deletedBook;
          }
        },
      },
    }),
  });

  module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
  })