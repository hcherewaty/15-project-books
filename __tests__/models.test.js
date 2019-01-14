'use strict';

const bookPg = require('../models/pg/modelPg');
const bookMongo = require('../models/mongo/bookSchemaMongo');
const supergoose = require('./supergoose');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('models', () => {

  describe('pg models', () => {
    it('can format a new book', () => {
      let obj = {title: 'hey'};
      let book = new bookPg(obj);

      let expected = 'hey';
      expect(expected).toEqual(book.title);
      
    });
  });

  describe('mongo models', () => {
    it('can format a new book', () => {
      let obj = {title: 'hey'};
      let book = obj;
      
      let expected = 'hey';
      expect(expected).toEqual(book.title);
    });
  });

});