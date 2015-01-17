'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Product = require('../product/product.model');
var User = require('../user/user.model');
var Review = require('./review.model');


describe('GET /api/reviews', function() {

  xit('should respond with JSON array', function(done) {
    request(app)
      .get('/api/reviews')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

var tempUser = new User({provider: 'local', name:'David', email:'dc@gmail.com', password: 'password'});
var tempProduct = new Product({name: 'time', price: 4, description: {blurb:'test', full:'testFull'}});

describe('Review model', function(){
  afterEach(function(done) {
  Product.remove().exec().then(function(){done();});
  })

  it('Should create with no errors', function(done){
    var review = new Review({
      userId: tempUser,
      productId: tempProduct,
      stars: 4,
      title: 'title',
      body: 'body'
    });
    review.save(function(err){
      should.exist(!err);
      done();
    });
  });

  it('Should give error with no product', function(done){
    var review = new Review({
      userId: tempUser,
      // productId: tempProduct,
      stars: 4,
      title: 'title',
      body: 'body'
    });
    review.save(function(err){
      should.exist(err);
      done();
    });
  });

  it('Should give error with no user', function(done){
    var review = new Review({
      // userId: tempUser,
      productId: tempProduct,
      stars: 4,
      title: 'title',
      body: 'body'
    });
    review.save(function(err){
      should.exist(err);
      done();
    });
  });

  it('Should give error with no stars', function(done){
    var review = new Review({
      userId: tempUser,
      productId: tempProduct,
      // stars: 4,
      title: 'title',
      body: 'body'
    });
    review.save(function(err){
      should.exist(err);
      done();
    });
  });
});