filmaweb.controller('controller_shop', function ($scope, services, filters_shop) {

    if (localStorage.typeFilter == "productID") {
        $scope.listProducts = false;
        $scope.oneProduct = true;

        filters_shop.getProduct(localStorage.productID);
    } else {
        $scope.listProducts = true;
        $scope.oneProduct = false;
        console.log(localStorage.typeFilter)
        filters_shop.getListShop(localStorage.typeFilter);
        // $scope.$apply();

    }

    // {{show ? 'hide' : 'show'}}
    // filters_shop.paginationClick()

});