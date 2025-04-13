const contrato = require('../models/contrato')
var Contrato = require('../models/contrato')

module.exports.list = () => {
    return Contrato.find()
                .exec()   
}


module.exports.findById = id => {
    return Contrato.findOne({'idcontrato' : id})
            .exec()   
}

module.exports.findByNipc = nipc => {
    return Contrato.find({'NIPC_entidade_comunicante' : nipc})
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

module.exports.insert = (contr) => {
    if(Contrato.find({_id : contrato._id}).exec().length !=1){
        var newctr = new Contrato(contr);
        newctr._id = contr._id;
        return newctr.save();
    } 
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


