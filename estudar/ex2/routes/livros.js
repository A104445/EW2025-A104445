const express = require('express');
const router = express.Router();
const axios = require('axios');

// Página principal com lista de livros
router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get('http://localhost:17000/books');
    const booksRaw = response.data;

    const books = booksRaw.map(book => {
      // Se book.author é array, usa direto. Se não existir, usa array vazio
      const authors = Array.isArray(book.author) ? book.author : [];
    
      return {
        ...book,
        authors
      };
    });    

    res.render('index', { books });
  } catch (error) {
    next(error);
  }
});

// Página de um autor
router.get('/entidades/:idAutor', async (req, res, next) => {
  try {
    const authorName = req.params.idAutor;

    // Faz a chamada para a API no servidor da porta 17000
    const response = await axios.get(`http://localhost:17000/books/author/${encodeURIComponent(authorName)}`);

    const livrosDoAutor = response.data;

    res.render('author', {
      autor: { id: authorName, nome: authorName },
      livros: livrosDoAutor,
      total: livrosDoAutor.length
    });
  } catch (error) {
    next(error);
  }
});

// Página de um livro
router.get('/:id', async (req, res, next) => {
  try {
    const response = await axios.get(`http://localhost:17000/books/${req.params.id}`);
    const book = response.data;
    res.render('book', { book });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
