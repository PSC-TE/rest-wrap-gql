const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./model/schema");
// const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

// to use json format for data sending and recieving
const bodyParser = require("body-parser");
app.use(bodyParser.json());


// for connecting with a graphql through localhost port (4000)
const gqlPORT = 4000;
app.listen(gqlPORT, () =>
  console.log(`Server is running gql at : http://localhost:${gqlPORT}`)
);
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true
}))

// for connecting with a rest api through localhost port (5000)
const restPORT = 5000;
app.listen(restPORT, () =>
  console.log(`Server is running rest-api at : http://localhost:${restPORT}`)
);
// for using different rest api routes import and use it 
const bookRoutes = require("./routes/books.js");
app.use("/books", bookRoutes);

const authorRoutes = require("./routes/authors.js");
app.use('/authors', authorRoutes);







// const postRoutes = require("./routes/books.js");
// app.use('/posts', postRoutes)
// Routers
// app.get('/', (req, res) => {
//   console.log(`we are running at port ${PORT}`);
//   res.send(`Hello from homepage`);
// });

// app.get ('/posts' , (req,res)=>{
//   res.send('we are on post request page');

// })
