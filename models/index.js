var mongoose = require("mongoose");



// connecting to the DB
mongoose.connect("mongodb://localhost/book-app");

module.exports.Book = require("./book.js");
