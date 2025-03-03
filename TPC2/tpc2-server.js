const http = require('http')
const axios = require('axios')
const {url} = require('url')
const { genMainPage, genAlunosPage, genAlunoPage, genCursosPage, genAlunosPorCursoPage, genInstrumentosPage, genAlunosPorInstrumentoPage } = require('./pages.js');
const fs = require('fs');

http.createServer((req,res) => {
    console.log("Method: " + req.method)
    console.log("Url: " + req.url)         
        
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genMainPage())
        res.end()
    }
    else if(req.url == '/alunos'){
        axios.get("http://localhost:3000/alunos")
            .then(resultado => {
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                var alunos = resultado.data
                res.write(genAlunosPage(alunos))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'})
                    console.log(err)
                    res.end()
                }
            })
    }
    else if(req.url.startsWith("/alunos?id=")){
        let id = req.url.split("?id=")[1]
        axios.get(`http://localhost:3000/alunos?id=${id}`)
            .then(resultado => {
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                res.write(genAlunoPage(id,resultado.data))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'})
                    res.end('<p>Erro ao obter os dados dos alunos.</p>')
                }
            })
    }
    else if(req.url == '/cursos'){
        axios.get("http://localhost:3000/alunos")
            .then(resultado => {
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                var alunos = resultado.data
                res.write(genCursosPage(alunos))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'})
                    console.log(err)
                    res.end()
                }
            })
    }
    else if(req.url.startsWith("/cursos?curso=")){
        let curso = req.url.split("?curso=")[1]
        axios.get(`http://localhost:3000/alunos?curso=${curso}`)
            .then(resultado => {
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                res.write(genAlunosPorCursoPage(curso, resultado.data))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'})
                    res.end('<p>Erro ao obter os dados dos alunos.</p>')
                }
            })
    }
    else if(req.url == '/instrumentos'){
        axios.get("http://localhost:3000/alunos")
            .then(resultado => {
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                var alunos = resultado.data
                res.write(genInstrumentosPage(alunos))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'})
                    console.log(err)
                    res.end()
                }
            })
    }
    else if(req.url.startsWith("/instrumentos?instrumento=")){
        let instrumento = decodeURIComponent(req.url.split("?instrumento=")[1])
        axios.get(`http://localhost:3000/alunos?instrumento=${instrumento}`)
            .then(resultado => {
                res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'})
                res.write(genAlunosPorInstrumentoPage(instrumento, resultado.data))
                res.end()
            })
            .catch(err => {
                if (!res.headersSent) {
                    res.writeHead(500, {'Content-Type': 'text/html; charset=UTF-8'})
                    res.end('<p>Erro ao obter os dados dos alunos.</p>')
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
}).listen(3002)

console.log("Servidor à escuta na porta 3002")