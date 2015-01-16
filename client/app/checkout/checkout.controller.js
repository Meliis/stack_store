'use strict';

angular.module('stackStoreApp')
  .controller('CheckoutCtrl', function ($scope, Auth, $http) {
    

  	$scope.user = Auth.getCurrentUser();
    $scope.user.$promise.then(function(user) {
      $scope.order = {userId: user._id, lineItems: [{productName:"Time", productId: ''}]};
    });


  	var currentOrder = function() {
  		angular.forEach($scope.user.orders, function(order) {
  			if(order.status === 'incomplete') {
  				return order;
  			}
  		})
  	};

  	$scope.userOrder = currentOrder();

  	$scope.checkout = function() {
  		if((/^\d{5}(?:[-\s]\d{4})?$/).test($scope.order.shipping.zip)) {
  			console.log('working');
        $http.post('/api/orders', $scope.order).success(function(response) {
          console.log(response);
        });
  			return true;
  		} else {
  			return false;
  		}
  	};

  

  });
