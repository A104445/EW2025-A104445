var express = require('express');
var router = express.Router();
const Livro = require('../controllers/livros');

router.get('/', async function(req, res, next) {
  try {
    const data = await Livro.listar(req.query);
    res.status(200).json(data);
  } catch (erro) {
    res.status(500).json({ error: erro.message });
  }
});

router.get('/genres', async (req, res, next) => {
  try {
    const genres = await Livro.getGenres();
    res.json(genres);
  } catch (err) {
    next(err);
  }
});

router.get('/characters', async (req, res, next) => {
  try {
    const characters = await Livro.getCharacters();
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

router.get('/author/:nomeAutor', async (req, res, next) => {
  try {
    const livrosDoAutor = await Livro.listarPorAutor(req.params.nomeAutor);
    res.json(livrosDoAutor);
  } catch (error) {
    next(error);
  }
});


router.post('/', async function(req, res, next) {
  try {
    const livro = await Livro.insert(req.body);
    res.status(201).json(livro);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    const livro = await Livro.delete(req.params.id);
    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const livro = await Livro.update(req.body, req.params.id);
    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    }
    res.json(livro);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) {
      return res.status(404).send('Livro não encontrado');
    }
    res.json(livro);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
