import { createServer } from 'http'
const axios = require('axios')
import {genMainPage,genRepPage} from './mypages.js'
import {readFile} from 'js'

createServer(function (req, res) {
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method + " " + req.url + " " + d)

    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write(genMainPage(d))
        res.end()
    }
    else if(req.url == '/reps'){
        axios.get('http://localhost:3000/reparacoes')
            .then(function(resp){
                var reps = resp.data
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(genMainPage(reps,d))
                res.end
            })
            .catch(err => {
                console.log(err)
                res.writeHead(500,{'Content-Type' : 'text/html;charset=UTF-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + err + '</p>')
            })
    }
    else if(req.url.match(/w3\.css$/)){
        readFile("w3.css",function(erro,dados){
            if(erro){
                res.writeHead(404,{'Content-Type' : 'text/html;charset=UTF-8'})
                res.end('<p>Erro na leitura do ficheiro: ' + erro + '</p>')
            }
            else{
                res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
                res.end()
            })
            }
        })
    }

}.listen(3017))
console.log("Servidor à escuta na porta 3017...")