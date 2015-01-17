'use strict';

angular.module('stackStoreApp')
  .controller('ProductEditCtrl', function ($scope, $route, Product, Category, Auth) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.categories = Category.query();
    $scope.newCat = {
        name: ""
    }
    $scope.product = Product.get({id: $route.current.params.id}, function(product){
        console.log(product);
    });

    $scope.addCategory = function() {
        $scope.categories.push({name: $scope.newCat});
        var cat = new Category({name: $scope.newCat.name});
        cat.$save();
        $scope.newCat.name = "";
    }
    
    $scope.editProduct = function(){
        var num = $scope.product.price
        $scope.price = Math.round(num * 100)/100
    	Product.update($scope.product);
    }

    $scope.toggleCat = function(cat) {
    	var indexCat = $scope.product.categories.indexOf(cat._id);

    	if(indexCat > -1){
    		$scope.product.categories.splice(indexCat,1);
    	}
    	else{
    		$scope.product.categories.push(cat._id);
    	}
    }

  });
