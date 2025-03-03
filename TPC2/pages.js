export function genMainPage(){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Consultas</h1>
                </header>
                
                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/alunos">Lista de Alunos</a>
                        </li>
                        <li>
                            <a href="/cursos">Lista de Cursos</a>
                        </li>
                        <li>
                            <a href="/instrumentos">Lista de Instrumentos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </body>  
        `
    return pagHTML
}

export function genAlunosPage(alunos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Lista de Alunos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-green">
                    <h1>Lista de Alunos</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano do Curso</th>
                            <th>Instrumento</th>
                        </tr>
                        <tbody>`
                        alunos.forEach(aluno => {
                            pagHTML += `
                            <tr>
                                <td>${aluno.id}</td>
                                <td>${aluno.nome}</td>
                                <td>${aluno.dataNasc}</td>
                                <td>${aluno.curso}</td>
                                <td>${aluno.anoCurso}</td>
                                <td>${aluno.instrumento}</td>
                                <td>
                                <a href="/alunos?id=${aluno.id}">Detalhes
                                </a>
                            </tr>
                            `
                        })
                        pagHTML += `
                        </tbody>
                    </table>
                    <a href="/">Voltar à Página Principal</a>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunoPage(id, alunos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Detalhes do Aluno</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-green">
                    <h1>Detalhes do Aluno ${id}</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Curso</th>
                            <th>Ano do Curso</th>
                            <th>Instrumento</th>
                        </tr>
                        <tbody>`
                        alunos.forEach(aluno => {
                            if(aluno.id == id){
                            pagHTML += `
                            <tr>
                                <td>${aluno.id}</td>
                                <td>${aluno.nome}</td>
                                <td>${aluno.dataNasc}</td>
                                <td>${aluno.curso}</td>
                                <td>${aluno.anoCurso}</td>
                                <td>${aluno.instrumento}</td>
                            </tr>
                            `
                            }
                        })
                        pagHTML += `
                        </tbody>
                    </table>
                    <a href="/alunos">Voltar à Lista dos Alunos</a>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursosPage(alunos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Cursos dos Alunos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-green">
                    <h1>Cursos dos Alunos</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Curso</th>
                        </tr>
                        <tbody>`
                        let cursos = new Set()
                        alunos.forEach(aluno => {
                            cursos.add(aluno.curso)
                        })
                        cursos.forEach(curso => {
                            pagHTML += `
                            <tr>
                                <td>${curso}</td>
                                <td>
                                <a href="/cursos?curso=${curso}">Alunos
                                </a>
                            </tr>
                            `
                        })
                        pagHTML += `
                        </tbody>
                    </table>
                    <a href="/">Voltar à Página Principal</a>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML;
}

export function genAlunosPorCursoPage(curso, alunos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Alunos do Curso ${curso}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-green">
                    <h1>Alunos do Curso ${curso}</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Instrumento</th>
                            <th>Ano do Curso</th>
                        </tr>
                        <tbody>`
                        alunos.forEach(aluno => {
                            if(aluno.curso == curso){
                                pagHTML += `
                                <tr>
                                    <td>${aluno.id}</td>
                                    <td>${aluno.nome}</td>
                                    <td>${aluno.dataNasc}</td>
                                    <td>${aluno.instrumento}</td>
                                    <td>${aluno.anoCurso}</td>
                                </tr>
                                `
                            }
                        })
                        pagHTML += `
                        </tbody>
                    </table>
                    <a href="/cursos">Voltar à Lista de Cursos</a>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML;
}

export function genInstrumentosPage(alunos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Instrumentos dos Alunos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-green">
                    <h1>Instrumentos dos Alunos</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Instrumento</th>
                        </tr>
                        <tbody>`
                        let instrumentos = new Set()
                        alunos.forEach(aluno => {
                            instrumentos.add(aluno.instrumento)
                        })
                        instrumentos.forEach(instrumento => {
                            pagHTML += `
                            <tr>
                                <td>${instrumento}</td>
                                <td>
                                <a href="/instrumentos?instrumento=${instrumento}">Alunos
                                </a>
                            </tr>
                            `
                        })
                        pagHTML += `
                        </tbody>
                    </table>
                    <a href="/">Voltar à Página Principal</a>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML;
}

export function genAlunosPorInstrumentoPage(instrumento, alunos) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Alunos do Instrumento ${instrumento}</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-green">
                    <h1>Alunos do Instrumento ${instrumento}</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Ano do Curso</th>
                            </tr>
                        <tbody>`
                        alunos.forEach(aluno => {
                            if(aluno.instrumento == instrumento){
                                pagHTML += `
                                <tr>
                                    <td>${aluno.id}</td>
                                    <td>${aluno.nome}</td>
                                    <td>${aluno.dataNasc}</td>
                                    <td>${aluno.curso}</td>
                                    <td>${aluno.anoCurso}</td>
                                </tr>
                                `
                            }
                        })
                        pagHTML += `
                        </tbody>
                    </table>
                    <a href="/instrumentos">Voltar à Lista de Instrumentos</a>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML;
}
