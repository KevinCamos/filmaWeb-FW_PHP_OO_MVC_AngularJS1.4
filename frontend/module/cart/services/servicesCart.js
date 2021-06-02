filmaweb.factory('servicesCart', ['toolsLogin', function ($rootScope) {
    let service = {
        countCart: countCart,
    };
    return service;

    function countCart() {
        console.log($rootScope.countCart);
        $rootScope.countCart = 99;
        console.log($rootScope.countCart);

    }

    // function products(getAllCart) {

    //     $rootScope.products=getAllCart;
    // }
}]);