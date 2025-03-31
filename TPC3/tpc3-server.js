var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')          
var static = require('./static.js')         

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if(req.url == "/" || req.url == "/alunos"){
                    axios.get("http://localhost:3000/alunos")
                        .then(resp => {
                            var alunos = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentsListPage(alunos, d))
                            res.end()
                        })
                        .catch(error => {
                            console.log(error)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        })
                // GET /alunos/:id --------------------------------------------------------------------
                }else if(req.url.startsWith("/alunos?id=")){
                    let id = req.url.split("?id=")[1]
                    axios.get(`http://localhost:3000/alunos/${id}`)
                        .then(resp => {
                            var aluno = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentPage(aluno, d))
                            res.end()
                        })
                       .catch(error => {
                            console.log(error)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        })
                // GET /alunos/registo --------------------------------------------------------------------
                }else if(req.url == "/alunos/registo"){
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                // GET /alunos/edit/:id --------------------------------------------------------------------
                }else if(req.url.startsWith("/alunos/edit?id=")){
                    let id = req.url.split("?id=")[1]
                    axios.get(`http://localhost:3000/alunos/${id}`)
                        .then(resp => {
                            aluno = resp.data
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(templates.studentFormEditPage(aluno, d))
                            res.end()
                        })
                       .catch(error => {
                            console.log(error)  
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                       })
                // // GET /alunos/delete/:id --------------------------------------------------------------------
                }else if(req.url.startsWith("/alunos/delete?id=")){
                    let id = req.url.split("?id=")[1]
                    axios.delete(`http://localhost:3000/alunos/${id}`)
                    .then(resp => {
                        res.writeHead(302, { 'Location': '/alunos' }) 
                        res.end()
                    })
                     .catch(error => {
                        console.log(error)  
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end()
                    })
                // GET ? -> Lancar um erro
                }else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(`<p>Página não encontrada: ${req.url}</p>`)
                    res.end()
                }
                break
            case "POST":
                // POST /alunos/registo --------------------------------------------------------------------
                if(req.url === "/alunos/registo"){
                    collectRequestBodyData(req, body => {
                        if(body){
                            console.log("Recebido body:", body);
                            axios.post('http://localhost:3000/alunos', body)
                                .then(resp => {
                                    res.writeHead(302, { 'Location': '/alunos' }) 
                                    res.end()
                                })
                                .catch(error => {
                                    console.log(error)  
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end()
                                })
                        }
                        else{
                            console.log("No body data")  
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write()
                        }
                    })
                // POST /alunos/edit/:id --------------------------------------------------------------------
                // else if(req.url.match("/alunos/edit\/(A|PG)\d+$")){
                //     id = req.url.split('/')[3]
                //     collectRequestBodyData(req, body => {
                //         if(body){
                //             axios.post(`http://localhost:3000/alunos/${id}`, body)
                //                .then(resp => {
                //                     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                //                     res.write(`<p>Aluno editado: ${JSON.stringify(resp.data)}</p>`)
                //                     res.end()
                //                 })
                //                .catch(error => {
                //                     console.log(error)  
                //                     res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                //                     res.end()
                //                 })
                //         }
                //         else{
                //                 console.log("No body data")  
                //                 res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                //                 res.write()
                //         }
                //     })
                // }
                // POST /alunos/delete/:id --------------------------------------------------------------------
                // else if(req.url.match("/alunos/delete\/(A|PG)\d+$")){
                //     id = req.url.split('/')[3]
                //     axios.delete(`http://localhost:3000/alunos/${id}`)
                //        .then(resp => {
                //             res.writeHead(302, { 'Location': '/alunos' }) 
                //             res.end()
                //         })
                //        .catch(error => {
                //             console.log(error)  
                //             res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                //             res.end()
                //         })
                // }
                // POST ? -> Lancar um erro
                }else if(req.url.startsWith("/alunos/edit?id=")){
                    let id = req.url.split("?id=")[1]
                    collectRequestBodyData(req, body => {
                        if(body){
                            axios.put(`http://localhost:3000/alunos/${id}`, body)
                               .then(resp => {
                                    res.writeHead(302, { 'Location': '/alunos' }) 
                                    res.end()
                                })
                               .catch(error => {
                                    console.log(error)  
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end()
                                })
                        }
                        else{
                            console.log("No body data")  
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write()
                        }
                    })
                }else if(req.url.startsWith("/alunos/delete?id=")){
                    let id = req.url.split("?id=")[1]
                    axios.delete(`http://localhost:3000/alunos/${id}`)
                       .then(resp => {
                            // res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            // res.write(`<p>Aluno eliminado: ${id}</p>`)
                            res.writeHead(302, { 'Location': '/alunos' }) 
                            res.end()
                        })
                       .catch(error => {
                            console.log(error)  
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end()
                        })
                }
                else{
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
                    res.write(`<p>Página não encontrada: ${req.url}</p>`)
                    res.end()
                }
                
                break
            case "PUT":
                // if(req.url.match("/alunos/edit/:id")){
                //     //id = req.url.split('/')[3]
                //     collectRequestBodyData(req, body => {
                //         if(body){
                //             axios.put(`http://localhost:3000/alunos/${id}`, body)
                //                .then(resp => {
                //                     res.writeHead(302, { 'Location': '/alunos' }) 
                //                     res.end()
                //                 })
                //                .catch(error => {
                //                     console.log(error)  
                //                     res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                //                     res.end()
                //                 })
                //         }
                //         else{
                //             console.log("No body data")  
                //             res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                //             res.write()
                //         }
                //     })
                // }
                break
            case "DELETE":
                // if(req.url.match("/alunos/delete/(A|PG)\d+$")){
                //     id = req.url.split('/')[3]
                //     axios.delete(`http://localhost:3000/alunos/${id}`)
                //        .then(resp => {
                //             res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                //             res.write(`<p>Aluno eliminado: ${id}</p>`)
                //             res.end()
                //         })
                //        .catch(error => {
                //             console.log(error)  
                //             res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                //             res.end()
                //         })
                // }
                break
            default: 
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("Metodo não suportado")
                res.end()
        }
    }
})

alunosServer.listen(3003, ()=>{
    console.log("Servidor à escuta na porta 3003...")
})



