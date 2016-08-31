// Book model for Mongoose

// Step 0 - Get our dependencies
var mongoose = require('mongoose');
var Schema = mongoose. Schema;
var Comment = require('./comment').schema;

// Step 1  - Create the Schema
var bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  publishDate: Date,
  publishedBy: String,
  comments: [Comment]
});

// Step 2 - Create the model
var Book = mongoose.model('Book', bookSchema); // if no collection for 'Book', Mongoose will create one called 'books'

// Step 3 - Export model for use in other parts of the app
module.exports = Book;
