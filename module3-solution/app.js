(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
.directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  // @input
  narrow.searchTerm = '';

  // @output
  narrow.found = undefined;

  // search menu items
  narrow.narrowItDown = function() {
    MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
      .then(function(foundItems) {
        narrow.found = foundItems;
      });
  }

  // remove item from menu
  narrow.onRemove = function(index) {
    narrow.found.splice(index, 1);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var menu = this;

  // Get item from API and filter by term
  menu.getMatchedMenuItems = function(searchTerm) {

    // fetch data from REST API
    return $http({
      method: 'GET',
      url: (ApiBasePath + '/menu_items.json')
    })
    .then(function (result) {

      // process result and only keep items that match
      var foundItems = searchItems(result.data.menu_items, searchTerm);

      // return processed items
      return foundItems;
    });
  }

  // Filter items by term
  function searchItems(items, searchTerm) {
    return items.filter(function (item) {
      return searchTerm.length > 0 && item.description.indexOf(searchTerm) > -1;
    });
  }
}

function FoundItems() {
  var ddo = {
    restrict: 'E',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    templateUrl: 'foundItems.html',
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var found = this;

  // check if list is empty
  found.isListEmpty = function() {
    return found.foundItems && found.foundItems.length === 0;
  }

  // check if list is full
  found.isListFull = function() {
    return found.foundItems && found.foundItems.length > 0;
  }
}

})();
