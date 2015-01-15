'use strict';

angular.module('stackStoreApp')
  .controller('ProductAddCtrl', function ($scope, productFactory) {
    $scope.message = 'Hello';

    $scope.newProduct = {
    	categories: [],
        images: []
    }

    $scope.addedSuccess = false;

    $scope.existingCat = ['Cat1', 'Cat2', 'Cat3'];

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
   	// call method to get current categories from factory

  });
