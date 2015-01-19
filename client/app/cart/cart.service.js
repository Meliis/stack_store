'use strict';

angular.module('stackStoreApp')
  .factory('Cart', function ($resource, Auth) {
	// AngularJS will instantiate a singleton by calling "new" on this function


	var Cart = $resource('api/cart/:id', { id: '@_id'}, {
		update: {
			method: 'PUT'
		},
		populate: {
			method: 'GET',
			url: 'api/cart/:id/populate'
		},
		getByUserId: {
			method: 'GET',
			url: 'api/cart/user/:userId',
		} 
	});

	Cart.listeners = [];

	Cart.notifyListeners = function() {
		Cart.listeners.forEach(function(listener) {
			listener();
		})
	};

	Cart.addListener = function(listener) {
		Cart.listeners.push(listener);
		listener();
	};

	Cart.populateCart = function(cartId, done) {
		Cart.populate({id: cartId}, function(cart) {
			Cart.populatedCart = cart;
			Cart.notifyListeners();
			if (done) {
				done();
			}
		})
	};

	Cart.mergeCarts = function(userId) {
		if (localStorage.cartId) {
			Cart.get({id: localStorage.cartId}, function(cart) {
				Cart.getByUserId({userId: userId}, function(userCart) {
					cart.lineItems.forEach(function(lineItem) {
						userCart.addToCart(lineItem.item, lineItem.quantity); 
					});
					localStorage.clear();
					cart.$remove();
					Cart.getCart();
				});
			});
		}
	};



	Cart.getCart = function(func) {
		if (Auth.isLoggedIn()) {
			var user = Auth.getCurrentUser().$promise.then(function(user) {
			// retrieve user's cart
				Cart.getByUserId({userId: user._id}, function(cart) {
					Cart.currentCart = cart;
					Cart.populateCart(cart._id, func);
				});
	   	})} else {			
				Cart.get({id: localStorage.cartId}, function(cart) {
					Cart.currentCart = cart;
					Cart.populateCart(cart._id, func);
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

	Cart.startAuthCart = function(userId) {
		var newCart = new Cart({userId: userId, lineItems: [], date: new Date()});
		newCart.$save(function() {
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
			cart.lineItems.push({item: productId, quantity: quantity});
			cart.$update();
		}

		Cart.notifyListeners();

	};

// Cart.prototype.calculateTotal needs work (could run into async issues)
	Cart.prototype.calculateTotal = function() {
		var cart = this;
		var total = 0;

		cart.lineItems.forEach(function(lineItem) {
			total += lineItem.item.price * lineItem.quantity;
		})
	};



	return Cart;

  });
