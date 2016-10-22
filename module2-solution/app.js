(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  // @output list of to buy items
  toBuy.items = ShoppingListCheckOffService.toBuyItems;

  // mark item as bought
  toBuy.bought = function(item) {
    ShoppingListCheckOffService.bought(item);
  };

  // check if list is empty
  toBuy.isListEmpty = function() {
    return toBuy.items.length === 0;
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  // @output list of bought items
  bought.items = ShoppingListCheckOffService.boughtItems;

  // check if list is empty
  bought.isListEmpty = function() {
    return bought.items.length === 0;
  }
}

function ShoppingListCheckOffService() {
  var shoppingList = this;

  // list of to buy items
  shoppingList.toBuyItems = [
    { name: "cookies", quantity: 10 },
    { name: "milk", quantity: 2 },
    { name: "bread", quantity: 5 },
    { name: "snacks", quantity: 8 },
    { name: "candies", quantity: 20 }
  ];

  // list of bought items
  shoppingList.boughtItems = [];

  // mark item as bought
  shoppingList.bought = function (item) {
    var index = shoppingList.toBuyItems.indexOf(item);
    shoppingList.toBuyItems.splice(index, 1);
    shoppingList.boughtItems.push(item);
  }
}

})();
