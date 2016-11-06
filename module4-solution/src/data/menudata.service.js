(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var menuData = this;

  // Get categories from API
  menuData.getAllCategories = function() {
    // fetch data from REST API
    return $http({
      method: 'GET',
      url: (ApiBasePath + '/categories.json')
    })
    .then(function(result) {
      return result.data;
    });
  }

  menuData.getItemsForCategory = function(categoryShortName) {
    // fetch data from REST API
    return $http({
      method: 'GET',
      url: (ApiBasePath + '/menu_items.json'),
      params: {category: categoryShortName}
    })
    .then(function(result) {
      return result.data.menu_items;
    });
  }
}

})();
