const { response } = require("../../app")

$(function(){

})

function showImage(name, type){
    // 1 - Limpar a modal
    $('#display').empty()

    // 2 - Escrever o código
    if(type == 'image/png' || type == 'image/jpeg'){
        var ficheiro = $(`<img src="/fileStore/${name}" width='80%'/>`)
        var download = $(`<div><a href='/download/${name}'>Download</a></div>`)
        $('#display').append(ficheiro, download)
    }else if(type == 'application/json'){
        $.get(`/fileContent/${name}`, response => {
            var jsonContent = JSON.stringify(response)
            var ficheiro = $(`<pre>${jsonContent}</pre>`)
            var download = $(`<div><a href='/download/${name}'>Download</a></div>`)
            $('#display').append(ficheiro, download)
        })
        .fail(err => {
            console.log(type)
            console.log(name)
        })
    }else if(type == 'text/html'){
        $.get(`/fileContent/${name}`, response => {
            var ficheiro = $(response)
            var download = $(`<div><a href='/download/${name}'>Download</a></div>`)
            $('#display').append(ficheiro, download)
        })
        .fail(err => {
            console.log(type)
            console.log(name)
        })
    }else{
        var ficheiro = $(`<p>${name}</p>`)
        var download = $(`<div><a href='/download/${name}'>Download</a></div>`)
        $('#display').append(ficheiro, download)
    }

    // 3 - Mostrar a modal
    $('#display').modal()
}

function addField(){    
    html = `
        <label class='w3-text-teal'><b>Filename</b></label>
        <input class='w3-input w3-border w3-ligth-grey' type='text' name ='filename' required />
        <label class='w3-text-teal'><b>Select file</b></label>
        <input class='w3-input w3-border w3-ligth-grey' type='file' name ='myFile' required />
    `

    $('#fields').append(html)
}