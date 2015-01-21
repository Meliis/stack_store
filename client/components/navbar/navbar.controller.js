'use strict';

angular.module('stackStoreApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Order, Cart, Category) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.showSearch = false;

    $scope.categories = Category.query();

    $scope.toggleSearch = function() {
      $scope.showSearch = !$scope.showSearch;
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
      Cart.startNewCart();
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });