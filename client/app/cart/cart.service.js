'use strict';

angular.module('stackStoreApp')
  .factory('CartFactory', function ($resource, Auth) {
	// AngularJS will instantiate a singleton by calling "new" on this function


	var Cart = $resource('api/cart/:id', { id: '@_id'}, {
		update: {
			method: 'PUT'
		},
		populate: {
			method: 'GET',
			url: 'api/cart/:id/populate'
		} 
	});

	//class method (`this` is the class)
	// Cart.search = function() {};
	Cart.getCart = function() {
		if (Auth.isLoggedIn()) {
			// retrieve user's cart
		} else {
			
		}
	};

	var getCart = function() {
	 if (Auth.isLoggedIn()) {
	   // retrieve user's cart
	 } else {
	   CartFactory.get({id: localStorage.cartId}, function(cart) {
		 $scope.cart = cart;
	   });
	 }
	};



	//instance method (`this` is an *instance* of the class)
	Cart.prototype.addToCart = function(product, quantity) {};

	

	return Cart;

  });
