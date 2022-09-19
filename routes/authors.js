const express = require("express");
const control = require("../controller/authors");

const router = express.Router();

// route to get all the users
router.get("/", control.getAuthors);

router.get("/:id", control.getAuthor);

// route for adding new user
router.post("/", control.addAuthor);

router.patch("/:id", control.updateAuthor);

router.delete("/:id", control.deleteAuthor);

module.exports = router;
