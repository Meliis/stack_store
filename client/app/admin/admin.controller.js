'use strict';

angular.module('stackStoreApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Order) {

    // Use the User $re""e to fetch all users
    $scope.users = User.query();
    // just to make sure you can't remove your own admin permissions.
    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.self = user;
      console.log(user);
    });

    $scope.givePermissions = function(user) {
      user.role = 'admin';
      User.adminUpdate(user);
    };

    $scope.removePermissions = function(user) {
      user.role = 'user';
      User.adminUpdate(user);
    };

    $scope.changePassword = function(user) {
      User.adminChangePassword(user);
      $scope.showForm = false;
    };

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    $scope.orders = Order.query();

    $scope.cancelOrder = function(order){
      if (order.status.indexOf('guest') > -1){
        order.status = 'cancelled_guest';
      }
      else{
        order.status = 'cancelled';
      }
      Order.update(order);
      angular.element("#"+order._id).css({display: 'none'});
    }

    $scope.confirmOrder = function(order){
      if (order.status.indexOf('guest') > -1){
        order.status = 'completed_guest';
      }
      else{
        order.status = 'completed';
      }
      Order.update(order);
    }

  });
