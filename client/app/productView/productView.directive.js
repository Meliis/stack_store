'use strict';

angular.module('stackStoreApp')
  .directive('productView', function () {
    return {
      templateUrl: 'app/productView/productView.html',
      restrict: 'EA',
      scope: {
      	product: '=info'
      }
      // link: function (scope, element, attrs) {
      // 	$scope.product = element;
      // }
    };
  });

 