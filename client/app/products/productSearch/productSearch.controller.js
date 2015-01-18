'use strict';

angular.module('stackStoreApp')
  .controller('ProductSearchCtrl', function ($scope, $route, $http, Product) {
  	Product.search({query: $route.current.params.query}, function(products) {
    		$scope.products = products.map(function(result){return result.product});
  	});
  });
