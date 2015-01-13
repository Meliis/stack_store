'use strict';

describe('Controller: ProductViewCtrl', function () {

  // load the controller's module
  beforeEach(module('stackStoreApp'));

  var ProductViewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductViewCtrl = $controller('ProductViewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
