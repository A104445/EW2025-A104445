var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos');

/* GET home page. */
router.get('/', function(req, res, next) {
  Aluno.list()
   .then(data => res.render('studentsListPage', {'slist': data}
  ))
   .catch(err => res.jsonp(err));
});

router.get('/registo', function(req, res, next) {
  res.status(200).render('studentFormPage')
});

router.post('/registo', function(req, res, next) {
  Aluno.insert(req.body)
  .then(data => {
    console.log("Aluno registado com sucesso", data);
    res.status(201).send("Aluno registado com sucesso!"); // Verifique a resposta no navegador
  })
   .catch(err => res.jsonp(err));
});

router.get('/:id', function(req, res, next) {
  Aluno.findById(req.params.id)
   .then(data => res.jsonp(data))
   .catch(err => res.jsonp(err));
});

router.put('/:id', function(req, res, next) {
  Aluno.update(req.params.id, req.body)
   .then(data => res.jsonp(data))
   .catch(err => res.jsonp(err));
});

router.delete('/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
   .then(data => res.jsonp(data))
   .catch(err => res.jsonp(err));
});

router.put('/:id/tpc/:idTpc', function(req, res, next) {
  Aluno.inverteTpc(req.params.id,req.params.idTpc)
   .then(data => res.jsonp(data))
   .catch(err => res.jsonp(err));
});

module.exports = router;
