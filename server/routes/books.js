var express = require('express');
var router = express.Router();

// Require Book model module
var Book = require('../models/book');
//

/**
 * GET /movies
 *
 * return all movies from database
 */
router.get('/', function (req, res) {
  Book.find({}, function(err, books) {  //books is an array. Can be called anything.
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(books);
  });


});
/**
 * POST /movies
 *
 * add a new movie to the database
 */
router.post('/', function (req, res) {
  console.log('POST', req.body);
  var book = Book(req.body);  // creates a document (?)
  book.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.sendStatus(201); // Created
  });
});

/**
 * PUT /movies/<id>
 *
 * update a movie with the given id
 */
router.put('/:id', function (req, res) {
  var book = req.body;
  var id = req.params.id;
  // query on the book model
  Book.findByIdAndUpdate(id, book, function (err, book) {    //different book variable from 3 lines previous
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.status(204).send(book);
  });
});
/**
 * DELETE /movies/<id>
 *
 * delete a movie with the given id
 */
router.delete('/:id', function (req, res) {
  var id = req.params.id;
  Book.findByIdAndRemove(id, function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.sendStatus(204);
  });
});

/** -- COMMENTS ROUTE -- **/
router.post('/:id/comments', function(req, res) {
  var id = req.params.id;
  var comment = req.body;

  Book.findById(id, function (err, book) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    //"book" is a Mongo document, but you can interact with it as an object
    book.comments.push(comment);
    book.save(function (err) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(204);
    });
  });
});

module.exports = router;
