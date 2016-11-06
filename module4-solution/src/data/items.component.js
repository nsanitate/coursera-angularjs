(function () {
'use strict';

angular.module('data')
.component('items', {
  templateUrl: 'view/items.component.html',
  bindings: {
    items: '<'
  }
});

})();
