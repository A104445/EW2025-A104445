var express = require("express");
var router = express.Router();
var BookController = require("../controllers/books");

// GET requests
router.get("/", async (req, res) => {
  try {
    const books = await BookController.getAll(req.query);
    res.json(books);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
