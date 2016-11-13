(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'ProfileService'];
function SignupController(MenuService, ProfileService) {
  var signupCtrl = this;

  signupCtrl.submit = function() {
    signupCtrl.completed = false;

    MenuService.getMenuItem(signupCtrl.menuItem)
      .then(function (menuItem) {
        signupCtrl.profile.favoriteDish = menuItem;
        ProfileService.saveProfile(signupCtrl.profile);
        signupCtrl.completed = true;
      });
  }
}

})();
