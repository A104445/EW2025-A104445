const http = require('http')
const meta = require('./aux')
const {url} = require('url')

http.createServer((req,res) => {
    console.log("Method: " + req.method)
    console.log("Url: " + req.url)

    res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
    res.write("<p>Olá Alex!</p>")

    switch(req.url){
        case "/data":
            res.write(meta.myDateTime())
            break;
        case "/nome":
            res.write(meta.myName())
            break;
        case "/turma":
            res.write(meta.turma)
            break;
        default : break
    }

    res.end()
}).listen(1234)

console.log("Servidor à escuta na porta 1234")