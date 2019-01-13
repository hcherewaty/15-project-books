'use strict';

//NEEDS UPPDATED!!!!!JO#JO!#J
function handleError(error, response) { //
  response.render('pages/error', {error: error});
}

module.exports = handleError;