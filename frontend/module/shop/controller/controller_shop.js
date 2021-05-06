filmaweb.controller('controller_shop', function ($scope, services, listShop) {
    var listProducts = true;
    $scope.listProducts = listProducts;




    if (listProducts) {
        position = 0
        movies = 6;
        // movies = position == maxPagination ? maxPagination : position + 6;
        $scope.products = listShop.slice(position, position + 6);

        // let page= (listShop.length/6);
        let page = (listShop.length % 6) == 0 ? (listShop.length / 6) : (listShop.length / 6 + 1).toFixed(); //saca el número de páginas en un entero
        var maxPagination = listShop.length % 6 == 0 ? (listShop.length - 6) : listShop.length- (listShop.length % 6)

        console.log(page);
        var pagination = [0]

        for (var i = 1; i <= page; i++) {
            pagination.push(i)
        }
        pagination.shift();
        console.log(pagination)

        $scope.pagination = pagination;


    }
    $scope.paginationClick = function (data) {
        switch (data) {
            case "prev":
                position = position == 0 ? position : position - 6;
                break;
            case "next":
                position = position == maxPagination ? position : position + 6;
                break;
            default:
                position = data.page == pagination[pagination.length] ? maxPagination : data.page * 6 - 6;;
        }
        $scope.products = listShop.slice(position, position + 6);
        // alert(position);
        $scope.$apply();


    };

});