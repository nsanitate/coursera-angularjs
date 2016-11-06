(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    template: '<h3>Welcome to our Restaurant</h3><a ui-sref="categories">Go to menu</a>'
  })

  // Categories page
  .state('categories', {
    url: '/categories',
    templateUrl: 'view/categories.controller.html',
    controller: 'CategoriesController as $ctrl',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items page
  .state('categories.items', {
    url: '/items/{category}',
    templateUrl: 'view/items.controller.html',
    controller: 'ItemsController as $ctrl',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.category);
      }]
    }
  })
}

})();
