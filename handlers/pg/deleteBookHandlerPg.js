'use strict';
const handleError = require('../../handlers/handleError');

function deleteBook(request, response, client) {
  let SQL = 'DELETE FROM books WHERE id=$1;';
  let values = [request.params.id];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

module.exports = deleteBook;