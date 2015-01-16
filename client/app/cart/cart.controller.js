'use strict';

angular.module('stackStoreApp')
  .controller('CartCtrl', function ($scope, CartFactory) {
    $scope.message = 'Hello';
    $scope.cartTotal;

    $scope.cart = [
    {name: 'Time Machine', price: 100000, description: {blurb: "A time machine", full:"More than the last"}, qty: 1 },
    {name: 'Watch', price: 10, description: {blurb: "A time machine", full:"More than the last"}, qty: 1},
    {name: 'Clock', price: 5, description: {blurb: "A time machine", full:"More than the last"}, qty: 1},
    ];

    $scope.calculateTotal = function(){
    	var total = 0;
    	
    	$scope.cart.forEach(function(el){
    		total += el.price;
    	})

    	$scope.cartTotal = total;
    }

    $scope.calculateTotal();

  	});
