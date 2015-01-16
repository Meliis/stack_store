'use strict';

angular.module('stackStoreApp')
  .controller('ProductAddCtrl', function ($scope, productFactory, Category, Auth) {
    $scope.isAdmin = Auth.isAdmin;

    $scope.newProduct = {
    	categories: [],
        images: []
    }
    $scope.newCat = {
        name: ""
    }

    $scope.addedSuccess = false;

    $scope.categories = Category.query();

    $scope.addCategory = function() {
        $scope.categories.push($scope.newCat);
        var cat = new Category({name: $scope.newCat.name});
        cat.$save();
        $scope.newCat.name = "";
    }
    
    $scope.addProduct = function(){
        var num = $scope.newProduct.price
        $scope.newProduct.price = Math.round(num * 100)/100
    	productFactory.addProduct($scope.newProduct);

    	$scope.addedSuccess = true;

    	$scope.addProductForm.$setPristine();
    	$scope.newProduct = {
    		name: "",
    		categories: [],
    		images: [],
    		description: {},
    		price: null
    	}
    }

    $scope.toggleCat = function(cat) {
    	var indexCat = $scope.newProduct.categories.indexOf(cat);

    	if(indexCat > -1){
    		$scope.newProduct.categories.splice(indexCat,1);
    	}
    	else{
    		$scope.newProduct.categories.push(cat);
    	}
    }

  });
