exports.myDateTime = () => {
    return new Date().toISOString().substring(0,16)
}

exports.myName = function(){
    return 'Alex'
}

exports.turma = "EngenhariaWeb"