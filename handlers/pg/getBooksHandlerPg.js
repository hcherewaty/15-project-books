'use strict';

const handleError = require('../../handlers/handleError');
const getBookshelves = require('./getBookshelvesHandlerPg');
const client = require('../../pg');

function getBooks(request, response) {
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

module.exports = getBooks;