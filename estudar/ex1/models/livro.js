const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // corresponde ao bookId
  title: { type: String, required: true },
  series: { type: String },
  author: { type: [String] }, // se quiseres, podes separar autores num array depois
  rating: { type: Number },
  description: { type: String },
  language: { type: String },
  isbn: { type: String },
  genres: { type: [String] },       // array de strings
  characters: { type: [String] },   // array de strings
  bookFormat: { type: String },
  edition: { type: String },
  pages: { type: Number },
  publisher: { type: String },
  publishDate: { type: String },
  firstPublishDate: { type: String },
  awards: { type: [String] },
  numRatings: { type: Number },
  ratingsByStars: { type: [Number] },
  likedPercent: { type: Number },
  setting: { type: [String] },
  coverImg: { type: String },
  bbeScore: { type: Number },
  bbeVotes: { type: Number },
  price: { type: Number }
}, { collection: 'livros' }); // garante que usa a coleção 'livros'

module.exports = mongoose.model('Livro', LivroSchema);
