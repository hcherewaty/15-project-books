'use strict';

const handleError = require('../../handlers/handleError');
const getBookshelves = require('./getBookshelvesHandlerPg');
const client = require('../../pg');

function getBook(request, response) {
    getBookshelves()
      .then(shelves => {
        // let SQL = 'SELECT * FROM books WHERE id=$1;';
        let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
        let values = [request.params.id];
        client.query(SQL, values)
          .then(result => response.render('pages/books/show', {book: result.rows[0], bookshelves: shelves.rows}))
          .catch(err => handleError(err, response));
      });
  }

module.exports = getBook;