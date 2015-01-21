'use strict';

angular.module('stackStoreApp')
  .controller('StatusCtrl', function ($scope, Auth, User, Order) {

    if(Auth.getCurrentUser() === 'null') {
    	console.log('hey');
  	Auth.getPopulatedUser().$promise.then(function(user) {
        $scope.order = user.orders[0];
        $scope.order.total = sumTotal();

    });

  } else {
  	$scope.order = Order.latestOrder;
  	$scope.order.total = sumTotal();
  }

function sumTotal() {
  var total = 0
  $scope.order.lineItems.forEach(function(lineItem){
    var subtotal = lineItem.price * lineItem.quantity;
    total += subtotal
  });
  return total;
}

  });
