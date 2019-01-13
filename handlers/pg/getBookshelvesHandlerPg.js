'use strict';
const client = require('../../pg');

function getBookshelves(request, response) {
  let SQL = 'SELECT * FROM bookshelves ORDER BY name;';

  return client.query(SQL);
}

module.exports = getBookshelves;