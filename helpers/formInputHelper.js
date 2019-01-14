'use strict';

/**
 * helper function used to gather form input
 *
 * @param {*} request
 * @returns
 */
function formInput(request) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }
  return url;
}

module.exports = formInput;