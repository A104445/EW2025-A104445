const Book = require("../models/books"); // Adjust the path as needed

function filters(query) {
  let filter = {};
  let show = {};
  let sort = {};
  if (query.author) {
    filter.author = query.author;
  }
  if (query.title) {
    filter.title = new RegExp(query.title, "i");
  }
  if (query.genre) {
    filter.genres = query.genre;
  }
  if (query.language) {
    filter.language = query.language;
  }
  // if fields parameter is present, apply show filter
  if (query.fields) {
    query.fields.split(",").forEach((field) => {
      show[field] = 1;
    });
  }
  // Apply sorting if both sort and order are present
  if (query.sort && query.order) {
    sort[query.sort] = query.order === 'desc' ? -1 : 1;
  }
  return { filter, show, sort };
}

// Fetch all books or filter by query parameters
function getAll(query){
  let search_options = filters(query);
  return Book.find({}, search_options.show).sort(search_options.sort).exec();
}

function getWithFilter(query) {
  let filter = {};
  if (query.author) {
    filter.author = query.author;
  }
  if (query.title) {
    filter.title = new RegExp(query.title, "i"); // case-insensitive search
  }
  if (query.genre) {
    filter.genres = query.genre;
  }
  if (query.language) {
    filter.language = query.language;
  }
  return Book.find(filter).exec();
}

function getById(id){
  return Book.findById(id).exec();
}

function create(book){
  return Book.create(book);
}

function update(id, book){
  return Book.findByIdAndUpdate(id, book, { new: true }).exec();
}

function remove(id){
  return Book.findByIdAndDelete(id).exec();
}

module.exports = {
  getAll,
  getWithFilter,
  getById,
  create,
  update,
  remove
};
