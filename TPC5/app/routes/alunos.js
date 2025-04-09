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
  res.render('studentFormPage')
});

router.post('/registo', function(req, res, next) {
  Aluno.insert(req.body)
    .then(data => {
      res.redirect('/alunos'); 
    })
    .catch(err => {
      res.status(500).json({ error: "Erro ao inserir aluno" });
    });
});


router.get('/:id', function(req, res, next) {
  Aluno.findById(req.params.id)
   .then(data => res.status(200).render('studentPage',{'student': data}))
   .catch(err => res.jsonp(err));
});

router.get('/edit/:id', function(req, res, next) {
  Aluno.findById(req.params.id)
   .then(data => res.status(200).render('studentFormEditPage',{'student': data}))
   .catch(err => res.jsonp(err));
});

router.post('/edit/:id', function(req, res, next) {
  Aluno.update(req.params.id, req.body)
   .then(data => res.status(201).redirect('/alunos'))
   .catch(err => res.jsonp(err));
});

router.get('/delete/:id', function(req, res, next) {
  res.render('deletePage',{id: req.params.id});
});

router.post('/delete/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
   .then(data => res.status(201).redirect('/alunos'))
   .catch(err => res.jsonp(err));
});

router.get('/:id/tpc/:idTpc', function(req, res, next) {
  Aluno.inverteTpc(req.params.id,req.params.idTpc)
   .then(data => res.status(201).redirect('/alunos'))
   .catch(err => res.jsonp(err));
});

module.exports = router;
