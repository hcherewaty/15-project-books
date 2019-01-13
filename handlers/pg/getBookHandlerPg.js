'use strict';
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

const handleError = require('../../handlers/handleError');
const getBookshelves = require('./getBookshelvesHandlerPg');

function getBook(request, response, client) {

  if (request.params.method) { // getBooks
    getBookshelves()
      .then(shelves => {
        // let SQL = 'SELECT * FROM books WHERE id=$1;';
        let SQL = 'SELECT books.*, bookshelves.name FROM books INNER JOIN bookshelves on books.bookshelf_id=bookshelves.id WHERE books.id=$1;';
        let values = [request.params.id];
        client.query(SQL, values)
          .then(result => response.render('pages/books/show', {book: result.rows[0], bookshelves: shelves.rows}))
          .catch(err => handleError(err, response));
      });

  } else { // getBook
    let SQL = 'SELECT * FROM books;';
    return client.query(SQL)
      .then(results => {
        if(results.rows.rowCount === 0) {
          response.render('pages/searches/new');
        } else {
          response.render('pages/index', {books: results.rows});
        }
      })
      .catch(err => handleError(err, response));
  }

}

module.exports = getBook;