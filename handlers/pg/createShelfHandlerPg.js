'use strict';
const client = require('../../pg');
// should we be passing client? original function was in scope
// where client was already defined
/**
 * Handles creating a bookshelf
 *
 * @param {*} shelf
 * @returns
 */
function createShelf(shelf){
  let normalizedShelf = shelf.toLowerCase();
  let SQL1 = `SELECT id from bookshelves where name=$1;`;
  let values1 = [normalizedShelf];

  return client.query(SQL1, values1)
    .then(results => {
      if(results.rowCount) {
        return results.rows[0].id;
      } else {
        let INSERT = `INSERT INTO bookshelves(name) VALUES($1) RETURNING id;`;
        let insertValues = [shelf];

        return client.query(INSERT, insertValues)
          .then(results => {
            return results.rows[0].id;
          });
      }
    });
}

module.exports = createShelf;