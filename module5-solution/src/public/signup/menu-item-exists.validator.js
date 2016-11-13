(function () {
"use strict";

angular.module('public')
.directive('menuItemExists', MenuItemExists);

MenuItemExists.$inject = ['$q', 'MenuService'];
function MenuItemExists($q, MenuService) {
  var ddo = {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$asyncValidators.menuItemExists = function(modelValue, viewValue) {
        var def = $q.defer();

        if(modelValue) {
          MenuService.getMenuItem(modelValue)
            .then(function() {
              def.resolve();
            })
            .catch(function() {
              def.reject();
            });
        } else {
          def.reject();
        }

        return def.promise;
      };
    }
  }

  return ddo;
}

})();
