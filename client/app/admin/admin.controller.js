'use strict';

angular.module('stackStoreApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    // just to make sure you can't remove your own admin permissions.
    Auth.getCurrentUser().$promise.then(function(user) {
      $scope.self = user;
      console.log(user);
    });

    $scope.givePermissions = function(user) {
      user.role = 'admin';
      User.update(user);
    }

    $scope.removePermissions = function(user) {
      user.role = 'user';
      User.update(user);
    }

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
