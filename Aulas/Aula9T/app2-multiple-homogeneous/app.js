const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 15001

// Tratar o pedido ...
app.post('/ficheiro', upload.array('myFile'), function(req, res) {
    console.log("Informação sobre os ficheiros:")
    console.log(JSON.stringify(req.files))
    console.log("Informação sobre os campos textuais:")
    console.log(JSON.stringify(req.body))
    res.send(`<p> Recebi ${req.files.length} ficheiros: ${JSON.stringify(req.body)}</p>`)
})

app.listen(port, () => {
    console.log(`Servidor à escuta na porta ${port}...`)
})



