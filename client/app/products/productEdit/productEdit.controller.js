'use strict';

angular.module('stackStoreApp')
  .controller('ProductEditCtrl', function ($scope, Product, Category, Auth) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.categories = Category.query();
    $scope.newCat = {
        name: ""
    }

    $scope.addCategory = function() {
        $scope.categories.push($scope.newCat);
        var cat = new Category({name: $scope.newCat.name});
        cat.$save();
        $scope.newCat.name = "";
    }
    
    $scope.editProduct = function(){
        var num = $scope.newProduct.price
        $scope.newProduct.price = Math.round(num * 100)/100
    	Product.editProduct($scope.newProduct);

    	$scope.editProductForm.$setPristine();
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
