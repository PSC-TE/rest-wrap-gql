const express = require('express');
// const mongoose = require('mongoose');
// const Post = require('../model/post')
const control = require('../controller/books')

const router = express.Router();



// route to get all the users
router.get('/', control.getBooks);

router.get('/:id', control.getBook);

// route for adding new user
router.post('/', control.addBook);

router.patch('/:id',control.updateBook);

router.delete('/:id', control.deleteBook);

module.exports= router;
 