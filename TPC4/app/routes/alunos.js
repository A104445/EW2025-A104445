var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  axios.get('http://localhost:3000/alunos?sort=name')
    .then(resp => {
      res.status(200).render('studentsListPage', {'slist': resp.data, 'data': date});
      })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
});
router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  axios.get('http://localhost:3000/alunos?sort=name')
    .then(resp => {
      res.status(200).render('studentsListPage', {'slist': resp.data, 'data': date});
      })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
});
router.post('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  var result = req.body;
  axios.get('http://localhost:3000/alunos?sort=name')
    .then(resp => {
      console.log(resp.data);
      res.status(200).render('studentsListPage', {'slist': resp.data, 'data': date});
      })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
});

module.exports = router;
