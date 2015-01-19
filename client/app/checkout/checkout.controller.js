'use strict';

angular.module('stackStoreApp')
  .controller('CheckoutCtrl', function ($scope, Auth, Order, Cart, User) {

    Stripe.setPublishableKey('pk_test_dA3Hb0dLKm0zVFQQ1DosksSf');
    $scope.errorMessage;
    if(Auth.isLoggedIn()) {
      $scope.user = Auth.getCurrentUser();
        $scope.user.$promise.then(function(user) {
          $scope.order = {"userId":user._id, "lineItems":[{"item":{"_id":"54bd679f17b17d2c30747729","name":"Adventure Time","price":50,"quantity":3000,"__v":0,"reviews":[],"images":[],"categories":["54b54dbd356afaad0411ed12"],"description":{"blurb":"Dis be a blurb","full":"Like the show, but better"}},"quantity":5,"_id":"54bd6abf17b17d2c30747733"},{"item":{"_id":"54bd679f17b17d2c3074772a","name":"Leisure Time","price":725,"quantity":7000,"__v":0,"reviews":[],"images":[],"categories":["54b54dbd356afaad0411ed12","54b54dbd356afaad0411ed14"],"description":{"blurb":"Dis be a blurb","full":"Great for people who need a break"}},"quantity":3,"_id":"54bd6ac917b17d2c30747734"}],"total":2425};
      });
    } else { 

          Cart.getCart(function() {
            $scope.cart = Cart.currentCart;
            $scope.populatedCart = Cart.populatedCart;
            $scope.order = {lineItems: $scope.populatedCart.lineItems};
            $scope.order.total = sumTotal();
            Cart.addListener(function() {
              $scope.cart = Cart.currentCart;
              $scope.populatedCart = Cart.populatedCart;
              $scope.order = {lineItems: $scope.populatedCart.lineItems};
              $scope.order.total = sumTotal();
            });
    });
    }

  	$scope.checkout = function() {
  		if((/^\d{5}(?:[-\s]\d{4})?$/).test($scope.order.shipping.zip)) {
  			console.log('working');
        Stripe.card.createToken($scope.ccinfo, stripeResponseHandler);
  			return true;
  		} else {
  			return false;
  		}
  	};

function stripeResponseHandler(status, response) {
  if (response.error) {
    // show the errors on the form
    $scope.errorMessage = response.error.message;
    $scope.$apply();
  } else {
    // token contains id, last4, and card type
    $scope.order.billing.stripeToken = response['id'];
    $scope.order.billing.cardType = response['card']['brand'];
    $scope.order.billing.last4 = response['card']['last4'];
    angular.forEach($scope.order.lineItems, function(lineItem) {
      lineItem.productId = lineItem.item._id;
      lineItem.productName = lineItem.item.name;
      lineItem.price = lineItem.item.price;
    });
    Order.save($scope.order, function(order) {
      console.log(order);
      $scope.user.orders.push(order._id);
      User.update($scope.user);

    });
  }
}

function sumTotal() {
  var total = 0
  $scope.order.lineItems.forEach(function(lineItem){
    var subtotal = lineItem.item.price * lineItem.quantity;
    total += subtotal
  });
  return total;
}
  });
