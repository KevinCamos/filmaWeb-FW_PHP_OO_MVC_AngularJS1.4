"use strict";

filmaweb.controller('controller_home', function ($scope, $window, featuredCars, viewedBrands) {
  var brands = 3;
  var total = viewedBrands.length;
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.slides = featuredCars;
  $scope.viewedBrands = viewedBrands.slice(0, brands);
  angular.element($window).on('mousewheel', function () {
    var footerHeight = document.getElementById('container-footer').offsetHeight;
    var position = $window.scrollY + footerHeight;
    var bottom = document.body.scrollHeight - $window.innerHeight; //////

    if (position >= bottom) {
      if (brands < total) {
        brands += 3;
        $scope.viewedBrands = viewedBrands.slice(0, brands);
        $scope.$apply();
      } else {
        angular.element($window).off('mousewheel');
      } // end_else

    } // end_if

  });

  $scope.redirectShopBrand = function (brand) {
    localStorage.brandShop = brand;
    location.href = "#/shop";
  }; // end_redirectShopBrand

}); // end_controller

filmaweb.controller('controller_menu', function ($scope, services_logIn) {
  services_logIn.printMenu();

  $scope.logOut = function () {
    services_logIn.logOut();
  }; // endlogOut

});