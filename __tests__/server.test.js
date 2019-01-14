'use strict';

const express = require('express');
const request = require('supertest');
const app = express();

describe('routes', () => {

  describe('get /', () => {
    it('should return json with status of 200', () => {
      request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('post /searches', () => {
    it('should return json with status of 200', () => {
      request(app)
        .post('/searches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('get /searches/new', () => {
    it('should return json with status of 200', () => {
      request(app)
        .get('/searches/new')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('get /books/:id', () => {
    it('should return json with status of 200', () => {
      request(app)
        .get('/books/:id')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('post /books', () => {
    it('should return json with status of 200', () => {
      request(app)
        .post('/books')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('put /books/:id', () => {
    it('should return json with status of 200', () => {
      request(app)
        .put('/books/:id')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('delete /books/:id', () => {
    it('should return json with status of 200', () => {
      request(app)
        .delete('/books/:id')
        .expect('Content-Type', /json/)
        .expect(200);
    });
  });

  describe('get *', () => {
    it('should return json with status of 404', () => {
      request(app)
        .get('*')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
});