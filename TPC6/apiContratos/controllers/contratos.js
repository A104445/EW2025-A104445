var Contrato = require('../models/contrato')

module.exports.list = () => {
    return Contrato.find()
                .exec()   
}


module.exports.findById = id => {
    return Contrato.findOne({'_id' : id})
            .exec()   
}

module.exports.getContractByEntity = entidade => {
    return Contrato.find({'entidade_comunicante' : entidade})
                .exec()   
}

module.exports.getContractByType = tipo => {
    return Contrato.find({'tipoprocedimento' : tipo})
                .exec()   
}


module.exports.listEntities = () => {
    return Contrato.distinct('entidade_comunicante')
                .sort({'entidade_comunicante' : 1})
                .exec()   
}

module.exports.listTypes = () => {
    return Contrato.distinct('tipoprocedimento')
                .sort({'tipoprocedimento' : 1})
                .exec()   
}

module.exports.insert = contr => {
    var newctr = new Contrato(contr);
    return newctr.save();
}

module.exports.update = (contr, id) => {
    return Contrato
        .findByIdAndUpdate(id, contr, {new: true})
        .exec();
}

module.exports.delete = id => {
    return Contrato
        .findByIdAndDelete(id, {new: true})
        .exec();
}


