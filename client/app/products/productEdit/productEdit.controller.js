'use strict';

angular.module('stackStoreApp')
  .controller('ProductEditCtrl', function ($scope, $route, $location, Product, Category, Auth) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.categories = Category.query();
    $scope.newCat = {
        name: ""
    }
    $scope.product = Product.get({id: $route.current.params.id}, function(product){
        console.log(product);
    });

    $scope.addCategory = function() {
        $scope.categories.push({name: $scope.newCat.name});
        Category.save({name: $scope.newCat.name});
        $scope.newCat.name = "";
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
    
    $scope.editProduct = function(){
        var num = $scope.product.price
        $scope.price = Math.round(num * 100)/100
        Product.update($scope.product);
        $location.path('/products/'+$route.current.params.id);
    }

    $scope.deleteProduct = function() {
        console.log("ayyyy");
        Product.remove({id: $scope.product._id});
        $location.path('/products');
    }

  });
