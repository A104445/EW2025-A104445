var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')

//GET ALL CONTRACTS
router.get('/', function(req, res, next) {
  if (req.query.entidade) {
    Contrato.getContractByEntity(req.query.entidade)
    .then(data => res.status(200).render("contratosListPage", {"conts" : data}))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else if (req.query.tipo) {
    Contrato.getContractByType(req.query.tipo)
    .then(data => res.status(200).render("contratosListPage", {"conts" : data}))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else {
    Contrato.list()
    .then(data => res.status(200).render("contratosListPage", {"conts" : data}))
    .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/entidades/:nipc', function(req, res, next) {
  Contrato.findByNipc(req.params.nipc)
  .then(data => {
    res.render('contratoEntidade', { 
      entidade: data[0].entidade_comunicante,
      nipc: data[0].NIPC_entidade_comunicante,
      contratos: data
    });
  })
  .catch(erro => res.status(500).jsonp(erro));
});

router.get('/entidades', function(req, res, next) {
  Contrato.listEntities()
    .then(data => res.status(200).render("contratosEntidadePage", {"conts" : data}))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/tipos', function(req, res, next) {
  Contrato.listTypes()
    .then(data => res.status(200).render("contratosTipoPage", {"conts" : data}))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/registo', function(req, res, next) {
  res.status(200).render("contratosFormPage")
});

router.post('/registo', function(req, res, next) {
  Contrato.insert(req.body)
    .then(data => res.status(201).redirect('/contratos'))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/edit/:id', function(req, res, next) {
  Contrato.findById(req.params.id)
   .then(data => res.status(200).render('contratosFormEditPage',{'conts': data}))
   .catch(err => res.jsonp(err));
});

router.post('/edit/:id', function(req, res, next) {
  Contrato.update(req.body,req.params.id)
    .then(data => res.status(201).redirect('/contratos'))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/delete/:id', function(req, res, next) {
  Contrato.delete(req.params.id)
    .then(data => res.status(201).redirect('/contratos'))
    .catch(erro => res.status(500).jsonp(erro))
});

//GET CONTRACT BY ID
router.get('/:id', function(req, res, next) {
  Contrato.findById(req.params.id)
    .then(data => res.status(200).render("contratoPage", {"contrato" : data}))
    .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;