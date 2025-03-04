const http = require('http')
const axios = require('axios')
const {url} = require('url')
const { genMainPage, genReparacoesPage, genIntervencoesPage, genMarcasPage, genModelosPage, genModelosMarcaPage } = require('./pages.js');
const fs = require('fs');

http.createServer((req,res) => {
    console.log("Method: " + req.method)
    console.log("Url: " + req.url)         
        
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genMainPage())
        res.end()
    }
    else if(req.url == '/reparacoes'){ 
        axios.get("http://localhost:3000/reparacoes?_sort=nome")
            .then(resultado => {
                res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                var reparacoes = resultado.data
                res.write(genReparacoesPage(reparacoes))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500,{'Content-Type' : 'text/html;charset=UTF-8'})
                    console.log(err)
                    res.end()
                }
            })
    } 
    else if (req.url.startsWith("/reparacoes?nif=")) { 
        let nif = req.url.split("?nif=")[1] 
        axios.get(`http://localhost:3000/reparacoes?nif=${nif}`) 
            .then(resultado => {
                res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
                res.write(genIntervencoesPage(nif, resultado.data)) 
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'text/html;charset=UTF-8' })
                    res.end('<p>Erro ao obter os dados das intervenções.</p>')
                }
            })
    }
    else if(req.url == '/marcas'){ 
        axios.get("http://localhost:3000/reparacoes")
            .then(resultado => {
                res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                var reparacoes = resultado.data
                res.write(genMarcasPage(reparacoes))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500,{'Content-Type' : 'text/html;charset=UTF-8'})
                    console.log(err)
                    res.end()
                }
            })
    }
    else if(req.url == '/modelos'){ 
        axios.get("http://localhost:3000/reparacoes")
            .then(resultado => {
                res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                var reparacoes = resultado.data
                res.write(genModelosPage(reparacoes))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500,{'Content-Type' : 'text/html;charset=UTF-8'})
                    console.log(err)
                    res.end()
                }
            })
    }
    else if(req.url.startsWith ("/modelos?marca=")){ 
        let marca = decodeURIComponent(req.url.split("?marca=")[1])
        axios.get("http://localhost:3000/reparacoes")
            .then(resultado => {
                res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                var reparacoes = resultado.data
                res.write(genModelosMarcaPage(marca,reparacoes))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500,{'Content-Type' : 'text/html;charset=UTF-8'})
                    console.log(err)
                    res.end()
                }
            })
    }
    else if(req.url.match(/w3\.css$/)){
        fs.readFile("w3.css", function(erro, dados){
            if(erro){
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.end(dados)
            }
        }) 
    }              
    else{ 
        res.writeHead(404,{'Content-Type' : 'text/html;charset=UTF-8'})
        res.end()
    }       
}).listen(3001)

console.log("Servidor à escuta na porta 3001")