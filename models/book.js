var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title : String, 
    //I should fill in the rest of the things here
    author : String, 
    image : String, //could also be a url
    release_date : String //could possibly be releaseDate, but this is how Joe did it.
});

// define the Book model based on the schema
var Book = mongoose.model('Book',BookSchema);

//exporting it so it can be used in server.js and elsewhere 

module.exports =  Book;


// Should look like this
// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;

// var BookSchema = new Schema({
//     title: String,
//     author: String,
//     image: String,
//     release_date: String
// });

// var Book = mongoose.model('Book', BookSchema);

// module.exports = Book;