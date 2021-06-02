filmaweb.controller('controller_cart', function ($scope, $rootScope, $route, services, getAllCart, toastr) {

    console.log(getAllCart);
    $scope.products = getAllCart;
    console.log($scope.countCart);
    $scope.cartMenu = $scope.countCart > 0 ? true : false;
    $scope.showModalDelete = false;
    updateTotalPrice()




    /**
     * https://es.stackoverflow.com/questions/77202/obtener-solo-2-decimales
     * @param {*} valor
     */
    $scope.miFormato = function (valor) {
        return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
    };

    $scope.restDeleteClick = function (type, index) {
        type == "delete" || $scope.products[this.$index].cantidad == 1 ?
            toggleModal(this.$index) :
            updateAmount(type, this.$index);
    };

    //FUNCIONES BOTON COMPRAR
    $scope.showModalBuyClick = function () {
        toggleModal(null, "buy");
    };
    $scope.modalOptionBuy = function () {
        console.log(localStorage.token);
        services
            .threePost("cart", "buyCart", {
                token: localStorage.token,
            })
            .then(
                function () {
                    toastr.success(
                        "se ha comprado con éxito, recibirá un correo de confirmación",
                        "Compra Realizada"
                    );
                    $scope.showModalBuy = false;
                    location.href = "#/home";
                },
                function (error) {
                    console.log(error);
                }
            );
    }
    $scope.showModalDelete = false;

    //FIN FUNCIONES BOTON COMPRAR

    $scope.modalOptionDelete = function () {

        updateAmount("delete", localStorage.indexModal);


        $scope.showModalDelete = false;
    };
    $scope.modalOptionDelete = function () {
        updateAmount("delete", localStorage.indexModal);
        $scope.showModalDelete = false;
    };
    $scope.updateAmountClick = function (type, index) {
        updateAmount(type, index);
    };

    function updateAmount(type, index) {
        console.log($scope.products);
        idProduct = $scope.products[index].idproducto;
        idAlbaran = $scope.products[index].idalbaran;

        console.log(index);
        console.log(idProduct);
        services
            .threePost("cart", "updateAmount", {
                type: type,
                idProduct: idProduct,
                idUser: idUser,
                idAlbaran,
                idAlbaran,
            })
            .then(
                function (response) {
                    console.log(response);

                    switch (type) {
                        case "rest":

                            $scope.products[index].cantidad =
                                parseInt($scope.products[index].cantidad) - 1;
                            $rootScope.countCart = parseInt($rootScope.countCart) - 1;

                            toastr.success("Se ha añadido otra unidad al carrito");
                            updateTotalPrice()
                            break;

                        case "sum":
                            $scope.products[index].cantidad =
                                parseInt($scope.products[index].cantidad) + 1;

                            $rootScope.countCart = parseInt($rootScope.countCart) + 1;

                            toastr.success("Se ha eliminado una unidad al carrito");
                            // servicesCart.countCart();
                            updateTotalPrice();
                            break;
                        case "delete":
                            $route.reload();
                            $rootScope.countCart = parseInt($rootScope.countCart) - $scope.products[index].cantidad;
                            updateTotalPrice()
                            $scope.products[index] = null;
                            toastr.success("Se ha eliminado este producto del carrito");
                            break;
                    }
                },
                function (error) {
                    console.log(error);
                }
            );
    }
    $scope.toggleModal = function (index, type) {
        toggleModal(index, type)
    }

    function toggleModal(index, type) {
        localStorage.indexModal = index;

        type ? $scope.showModalBuy = !$scope.showModalBuy : $scope.showModalDelete = !$scope.showModalDelete;
    }

    function updateTotalPrice() {
        var totalPrice = 0;
        for (let index = 0; index < $scope.products.length; index++) {
            totalPrice += $scope.products[index].cantidad * $scope.products[index].price;

            console.log(totalPrice)
        }
        $rootScope.baseImponible = totalPrice / 1.21;
        $rootScope.totalIVA = $rootScope.baseImponible * 0.21;

        $rootScope.totalPrice = totalPrice;
    }

});