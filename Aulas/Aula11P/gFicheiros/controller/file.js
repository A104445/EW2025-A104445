const File = require('../model/file')

module.exports.findAll = () => {
    return File
        .find()
        .exec();
}

module.exports.save = async (file, filename) => {
    var oldFile = await File
        .findOne({name : filename})
        .exec();

    if(!oldFile){
        var fileDb = new File({
            date: new Date(),
            mimetype : file.mimetype,
            name: filename,
            originalname: file.originalname,
            size: file.size
        })

        fileDb.save()
    }
}