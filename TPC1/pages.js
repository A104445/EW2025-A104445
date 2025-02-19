export function genMainPage(){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Oficina Automóvel</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-blue">
                    <h1>Consultas</h1>
                </header>
                
                <div class="w3-container">
                    <ul class="w3-ul">
                        <li>
                            <a href="/reparacoes">Lista de Reparações</a>
                        </li>
                        <li>
                            <a href="/marcas">Lista de Marcas</a>
                        </li>
                        <li>
                            <a href="/modelos">Lista de Modelos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </body>  
        `
    return pagHTML
}

export function genReparacoesPage(reparacoes) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Lista de Reparações</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-blue">
                    <h1>Lista de Reparações</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Nome</th>
                                <th>Data</th>
                                <th>NIF</th>
                            </tr>
                        <tbody>`
                        reparacoes.forEach(reparacao => {
                            pagHTML += `
                                <tr>
                                    <td>${reparacao.viatura.marca}</td>
                                    <td>${reparacao.viatura.modelo}</td>
                                    <td>${reparacao.nome}</td>
                                    <td>${reparacao.data}</td>
                                    <td>${reparacao.nif}</td>
                                    <td>
                                    <a href="/reparacoes?nif=${reparacao.nif}">Intervenções</a>
                                    </td>
                                </tr>`
                        })
                        pagHTML += `
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML;
}

export function genIntervencoesPage(nif, reparacoes) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Intervenções do Cliente</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-blue">
                    <h1>Intervenções do Cliente ${nif}</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                        </tr>
                        <tbody>`;

                        let intervencoesUnicas = new Map(); 

                        reparacoes.forEach(reparacao => {
                            if (nif == reparacao.nif) {
                                reparacao.intervencoes.forEach(intervencao => {
                                    if (!intervencoesUnicas.has(intervencao.codigo)) {
                                        intervencoesUnicas.set(intervencao.codigo, intervencao);
                                    }
                                });
                            }
                        });

                        let intervencoesOrdenadas = Array.from(intervencoesUnicas.values())
                        .sort((a, b) => a.codigo.localeCompare(b.codigo)); 

                        intervencoesOrdenadas.forEach(intervencao => {
                            pagHTML += `
                                <tr>
                                    <td>${intervencao.codigo}</td>
                                    <td>${intervencao.nome}</td>
                                    <td>${intervencao.descricao}</td>
                                </tr>`;
                        });

    pagHTML += `
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
    </html>`;

    return pagHTML;
}

export function genMarcasPage(reparacoes) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Lista de Marcas</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-blue">
                    <h1>Lista de Marcas</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                            <tr>
                                <th>Marca</th>
                            </tr>
                        <tbody>`
                        let marcasUnicas = new Map(); 

                        reparacoes.forEach(reparacao => {
                            if (!marcasUnicas.has(reparacao.viatura.marca)) {
                                marcasUnicas.set(reparacao.viatura.marca, reparacao.viatura);
                            }
                        });

                        let marcasOrdenadas = Array.from(marcasUnicas.values())
                        .sort((a, b) => a.marca.localeCompare(b.marca)); 

                        marcasOrdenadas.forEach(reparacao => {
                            pagHTML += `
                                <tr>
                                    <td>${reparacao.marca}</td>
                                    <td>
                                    <a href="/modelos?marca=${encodeURIComponent(reparacao.marca)}">Modelos</a>
                                    </td>
                                </tr>`;
                        });

                        pagHTML += `
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML;
}

export function genModelosPage(reparacoes) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Lista de Modelos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-blue">
                    <h1>Lista de Modelos</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                            <tr>
                                <th>Modelo</th>
                                <th>Marca</th>
                                <th>Matrícula</th>
                            </tr>
                        <tbody>`
                        let modelosUnicos = new Map(); 

                        reparacoes.forEach(reparacao => {
                            if (!modelosUnicos.has(reparacao.viatura.modelo)) {
                                modelosUnicos.set(reparacao.viatura.modelo, reparacao.viatura);
                            }
                        });

                        let modelosOrdenados = Array.from(modelosUnicos.values())
                        .sort((a, b) => a.modelo.localeCompare(b.modelo)); 

                        modelosOrdenados.forEach(viatura => {
                            pagHTML += `
                                <tr>
                                    <td>${viatura.modelo}</td>
                                    <td>${viatura.marca}</td>
                                    <td>${viatura.matricula}</td>
                                </tr>`;
                        });

                        pagHTML += `
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML;
}

export function genModelosMarcaPage(marca,reparacoes) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Lista de Modelos</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4 w3-margin">
                <header class="w3-container w3-blue">
                    <h1>Lista de Modelos ${marca}</h1>
                </header>
                <div class="w3-container">
                    <table class="w3-table-all">
                            <tr>
                                <th>Modelo</th>
                                <th>Matrícula</th>
                            </tr>
                        <tbody>`
                        let modelosUnicos = new Map(); 

                        reparacoes.forEach(reparacao => {
                            if (!modelosUnicos.has(reparacao.viatura.modelo) && reparacao.viatura.marca == marca) {
                                modelosUnicos.set(reparacao.viatura.modelo, reparacao.viatura);
                            }
                        });

                        let modelosOrdenados = Array.from(modelosUnicos.values())
                        .sort((a, b) => a.modelo.localeCompare(b.modelo)); 

                        modelosOrdenados.forEach(viatura => {
                            pagHTML += `
                                <tr>
                                    <td>${viatura.modelo}</td>
                                    <td>${viatura.matricula}</td>
                                </tr>`;
                        });

                        pagHTML += `
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
    </html>
    `
    return pagHTML;
}