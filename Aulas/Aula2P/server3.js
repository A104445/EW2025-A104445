const http = require('http')
const meta = require('./aux')
const {url} = require('url')

http.createServer((req,res) => {
    console.log("Method: " + req.method)
    console.log("Url: " + req.url)

    switch(req.method){
        case "GET":           

            switch(req.url){
                case "/data":
                    res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                    res.write("<p>Olá Alex!</p>")
                    res.write(meta.myDateTime())
                    break;
                case "/nome":
                    res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                    res.write("<p>Olá Alex!</p>")
                    res.write(meta.myName())
                    break;
                case "/turma":
                    res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                    res.write("<p>Olá Alex!</p>")
                    res.write(meta.turma)
                    break;
                default : 
                    res.writeHead(404,{'Content-Type' : 'text/html;charset=UTF-8'})
                    break
            }
            break
            
        default : 
            res.writeHead(405,{'Content-Type' : 'text/html;charset=UTF-8'})
            break;
    }

    
}).listen(1234)

console.log("Servidor à escuta na porta 1234")