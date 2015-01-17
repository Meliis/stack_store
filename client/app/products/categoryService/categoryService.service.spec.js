'use strict';

describe('Service: categoryFactory', function () {

  // load the service's module
  beforeEach(module('stackStoreApp'));

  // instantiate service
  var categoryService;
  beforeEach(inject(function (_categoryFactory_) {
    categoryFactory = _categoryFactory_;
  }));

  it('should do something', function () {
    expect(!!categoryFactory).toBe(true);
  });

});
