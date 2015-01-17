'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Order = require('./order.model');
var User = require('../user/user.model');


describe('Order Model', function() {

   before(function(done) {
    // Clear users before testing
    User.remove().exec().then(function() {
      Order.remove().exec().then(function() {
        done();
      })
    });
  });

  afterEach(function(done) {
    User.remove().exec().then(function() {
      Order.remove().exec().then(function() {
        done();
      });
  });
    });

  var user;
  var order;

  beforeEach(function(done) {
    user = new User({provider: 'local', name:'Chuck', email:'chuckmpierce@gmail.com', password: 'password'});
    order = new Order({userId: user._id, lineItems: [{product:'time',price:10000,quantity:2}] });
    done();
  });

  describe('at the start', function() {

    it('should begin with a status of open', function(done) {
      order.status.should.equal('open');
      done();
    });

    it('should require lineItems', function(done) {
      var order2 = new Order({userId: user._id});
      order2.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  describe('when it gets a user', function() {
    it('should refer to a user in the database', function(done) {
      user.save(function() {
        User.find({}, function(err, user) {
          order.userId = user[0]._id;
          order.save(function(err, savedOrder, numModified) {
            Order.findOne({userId: user[0]._id}).populate('userId').exec(function(err, foundOrder) {    
            foundOrder.userId.name.should.equal(user[0].name);
            done();
            });
          });
        });
      });
    });
  });

  describe('methods', function() {
    it('should change the order to close status when userId is present', function(done) {
      order.closeOrderCheck();
      order.save(function(err, result) {
        result.status.should.equal('closed');
        done();
      });
    });
    it('should change the order to closed_guest status when userId is not present', function(done) {
      var order2 = new Order({lineItems: [{product:'time',price:10000,quantity:2}] });
      order2.closeOrderCheck();
      order2.save(function(err, result) {
        result.status.should.equal('closed_guest');
        done();
      });
    });
  });

  describe('virtuals', function() {
    it('should calculate total from prices in line items', function(done) {
      var order2 = new Order({lineItems: [{product:'time',price:10000,quantity:2},{product:'more time',price:5000,quantity:5}]});
      order2.total.total.should.equal(45000);
      done();
    });
  });

});