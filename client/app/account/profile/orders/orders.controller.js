'use strict';

angular.module('stackStoreApp')
  .controller('OrdersCtrl', function ($scope, Auth) {
    Auth.getPopulatedUser().$promise.then(function(user) {
        $scope.orders = user.orders;
    });
  });
