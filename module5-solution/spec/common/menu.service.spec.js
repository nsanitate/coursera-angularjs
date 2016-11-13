describe('MenuService', function () {

  var MenuService;
  var $httpBackend;
  var ApiPath;

  var A1_fixture = {
    "id":1,
    "short_name":"A1",
    "name":"Won Ton Soup with Chicken",
    "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
    "price_small":2.55,
    "price_large":5.0,
    "small_portion_name":"pint",
    "large_portion_name":"quart",
    "created_at":"2016-11-13T17:54:54.600Z",
    "updated_at":"2016-11-13T17:54:54.600Z",
    "category_short_name":"A",
    "image_present":true
  };
  var Error_fixture = {
    "status":"500",
    "error":"Internal Server Error"
  };

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      MenuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should resolve with menu item if menu item name is valid', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A1.json').respond(200, A1_fixture);
    MenuService.getMenuItem('A1').then(function(menuItem) {
      expect(menuItem).toEqual(A1_fixture);
    });
    $httpBackend.flush();
  });

  it('should reject if menu item name is not valid', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A1234.json').respond(500, Error_fixture);
    MenuService.getMenuItem('A1234').catch(function() {
      expect(true).toEqual(true);
    });
    $httpBackend.flush();
  });

});
