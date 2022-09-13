const express = require('express');
const mongoose = require('mongoose');
const Post = require('../model/post')

const router = express.Router();

/* fake data
const users = [
  {
    firstName: "mike",
    lastName: "tyson",
    age: 40,
  },
  {
    firstName: "boyka",
    lastName: "undisputed",
    age: 30,
  },
];
*/

// all routes are starting here with /users
router.get('/', (req, res)=>{
    console.log(users);
    res.send(users)
})

// for adding new user
router.post('/', (req, res)=>{
    const post = new Post({
      title: req.body.title,
      genre: req.body.genre,
      author: req.body.author,
    });
    post.save()
    .then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json({message:err})
    })
    // users.push(post)
    // console.log(req.body);
    console.log("post route reached");
    // res.send(`user with name ${user.firstName} has been added to the database`)
})

module.exports= router;
 