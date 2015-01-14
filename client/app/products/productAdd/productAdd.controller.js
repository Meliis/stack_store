'use strict';

angular.module('stackStoreApp')
  .controller('ProductAddCtrl', function ($scope, productFactory) {
    $scope.message = 'Hello';

    $scope.newProduct = {
    	categories: []
    }

    $scope.existingCat = ['Cat1', 'Cat2', 'Cat3'];

    $scope.addProduct = function(){
    	productFactory.addProduct($scope.newProduct);
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
