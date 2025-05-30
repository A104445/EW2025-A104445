const Livro = require('../models/livro');

module.exports.listar = async (query) => {
  const { character, genre } = query;

  if (character) {
    return await Livro.find(
      { characters: { $elemMatch: { $regex: `^${character}$`, $options: 'i' } } },
      { title: 1, isbn: 1, _id: 0 }
    ).sort({ title: 1 });
  }

  if (genre) {
    return await Livro.find(
      { genres: { $elemMatch: { $regex: `^${genre}$`, $options: 'i' } } },
      { title: 1, isbn: 1, _id: 0 }
    ).sort({ title: 1 });
  }

  return await Livro.find().limit(50);
};

module.exports.getGenres = async () => {
  return await Livro.distinct('genres').sort();
};

module.exports.getCharacters = async () => {
    const livros = await Livro.find({}, 'characters').lean();
    const personagens = [];

    livros.forEach(livro => {
        personagens.push(...livro.characters);
    });

    // Remove duplicados
    const personagensUnicos = [...new Set(personagens)];

    return personagensUnicos.sort();
};

module.exports.listarPorAutor = async (authorName) => {
  return await Livro.find({ author: authorName }).exec();
}

module.exports.insert = async (livro) => {
  const newLivro = new Livro(livro);
  return await newLivro.save();
};

module.exports.delete = async (id) => {
  return await Livro.findByIdAndDelete(id);
};

module.exports.update = async (livro, id) => {
  return await Livro.findByIdAndUpdate(id, livro, { new: true });
};

module.exports.findById = async (title) => {
    return await Livro.findOne({ title: title });
};
