var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  axios.get('http://localhost:3000/alunos?sort=nome')
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
  axios.get('http://localhost:3000/alunos?sort=nome')
    .then(resp => {
      res.status(200).render('studentFormPage', {'slist': resp.data, 'data': date});
      })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
});
router.post('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  var result = req.body;
  axios.post('http://localhost:3000/alunos',result)
    .then(resp => {
      //console.log(resp.data);
      // res.status(200).render('studentsListPage', {'slist': resp.data, 'data': date});
      res.status(200).redirect('/alunos');  
      })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
});

router.get('/edit/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  var id = req.params.id;
  axios.get('http://localhost:3000/alunos/' + id)
   .then(resp => {
      res.status(200).render('studentFormEditPage', {'student': resp.data, 'data': date});
      })
   .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
});

router.post('/edit/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  var id = req.params.id;
  var result = req.body;
  axios.put('http://localhost:3000/alunos/' + id, result)
    .then(resp => {
      // res.status(200).render('studentListPage', {'student': resp.data, 'data': date});
      res.status(200).redirect('/alunos');  
    })
    .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
  });

router.get('/delete/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  var id = req.params.id;
  axios.delete('http://localhost:3000/alunos/' + id)
   .then(resp => {
      // res.status(200).render('studentListPage', {'student': resp.data, 'data': date});
      res.redirect('/alunos');  
    })
   .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
  });

router.post('/delete/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  var id = req.params.id;
  axios.delete('http://localhost:3000/alunos/' + id)
   .then(resp => {
      // res.status(200).render('studentListPage', {'student': resp.data, 'data': date});
      res.status(200).redirect('/alunos');  
    })
   .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
    });
  });


router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);
  var id = req.params.id;
  axios.get('http://localhost:3000/alunos/' + id)
   .then(resp => {
      res.status(200).render('studentPage', {'student': resp.data, 'data': date});
      })
   .catch(error => {
      console.error(error);
      res.status(500).render('error', { error: error });
  });
});

module.exports = router;
