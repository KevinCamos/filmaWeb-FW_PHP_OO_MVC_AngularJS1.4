filmaweb.controller('controller_home', function ($scope, $window, carousel, homeProducts) {

    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = carousel;
    // $scope.index = 0;
    $scope.products = homeProducts;
    console.log(homeProducts)

    // console.log(carousel);
    // console.log(homeProducts);

    // // let brands = 3;
    // // let total = homeProducts.length;

    // $scope.myInterval = 5000;
    // // $scope.noWrapSlides = false;
    // $scope.active = 0;
    // $scope.slides = carousel;
    // // $scope.homeProducts = homeProducts.slice(0, brands);

    // angular.element($window).on('mousewheel', function() {
    //     let footerHeight = document.getElementById('container-footer').offsetHeight;
    //     let position = $window.scrollY + footerHeight;
    //     let bottom = document.body.scrollHeight - $window.innerHeight;
    //     //////
    //     if (position >= bottom) {
    //         if (brands < total) {
    //             brands += 3;
    //             $scope.homeProducts = homeProducts.slice(0, brands);
    //             $scope.$apply();
    //         }else {
    //             angular.element($window).off('mousewheel');
    //         }// end_else
    //     }// end_if
    // });

    // $scope.redirectShopBrand = function(brand) {
    //     localStorage.brandShop = brand;
    //     location.href = "#/shop";
    // };// end_redirectShopBrand
}); // end_controller