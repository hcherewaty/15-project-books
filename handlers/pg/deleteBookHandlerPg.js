'use strict';
const handleError = require('../../handlers/handleError');
const client = require('../../pg');

/**
 * handles deleting a book
 *
 * @param {*} request
 * @param {*} response
 * @returns
 */
function deleteBook(request, response) {
  let SQL = 'DELETE FROM books WHERE id=$1;';
  let values = [request.params.id];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

module.exports = deleteBook;