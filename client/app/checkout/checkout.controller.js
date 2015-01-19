'use strict';

angular.module('stackStoreApp')
  .controller('CheckoutCtrl', function ($scope, Auth, Order, Cart) {

    Stripe.setPublishableKey('pk_test_dA3Hb0dLKm0zVFQQ1DosksSf');
    $scope.errorMessage;
    if(Auth.isLoggedIn()) {
      $scope.user = Auth.getCurrentUser();
        $scope.user.$promise.then(function(user) {
          $scope.order = {userId: user._id, lineItems: [{productName:"Time", productId: '', price:30000, quantity: 1}, {productName:"Something", price:4000, quantity: 2}]};
      });
    } else { 

          Cart.getCart(function() {
            $scope.cart = Cart.currentCart;
            $scope.populatedCart = Cart.populatedCart;
            $scope.order = {lineItems: $scope.populatedCart.lineItems};
            Cart.addListener(function() {
              $scope.cart = Cart.currentCart;
              $scope.populatedCart = Cart.populatedCart;
              $scope.order = {lineItems: $scope.populatedCart.lineItems};
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
    $scope.order.total = sumTotal();
    console.log($scope.order.total);
    Order.save($scope.order, function(order) {
      console.log(order);
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
