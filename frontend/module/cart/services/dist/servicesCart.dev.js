"use strict";

filmaweb.factory('servicesCart', ['services', 'toolsLogin', function (services, toolsLogin, $rootScope) {
  var service = {
    prueba: prueba
  };
  return service;

  function prueba() {
    console.log($rootScope);
  } // function products(getAllCart) {
  //     $rootScope.products=getAllCart;
  // }

}]);