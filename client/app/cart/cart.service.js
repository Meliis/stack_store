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

	Cart.listeners = [];

	Cart.notifyListeners = function() {
		Cart.listeners.forEach(function(listener) {
			console.log("I'm listening..", listener);
			listener();
		})
	}

	Cart.addListener = function(listener) {
		Cart.listeners.push(listener);
	}

	Cart.populateCart = function(cartId) {
		Cart.populate({id: cartId}, function(cart) {
			Cart.populatedCart = cart.lineItems;
			Cart.notifyListeners();
		})
	}

	Cart.getCart = function() {
		if (Auth.isLoggedIn()) {
			// retrieve user's cart
		} else {
			Cart.get({id: localStorage.cartId}, function(cart) {
				Cart.currentCart = cart;
				Cart.populateCart(cart._id);
	   	});
		}
	};

	Cart.startNewCart = function() {
		localStorage.removeItem('cartId');
		localStorage.removeItem('cartDate');
		var newCart = new Cart({lineItems: [], date: new Date()});
		newCart.$save(function() {
		  var date = new Date();
		  localStorage.cartId = newCart._id;
		  localStorage.cartDate = date.getTime();
			Cart.getCart();
		});

	};

	//instance method (`this` is an *instance* of the class)
	Cart.prototype.addToCart = function(productId, quantity) {
		var productExists = false;
		var cart = this;

		cart.lineItems.forEach(function(lineItem) {
			if (lineItem.item === productId) {
			  lineItem.quantity += quantity;
			  cart.$update();
			  productExists = true;
			}
		});

		if (productExists === false) {
			this.lineItems.push({item: productId, quantity: quantity});
			this.$update();
		}

// Add to cart works, but going to cart before refreshing page does NOT.

		Cart.notifyListeners();

	};

	

	// var productExists = false;

	// angular.forEach($scope.cart.lineItems, function(lineItem) {
	//   if (lineItem.item === productId) {
	//     lineItem.quantity += quantity;
	//     $scope.cart.$update();
	//     productExists = true;
	//   }
	// });

	// if (productExists === false) {
	//   $scope.cart.lineItems.push({item: productId, quantity: quantity});
	//   $scope.cart.$update();
	// }

	// $scope.quantity = 1;
	// CartFactory.getCart();


























	return Cart;

  });
