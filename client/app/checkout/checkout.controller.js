'use strict';

angular.module('stackStoreApp')
  .controller('CheckoutCtrl', function ($scope, Auth, $http) {

    Stripe.setPublishableKey('pk_test_dA3Hb0dLKm0zVFQQ1DosksSf');
    

  	$scope.user = Auth.getCurrentUser();
    $scope.errorMessage;
    $scope.user.$promise.then(function(user) {
      $scope.order = {userId: user._id, lineItems: [{productName:"Time", productId: '', price:50000, quantity: 1}, {productName:"Something", price:4000, quantity: 2}]};
    });

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
  } else {
    // token contains id, last4, and card type
    $scope.order.billing.stripeToken = response['id'];
    $scope.order.billing.cardType = response['card']['brand'];
    $scope.order.billing.last4 = response['card']['last4'];
    $scope.order.total = sumTotal();
    $http.post('/api/orders', $scope.order).success(function(response) {
          console.log(response);
        });
  }
}

function sumTotal() {
  var total = 0
  $scope.order.lineItems.forEach(function(lineItem){
    console.log(lineItem);
    var subtotal = lineItem.price * lineItem.quantity;
    total += subtotal
  });
  console.log(total);
  return total;
}
  

  });
