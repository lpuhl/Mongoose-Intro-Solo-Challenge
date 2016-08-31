app.controller('BookController', ['$scope', '$http', function ($scope, $http) {
  $scope.books = []; // the array of books we expect
  $scope.newBook = {};  // single book to be added to db // for the form to enter a new book
  $scope.displayBookId = '';
  $scope.newComment = {};

  
  getBooks();
  /** --- Scoped functions -- **/
  $scope.submitNewBook = function() {
    var data = $scope.newBook
    $http.post('/books', data)
      .then(function () {
        console.log('POST /books', data );
        getBooks();
      });
  };

  $scope.deleteBook = function(id) {
    $http.delete('/books/' + id)
      .then(function () {
        console.log('DELETE /books/', id );
        getBooks();
      });
  };

  $scope.updateBook = function(book) {  // takes the whole object as a parameter
    var id = book._id;  //_id was assigned by Mongo
    $http.put('/books/' + id, book)
      .then(function () {
        console.log('PUT /books/', id );
        getBooks();
      });
  };

  $scope.displayComments = function(id) {
    $scope.displayBookId = id;
  };

  $scope.submitComment = function(id) {
    var data = $scope.newComment;
    $http.post('/books/' + id + '/comments', data)
      .then(function () {
        console.log('POST /books/', id, '/comments', data);
        $scope.newComment={};
        getBooks();
      });

  };
  /** --- Utility functions (not available to call from the DOM) -- **/
  function getBooks() {
    $http.get('/books')
      .then(function (response) {
        console.log('GET /books', response.data);
        var bookDataArray = response.data;
        bookDataArray.forEach(function (book) {
          book.publishDate = new Date(book.publishDate);
        });
        $scope.books = bookDataArray;
      });
  }

}]);
