const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user.js');
require('dotenv/config');

const app = express();
const PORT = 5000;
const DB_connection = process.env.DB_CONNECTION;

// to connect with databse
mongoose.connect(DB_connection , () => console.log("connected to database"));

// to use json format for data sending and recieving
app.use(bodyParser.json());
// for using different rest api routes
app.use('/users', userRoutes);

// for connecting with a localhost port
app.listen(PORT, ()=>console.log(`Server is running at : http://localhost:${PORT}`));

// Routers
app.get(userRoutes, (req, res) => {
  console.log(`we are running at port ${PORT}`);
  res.send(`Hello from homepage`);
});
