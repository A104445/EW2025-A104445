var Contrato = require('../models/contrato')

module.exports.getContratos = () => {
    return Contrato
        .find()
        .exec()
}

module.exports.getContratoById = id => {
    return Contrato
        .findById(id)
        .exec()

/*
    return Contrato
        .findOne({_id : id})
        .exec()
*/
}

module.exports.getContratosByEntidade = entidade => {
    return Contrato
        .find({entidade_comunicante : entidade})
        .exec()
}

module.exports.getContratosByTipo = tipo => {
    return Contrato
        .find({tipoprocedimento : tipo})
        .exec()
}

module.exports.getEntidades = () => {
    return Contrato
        .distinct('entidade_comunicante')
        .sort({entidade_comunicante : 1})
        .exec()
}

module.exports.getTipos = () => {
    return Contrato
        .distinct('tipoprocedimento')
        .sort({tipoprocedimento : 1})
        .exec()
}

module.exports.insert = contr => {
    var contrToSave = new Contrato(contr)
    return contrToSave.save()
}

module.exports.update = (contr, id) => {
    return Contrato
        .findByIdAndUpdate(id, contr, {new: true})
        .exec()
}

module.exports.delete = id => {
    return Contrato
        .findByIdAndDelete(id, {new: true})
        .exec()
}