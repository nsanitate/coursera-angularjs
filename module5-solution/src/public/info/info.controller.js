(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['profile'];
function InfoController(profile) {
  var infoCtrl = this;

  infoCtrl.profile = profile;
}

})();
