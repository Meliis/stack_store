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
    order = new Order({});
    done();
  });

  describe('at the start', function() {
    it('should begin with a total of zero', function(done) {
      order.total.should.eql(0);
      done();
    });

    it('should begin with a status of incomplete', function(done) {
      order.status.should.equal('incomplete');
      done();
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

});