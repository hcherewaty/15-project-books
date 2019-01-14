'use strict';

// Application Dependencies
require('dotenv').config();
const express = require('express');
const client = require('./mong');
const superagent = require('superagent');
const methodOverride = require('method-override');
const books = require('./models/mongo/modelMongo');
// const Book = require('./models/pg/modelPG');

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

function getBooks(request, response) {
    let mongo = getBookShelves();
    return client.query(mongo)
    .then(results => {
      if(results.rows.rowCount === 0) {
        response.render('pages/searches/new');
      } else {
        response.render('pages/index', {books: results.rows});
      }
    })
    .catch(err => handleError(err, response));
}

function getBook(request, response) {
    let mongo = books.get(request.params.id)
    return client.query(mongo)
    .then(result => response.render('pages/books/show', {book: result.rows[0], bookshelves: shelves.rows}))
    .catch(err => handleError(err, response));
}

function createBook(request, response) {
    let mongo = books.post(request.body);
    return client.query(mongo)
    .then(result => response.redirect(`/books/${result.rows[0].id}`))
    .catch(err => handleError(err, response));
}

function updateBook(request, response) {
    let mongo = books.put(request.body);
    return client.query(mongo)
    .then(response.redirect(`/books/${request.params.id}`))
    .catch(err => handleError(err, response));
}

function deleteBook(request, response) {
    let mongo = books.delete(request.params.id);
    return response.redirect('/')
    .catch(err => handleError(err, response));
}

function getBookShelves(request, response) {
    let mongo = books.find();
    return client.query(mongo);
}

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

