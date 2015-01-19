'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope, Product, Auth, Order, Review, User, $routeParams) {
    $scope.cart;
  	$scope.user = Auth.getCurrentUser();
  	$scope.quantity = 1;
    $scope.isAdmin = Auth.isAdmin;
    $scope.reviews = [];
    $scope.bought = false; // not implemented yet bc orders, man
    $scope.reviewSubmitted = false;
  	
    Product.get({id: $routeParams.id}, function(product) {
        $scope.product = product;
    // this doesn't do anything yet bc orders, man
        $scope.user.orders.forEach(function(order) {
            order.lineItems.forEach(function(lineItem) {
                if(lineItem.productId == $routeParams.id) {
                    $scope.bought = true;
                }
            });
        });
    });

    // ugh this is terrible why am i even
    var reviews = [];
    Review.query().$promise.then(function(reviews) {
        reviews.forEach(function(review) {
            if(review.productId === $routeParams.id) {
                $scope.reviews.push(review);
            }
        });
    });

    $scope.maxStars = [1,2,3,4,5];

    // this is so hacky omg i'm so sorry
    $scope.starClasses = ["","","","",""];
    $scope.setStars = function(num) {
        $scope.newReview.stars = num;
        for (var i = 0; i < num; i++) {
            $scope.starClasses[i] = "star-color";
        }
        for (var i = num; i < 5; i++) {
            $scope.starClasses[i] = "";
        }
    }
    $scope.newReview = {
        userId: $scope.user._id,
        productId: $routeParams.id,
        stars: 0,
        date: new Date(),
        body: ""
    }

    $scope.postReview = function() {
        $scope.reviews.push($scope.newReview);
        Review.save($scope.newReview, function(savedReview) {
            $scope.user.reviews.push(savedReview._id);
            User.update($scope.user);
        });
        $scope.reviewSubmitted = true;
    }

    Cart.getCart(function() {
      $scope.cart = Cart.currentCart;
      Cart.addListener(function() {
        $scope.cart = Cart.currentCart;
      });
    });

    $scope.addToCart = function(productId, quantity) {
      $scope.cart.addToCart(productId, quantity);
      $scope.added = true;
      setTimeout(function() {
        $scope.$apply(function() {
          $scope.added = false
          $scope.quantity = 1;
        })
      }, 3000);
    }
  });
