(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  // messages
  var noInputMessage = 'Please enter data first';
  var okMessage = 'Enjoy!';
  var notOkMessage = 'Too much!';

  // style colors
  var okColor = 'green';
  var errorColor = 'red';

  // @input list of comma separated dishes
  $scope.dishes = '';

  // @output message to fill after check
  $scope.message = '';

  // @output style color to fill after check
  $scope.styleColor = '';

  // check the number of dishes
  $scope.check = function() {
    var count = countDishes();

    if(count === 0) {       // if 0 than wait for input
      print(noInputMessage, errorColor);
    } else if(count <=3) {  // if between 0 and 3 than ok
      print(okMessage, okColor);
    } else {                // if more than 3 than not ok
      print(notOkMessage, okColor);
    }
  };

  // count the input dishes
  function countDishes() {
    return $scope.dishes
      .split(',')
      .filter(isNotEmpty)
      .length;
  }

  // check if input item is not empty
  function isNotEmpty(item) {
    return item.trim().length > 0;
  }

  // print the output message
  function print(message, styleColor) {
    $scope.message = message;
    $scope.styleColor = styleColor;
  }
}

})();
