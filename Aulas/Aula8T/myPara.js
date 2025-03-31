$(function() {
    var paraCount = 0;
    //carregar os paragrafos da bd
    $.get('http://localhost:3000/paras', function(plist){
        paraCount = plist.length;
        plist.forEach(p => {
            $("#paraList").append(
                `<li p_id="${p.id}">
                    <b>${p.date}</b>: ${p.p}
                    <button class="w3-button w3-red w3-small removeB">X</button>
                </li>`
            )
        });
    })

    //adicionar novos paragrafos
    $("#addPara").click(function() {
        let text = $("#paraText").val();
        var ndate = new Date();
        let date = ndate.toISOString().substring(0,19)
        let newpara = {
            p: text,
            date: date,
            id: "p" + paraCount
        }

        $.post({
            url: 'http://localhost:3000/paras',
            data: JSON.stringify(newpara),
            headers:{'Content-Type': 'application/json'},
            dataType: 'json',
            success: function(response) {
                alert('Registo inserido na BD: ' + JSON.stringify(response))
                $("#paraList").append(
                    `<li p_id="${newpara.id}">
                        <b>${newpara.date}</b>: ${newpara.p}
                        <button class="w3-button w3-red w3-small removeB">X</button>
                    </li>`
                )
                paraCount++
                $("#paraText").val('')
            },
            error: function(error) {
                alert('ERRO ao registar na BD:'+ JSON.stringify(error))
            }
        })
    })

    //apagar o paragrafo ao clicar no botao
    $("#paraList").on('click',".removeB",function() {
        let li = $(this).parents()
        let paraId = li.attr("p_id")

        //alert(`ID: ${paraId}, \n HTML: ${li}`)

        $.ajax({
            url: `http://localhost:3000/paras/${paraId}`,
            type: 'DELETE',
            success: function(response) {
                //alert('Paragrafo apagado da BD:'+ JSON.stringify(response))
                li.remove()
            },
            error: function(error) {
                alert('ERRO ao apagar paragrafo da BD:'+ JSON.stringify(error))
            }
        })
    })


})