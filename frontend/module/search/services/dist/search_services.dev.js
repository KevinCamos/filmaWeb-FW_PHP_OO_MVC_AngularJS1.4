"use strict";

filmaweb.factory('search_services', ['$rootScope', 'services', function ($rootScope) {
  var service = {
    searchFunction: searchFunction
  };
  return service;

  function searchFunction($route) {
    $rootScope.searchShop = function (keyEvent, value) {
      if (keyEvent.which === 13) {
        localStorage.filter = value;
        localStorage.typeFilter = "searchList";
        location.href = "#/shop";
        $route.reload();
      }
    };
  } // end_logIn

}]);