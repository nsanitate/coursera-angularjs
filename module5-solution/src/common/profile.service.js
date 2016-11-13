(function () {
"use strict";

angular.module('common')
.service('ProfileService', ProfileService);

function ProfileService() {
  var service = this;

  service.getProfile = function () {
    var storedProfile = localStorage.getItem('storedProfile');
    return JSON.parse(storedProfile);
  };

  service.saveProfile = function (profile) {
    var storedProfile = JSON.stringify(profile);
    localStorage.setItem('storedProfile', storedProfile);
  }

}



})();
