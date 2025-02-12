const http = require('http')

http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type' : 'text/plain;charset=UTF-8'})
    res.write("Olá Mundo!")
    res.end()
}).listen(1234)

console.log("Servidor à escuta na porta 1234")