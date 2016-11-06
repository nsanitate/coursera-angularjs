(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'view/categories.component.html',
  bindings: {
    categories: '<'
  }
});

})();
