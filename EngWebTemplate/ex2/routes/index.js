var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let books = await axios.get('/?fields=_id,title,author,coverImg,price');
  res.render('index', { books: books.data , title: 'Bookstore'});
});

module.exports = router;
