'use strict';

function getBookshelves(request, response, client) {
  let SQL = 'SELECT * FROM bookshelves ORDER BY name;';

  return client.query(SQL);
}

module.exports = getBookshelves;