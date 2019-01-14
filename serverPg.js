'use strict';

// Application Dependencies
require('dotenv').config();
const express = require('express');
// const pg = require('pg');
require('./pg');
const superagent = require('superagent');
const methodOverride = require('method-override');
const Book = require('./models/pg/modelPG');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Application Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// Application helpers
const formInput = require('./helpers/formInputHelper');

app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    // look in urlencoded POST bodies and delete it
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// Handlers
let handleError = require('./handlers/handleError');
let getBook = require('./handlers/pg/getBookHandlerPg');
let getBooks = require('./handlers/pg/getBooksHandlerPg');
// let getBookShelves = require('./handlers/pg/getBookshelvesHandlerPg');
let createBook = require('./handlers/pg/createBookHandlerPg');
let updateBook = require('./handlers/pg/updateBookHandlerPg');
let deleteBook = require('./handlers/pg/deleteBookHandlerPg');


// API Routes
app.get('/', getBooks);
app.post('/searches', createSearch);
app.get('/searches/new', newSearch);
app.get('/books/:id', getBook);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);

app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

function createSearch(request, response) {
  let url = formInput(request);

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', {results: results}))
    .catch(err => handleError(err, response));
}

function newSearch(request, response) {
  response.render('pages/searches/new');
}

