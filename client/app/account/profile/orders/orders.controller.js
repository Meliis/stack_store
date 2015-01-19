'use strict';

angular.module('stackStoreApp')
  .controller('OrdersCtrl', function ($scope, Auth) {
    $scope.user = Auth.getCurrentUser();
  });
