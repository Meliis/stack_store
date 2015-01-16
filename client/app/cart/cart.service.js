'use strict';

angular.module('stackStoreApp')
  .factory('CartFactory', function ($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function


    var Cart = $resource('api/cart/:id', { id: '@_id'}, {
    	update: {
    		method: 'PUT'
    	} 
    });

    //class method (`this` is the class)
    // Cart.search = function() {};

    //instance method (`this` is an *instance* of the class)
    Cart.prototype.addToCart = function(product, quantity) {};

    

    return Cart;

  });
