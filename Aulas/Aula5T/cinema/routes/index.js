var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
    { title: 'Engenharia Web 2025',
      nome: "Alexandre",
      curso: "Licenciatura em Engenharia Informática"
    });
});

router.get('/filmes', function(req, res, next) {
  axios.get('http://localhost:3000/filmes')
    .then(resp => {
      res.render('filmes', {lfilmes:resp.data, tit: "Lista de Filmes"})
    })
    .catch(error => {
    console.error(error);
    res.render('error', {error: error});
    });
});

module.exports = router;
