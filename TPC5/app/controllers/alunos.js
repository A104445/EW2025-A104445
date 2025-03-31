var Aluno = require('../models/aluno');

module.exports.list = () => {
    return Aluno.find().sort({nome:1}).exec();
}

module.exports.findById = (id) => {
    return Aluno.findOne({_id : id}).exec();
}

module.exports.insert = (aluno) => {
    if(Aluno.find({_id : aluno._id}).exec().length !=1){
        var newAluno = new Aluno(aluno);
        newAluno._id = aluno._id;
        return newAluno.save();
    }
}

module.exports.update = (id, aluno) => {
    return Aluno.findByIdAndUpdate(id, aluno).exec();
}

module.exports.delete = (id, aluno) => {
    return Aluno.findByIdAndDelete(id, aluno).exec();
}

module.exports.inverteTpc = (id, idTpc) => {
    // var aluno = await Aluno
    return Aluno.findOne({"_id" : id}).exec()
    .then(aluno => {
        var tpc = `tpc${idTpc}`
        if(aluno[tpc]){
            aluno[tpc] = !aluno[tpc]
        } else {
            aluno[tpc] = true
        }
        return Aluno.findByIdAndUpdate(id, aluno).exec()
    })
}
