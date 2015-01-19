'use strict';

angular.module('stackStoreApp')
  .controller('ProductViewCtrl', function ($scope, Product, Auth, Order, Review, User, $routeParams) {

  	$scope.user = Auth.getCurrentUser();
    $scope.isAdmin = Auth.isAdmin;
    $scope.bought = false;
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
        Review.save($scope.newReview, function(savedReview) {
            $scope.user.reviews.push(savedReview._id);
            User.update($scope.user);
        });
    }

    $scope.addToCart = function(quantity) {
    	var productExists = false;
    	angular.forEach($scope.user.orders[0].products, function(product) {
    		if($scope.product._id === product.product._id) {
    			product.qty += quantity;
    			productExists = true;
    		}
    	});

    	if(productExists === false) {
	    	$scope.user.orders[0].products.push({product: $scope.product, qty: quantity});    		
    	}

    	$scope.quantity = 1;
    };

    //initiate temporary banner for the cart

  });
