'use strict';

angular.module('stackStoreApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Cart) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    $scope.cartSize;
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    Cart.getCart(function() {
      $scope.cartSize = Cart.currentCart.lineItems.length;
      Cart.addListener(function() {
        $scope.cartSize = Cart.currentCart.lineItems.length;
      });
    });

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

  });