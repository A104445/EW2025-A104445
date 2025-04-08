var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')

//GET ALL CONTRACTS
router.get('/', function(req, res, next) {
  if (req.query.entidade) {
    Contrato.getContractByEntity(req.query.entidade)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else if (req.query.tipo) {
    Contrato.getContractByType(req.query.tipo)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
  }
  else {
    Contrato.list()
    .then(data => res.status(200).render("contratosListPage", {"conts" : data}))
    .catch(erro => res.status(500).jsonp(erro))
  }
});

router.get('/entidades', function(req, res, next) {
  Contrato.listEntities()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

router.get('/tipos', function(req, res, next) {
  Contrato.listTypes()
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

router.post('/', function(req, res, next) {
  Contrato.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

router.put('/:id', function(req, res, next) {
  Contrato.update(req.body,req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});

router.delete('/:id', function(req, res, next) {
  Contrato.delete(req.params.id)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});



//GET CONTRACT BY ID
router.get('/:id', function(req, res, next) {
  Contrato.findById(req.params.id)
    .then(data => res.status(200).jsonp(data))
    .catch(erro => res.status(500).jsonp(erro))
});




//router.post('/', function(req, res, next) {
//  console.log(req.body)
//  Contrato.insert(req.body)
//    .then(data => res.status(201).jsonp(data))
//    .catch(erro => res.jsonp(erro))
//});
//
//router.put('/:id/tpc/:idTpc', function(req, res, next) {
//  Contrato.inverteTpc(req.params.id, req.params.idTpc)
//    .then(data => res.jsonp(data))
//    .catch(erro => res.jsonp(erro))
//});
//
//router.put('/:id', function(req, res, next) {
//  Contrato.update(req.params.id,req.body)
//    .then(data => res.jsonp(data))
//    .catch(erro => res.jsonp(erro))
//});
//
//router.delete('/:id', function(req, res, next) {
//  Contrato.delete(req.params.id)
//    .then(data => res.jsonp(data))
//    .catch(erro => res.jsonp(erro))
//});


module.exports = router;