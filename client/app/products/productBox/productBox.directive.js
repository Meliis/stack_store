'use strict';

angular.module('stackStoreApp')
  .directive('productBox', function () {
    return {
      templateUrl: 'app/products/productBox/productBox.html',
      restrict: 'EA',
      scope: {
      	product: '=info'
      }
      // link: function (scope, element, attrs) {
      // 	$scope.product = element;
      // }
    };
  });

 