var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1:27017/livros'

mongoose.connect(mongoDB, {
  serverSelectionTimeoutMS: 60000, // 60 segundos
  socketTimeoutMS: 60000,         // 60 segundos para o socket
  useNewUrlParser: true,          // Usar o novo parser de URL
  useUnifiedTopology: true       // Usar o novo mecanismo de topo de conexão
});
var db =  mongoose.connection

db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB'))
db.once('open',() => console.log('Conexão ao MongoDB realizada com sucesso'))

var livrosRouter = require('./routes/livros');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', livrosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
