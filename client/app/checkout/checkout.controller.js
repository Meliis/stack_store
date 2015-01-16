'use strict';

angular.module('stackStoreApp')
  .controller('CheckoutCtrl', function ($scope, Auth, $http) {

    Stripe.setPublishableKey('pk_test_dA3Hb0dLKm0zVFQQ1DosksSf');
    

  	$scope.user = Auth.getCurrentUser();
    $scope.errorMessage;
    $scope.user.$promise.then(function(user) {
      $scope.order = {userId: user._id, lineItems: [{productName:"Time", productId: ''}]};
    });


  	// var currentOrder = function() {
  	// 	angular.forEach($scope.user.orders, function(order) {
  	// 		if(order.status === 'incomplete') {
  	// 			return order;
  	// 		}
  	// 	})
  	// };

  	// $scope.userOrder = currentOrder();

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
    // insert the token into the form so it gets submitted to the server
    // form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
    // and submit
    $http.post('/api/orders', $scope.order).success(function(response) {
          console.log(response);
        });
  }
}
  

  });
