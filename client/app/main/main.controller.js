'use strict';

angular.module('stackStoreApp')
  .controller('MainCtrl', function ($scope, $http, Product, Category) {
    $scope.products = Product.query();

    $scope.categories = Category.query();

  });
