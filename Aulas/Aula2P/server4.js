const http = require('http')
const axios = require('axios')
const {url} = require('url')

http.createServer((req,res) => {
    console.log("Method: " + req.method)
    console.log("Url: " + req.url)

    switch(req.method){
        case "GET":           

            switch(req.url){
                case "/cidades" : 
                    axios.get("http://localhost:3000/cidades?_sort=nome")
                        .then(resultado => {
                            res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                            var cidades = resultado.data
                            res.write('<h1>Cidades</h1>')
                            res.write('<ul>')
                                cidades.forEach(element => {
                                    res.write(`<li>${element.nome}</li>`)
                                });
                            res.write('</ul>')
                            res.end()
                        })
                        .catch(err => {
                            res.writeHead(500,{'Content-Type' : 'text/html;charset=UTF-8'})
                            console.log(err)
                            res.end()
                        })
                    break;
                case "/ligacoes":
                    res.writeHead(501,{'Content-Type' : 'text/html;charset=UTF-8'})
                    res.end()
                    break;
                    
                default : 
                    res.writeHead(404,{'Content-Type' : 'text/html;charset=UTF-8'})
                    res.end()
                    break
            }
            break
            
        default : 
            res.writeHead(405,{'Content-Type' : 'text/html;charset=UTF-8'})
            break;
    }

    
}).listen(1234)

console.log("Servidor à escuta na porta 1234")