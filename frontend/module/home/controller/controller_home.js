filmaweb.controller('controller_home', function ($scope, $window, carousel, homeProducts) {

    $scope.myInterval = 3000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = carousel;
    // $scope.index = 0;
    // $scope.products = homeProducts;


    let movies = 3;
    let total = homeProducts.length;
    $scope.products = homeProducts.slice(0, movies);

    // console.log(homeProducts.slice(1, movies))

    angular.element($window).on('mousewheel', function () {
        let footerHeight = document.getElementById('container-footer').offsetHeight;
        let position = $window.scrollY + footerHeight;
        let bottom = document.body.scrollHeight - $window.innerHeight;


        // alert(bottom+"  "+position)
        //////
        if (position >= bottom) {
            if (movies < total) {
                movies += 3;
                // alert("entra")
                $scope.products = homeProducts.slice(0, movies);
                $scope.$apply();
            } else {
                angular.element($window).off('mousewheel');
            } // end_else
        } // end_if
    });

    /**
     * 
     * @param {Saca la categoría de la imagen del carousel} data 
     */
    $scope.categoryClick = function (data) {
        console.log(data.__proto__.slide.category)
        localStorage.typeFilter = data.__proto__.slide.category;
        location.href = "#/shop";

    }

    $scope.productClick = function (data) {
        console.log(data.product.id)
        localStorage.typeFilter = "productID";
        localStorage.productID = data.product.id;
        
        location.href = "#/shop";

    }
    // $scope.redirectShopBrand = function(brand) {
    //     localStorage.brandShop = brand;
    //     location.href = "#/shop";
    // };// end_redirectShopBrand
}); // end_controller