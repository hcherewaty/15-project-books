'use strict';
const client = require('../../pg');

/**
 * handles getting all books from bookshelves
 *
 * @param {*} request
 * @param {*} response
 * @returns
 */
function getBookshelves(request, response) {
  let SQL = 'SELECT * FROM bookshelves ORDER BY name;';

  return client.query(SQL);
}

module.exports = getBookshelves;