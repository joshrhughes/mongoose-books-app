var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    name: String,
    alive: Boolean,
    image: String,
});

var Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;



// The Example

// // models/author.js
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var AuthorSchema = new Schema({
//     name: String,
//     // you should fill the rest of this in
// });
// ```

// models/author.js
// var Author = mongoose.model('Author', AuthorSchema);

// models/author.js
// module.exports = Author;