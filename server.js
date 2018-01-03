// server.js
// SERVER-SIDE JAVASCRIPT


/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser');

// connect to db models
var db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


////////////////////
//  ROUTES
///////////////////




// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find().populate('author')
    .exec(function(err, books) {
      if (err) { return console.log("index error: " + err); }
      res.json(books);
  });
});

// //get request for Authors
// app.get('/api/authors', function(req, res){
//   db.Author.find();
// });

// get one book
app.get('/api/books/:id', function (req, res) {
  db.Book.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
});

// //Creating a new author
// app.post('/api/authors', function (req, res){
//   var newAuthor = new db.Author({
//     name: req.body.name
//   });
//   newAuthor.save(function (err, author) {
//     if (err) {
//       return console.log("save error: " + err);
//     }
//     console.log("saved ", author.name);
//     // send back the book!
//     res.json(author);
//   });
// });

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
 
  //console.log(req.body);
  var newBook = new db.Book({
    title: req.body.title,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });
  // find the author from req.body
  db.Author.findOne({name: req.body.author}, function(err, author){
    if (err) {
      return console.log(err);
    }
    // add this author to the book
    newBook.author = author;
    console.log(req.body.author);
    db.Author.create({ name: req.body.author }, function (err, author) {
      if (err) return handleError(err);
      // saved!
    });

    // save newBook to database
    newBook.save(function(err, book){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", book.title);
      // send back the book!
      res.json(book);
    });
  });
});



// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  db.Book.findOneAndRemove({ _id: bookId }, function (err, deletedBook) {
    res.json(deletedBook);
  });
});

// Create a character associated with a book
app.post('/api/books/:book_id/characters', function (req, res) {
  // Get book id from url params (`req.params`)
  var bookId = req.params.book_id;
  db.Book.findById(bookId)
    .populate('author')
    .exec(function (err, foundBook) {
      console.log(foundBook);
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (foundBook === null) {
        // Is this the same as checking if the foundBook is undefined?
        res.status(404).json({ error: "No Book found by this ID" });
      } else {
        // push character into characters array
        foundBook.characters.push(req.body);
        // save the book with the new character
        foundBook.save();
        res.status(201).json(foundBook);
      }
    });
});


// Delete a character associated with a book
app.delete('/api/books/:book_id/characters/:character_id', function (req, res) {
  // Get book id from url params (`req.params`)
  var bookId = req.params.book_id;
  var characterId = req.params.character_id;
  db.Book.findById(bookId)
    .populate('author')
    .exec(function (err, foundBook) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (foundBook === null) {
        res.status(404).json({ error: "No Book found by this ID" });
      } else {
        // find the character by id
        var deletedCharacter = foundBook.characters.id(characterId);
        // delete the found character
        deletedCharacter.remove();
        // save the found book with the character deleted
        foundBook.save();
        // send back the found book without the character
        res.json(foundBook);
      }
    });
});



app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
