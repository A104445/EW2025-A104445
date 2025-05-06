var express = require('express');
var router = express.Router();
var multer = require('multer')
var jsonfile = require('jsonfile')
var fs = require('fs')
var File = require('../controller/file')

var upload = multer({dest : 'uploads'})

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0,16);

  File.findAll()
    .then(filelist => res.render('index', {files : filelist, date : date}))
    .catch(err => res.render('error', {error : err}))
});

router.post('/files', upload.array('myFile') , async (req, res)=> {
  if(req.files.length > 1){
    req.files.forEach(async (elem, i) => {
      saveFile(elem, req.body.filename[i])
    })
  }else{
    saveFile(req.files[0], req.body.filename)
  }

  res.redirect('/')
})

router.get('/fileContent/:name', (req, res) => {
  console.log(__dirname + '/../public/fileStore/' + req.params.name)
  var content = fs.readFileSync(__dirname + '/../public/fileStore/' + req.params.name)
  res.send(content)
})

router.get('/download/:name', (req, res) => {
  console.log(__dirname + '/../public/fileStore/' + req.params.name)
  res.download(__dirname + '/../public/fileStore/' + req.params.name)
})


saveFile = async (file, filenameIn) => {
  var filenameArray = file.originalname.split('.')
  var extension = filenameArray[filenameArray.length - 1]
  var filename = filenameIn + '.' + extension

  console.log({extension})
  console.log({filename})
  console.log('cdir: ', __dirname);
  var oldPath = __dirname + '/../' + file.path
  console.log('old: ', oldPath)
  var newPath = __dirname + '/../public/fileStore/' + filename
  console.log('new: ', newPath)

  fs.rename(oldPath, newPath, err => {
    if(err) throw err;
  })

  await File.save(file, filename)
}

module.exports = router;
