filmaweb.controller('controller_shop', function ($scope, services, filters_shop) {

    openShop();

    $scope.productClick = function (data) {
        localStorage.typeFilter = "productID";
        console.log(data.product.id);
        localStorage.productID = data.product.id;
        openShop();
        // $scope.$apply();

    }

    $scope.filterClick = function () {
        console.log(typeof ($scope.titulo))
        var titulo = $scope.titulo;
        console.log(typeof (titulo))
        // var filter = new Array();
        let page = $scope.titulo ? $scope.titulo : ''; //saca el número de páginas en un entero
        alert(page)
        var filter = $scope.titulo ? [$scope.titulo] : [''];
        filter.push($scope.director ? $scope.director : '');
        filter.push($scope.year ? $scope.year : 0);

        var priceMin = $scope.priceMin ? $scope.priceMin : 0;
        var priceMax = $scope.priceMax ? $scope.priceMax : 999;

        if (priceMax >= priceMin) {
            filter.push(priceMin);
            filter.push(priceMax);


        } else {
            filter.push(priceMax);
            filter.push(priceMin);
        }

        // localStorage.typeFilter = "filter";
        // localStorage.typeFilter = "filter";

        filters_shop.getListShop("filter", filter);

    } ///END filterClick

    function openShop() {
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
    }
});