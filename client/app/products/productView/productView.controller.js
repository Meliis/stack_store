'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope) {
    $scope.product = {name: 'Time Machine', price: 100000, description: {blurb: "A time machine", full:"More than the last"}, quantity: 4 };

  });
