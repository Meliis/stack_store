'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Promocode = require('../promocode/promocode.model');

describe('GET /api/promocodes', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/promocodes')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

var promo;
describe('Promocode model', function() {

  afterEach(function(done) {
    Promocode.remove().exec().then(function(){done();});
  })
describe('at creation', function() {
  it('should require a code', function(done) {
    var promocode = new Promocode({
      creationDate: new Date(),
      expirationDate: new Date(),
      promoType: 'all'
    });
    promocode.save(function(err) {
      should.exist(err);
      done();
    });
  });
  it('should require a creation date', function(done) {
    var promocode = new Promocode({
      code: "HEY123",
      expirationDate: new Date(),
      promoType: 'all'
    });
    promocode.save(function(err) {
      should.exist(err);
      done();
    });
  });
  it('should require a expiration date', function(done) {
    var promocode = new Promocode({
      code: "HEY123",
      creationDate: new Date(),
      promoType: 'all'
    });
    promocode.save(function(err) {
      should.exist(err);
      done();
    });
  });
  it('should require a promo type', function(done) {
    var promocode = new Promocode({
      code: "HEY123",
      creationDate: new Date(),
      expirationDate: new Date()
    });
    promocode.save(function(err) {
      should.exist(err);
      done();
    });
  });
});
describe('statics', function() {
  it('should be able to create new Date', function(done) {
    var promocode = new Promocode({
      code: "HEY123",
      expirationDate: new Date(),
      promoType: 'all'
    });
    var edited = Promocode.createDate(promocode);
    var editedDate = edited.creationDate;
    edited.save(function(err, code) {
        code.creationDate.should.eql(editedDate);
        done();
   });
  });
});
});