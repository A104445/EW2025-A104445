const http = require('http')
const axios = require('axios')
const {url} = require('url')

http.createServer((req,res) => {
    console.log("Method: " + req.method)
    console.log("Url: " + req.url)

    switch(req.method){
        case "GET":           

            if(req.url == "/cidades"){
                    axios.get("http://localhost:3000/cidades?_sort=nome")
                        .then(resultado => {
                            res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                            var cidades = resultado.data
                            res.write('<h1>Cidades</h1>')
                            res.write('<ul>')
                                cidades.forEach(element => {
                                    res.write(`<li><a href=/cidades/${element.id}>${element.nome}</li>`)
                                });
                            res.write('</ul>')
                            res.end()
                        })
                        .catch(err => {
                            res.writeHead(500,{'Content-Type' : 'text/html;charset=UTF-8'})
                            console.log(err)
                            res.end()
                        })
                    
                }else if(req.url.match(/\/cidades\/.+/)){
                    var id = req.url.split("/")[2]
                    axios.get("http://localhost:3000/cidades?_sort=nome")
                        .then(resultado => {
                            res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                            var cidades = resultado.data
                            res.write(`<h1>${cidades.nome}</h1>`)
                            res.write(`<pre>${JSON.stringify(cidade)}</pre>`)
                            res.write(`<h6><a href=/cidades>'Voltar</h6>`)
                            res.end()
                        })
                        .catch(err => {
                            res.writeHead(500,{'Content-Type' : 'text/html;charset=UTF-8'})
                            console.log(err)
                            res.end()
                        })                    
                }else{
                //case "/ligacoes":
                    res.writeHead(501,{'Content-Type' : 'text/html;charset=UTF-8'})
                    res.end()
            }
    }    
}).listen(1234)

console.log("Servidor à escuta na porta 1234")