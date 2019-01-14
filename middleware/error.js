'use strict';

//NEEDS UPPDATED!!!!!JO#JO!#J
/**
 * handles rendering error page
 *
 * @param {*} error
 * @param {*} response
 */
function handleError(error, response) { //
  response.render('pages/error', {error: error});
}

module.exports = handleError;