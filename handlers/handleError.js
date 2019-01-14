'use strict';

function handleError(error, response) {
  response.render('pages/error', {error: error});
}

module.exports = handleError;