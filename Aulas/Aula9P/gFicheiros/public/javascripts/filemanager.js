$(function() {

});

function showImage(name,type){
    //1- limpar a modal
    $("#display").empty();
    //2- escrever o codigo
    if(type=="image/jpeg" || type=="image/png"){
        var ficheiro= $("<img src='/fileStore/"+name+"' width='80%'>");
        var download= $("<div><a href='/download/"+name+"'>Download</a></div>");
        $("#display").append(ficheiro,download);
    }else if(type=="application/json"){
        $.get("/fileContents/" + name, response => {
            var jsonContent=JSON.stringify(response);
            var ficheiro= $("<pre>"+jsonContent+"</pre>");
            var download= $("<div><a href=/download/"+name+"'>Download</a></div>");
            $("#display").append(ficheiro,download);
        })
        .fail(err=>{
            console.log(type);
            console.log(name);
        })
            
    }else if(type=="application/html"){
        $.get("/fileContent/" + name, response => {
            var ficheiro= $(response);
            var download= $("<div><a href=/download/"+name+"'>Download</a></div>");
            $("#display").append(ficheiro,download);
        })
        .fail(err=>{
            console.log(type);
            console.log(name);
        })
    }else{
        var ficheiro= $(`<p>${name}</p>`);
        var download= $("<div><a href=/download/"+name+"'>Download</a></div>");
        $("#display").append(ficheiro,download);
    }

    //3- mostrar a modal

    $("#display").modal();

}