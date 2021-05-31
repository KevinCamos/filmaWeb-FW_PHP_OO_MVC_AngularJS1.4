filmaweb.controller('controller_cart', function ($scope, $route, services, getAllCart, servicesCart) {

    console.log(getAllCart);
    $scope.products = getAllCart;
    console.log($scope.countCart)
    $scope.cartMenu = $scope.countCart > 0 ? true : false;
    $scope.showModalDelete = false;
    // $scope.toggleModal = function () {
    //     $scope.showModalDelete = !$scope.showModalDelete;scope
    // };





    /**
     * https://es.stackoverflow.com/questions/77202/obtener-solo-2-decimales
     * @param {*} valor 
     */
    $scope.miFormato = function (valor) {
        return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
    }


    $scope.restDeleteClick = function (type, index) {
        type == 'delete' || $scope.products[this.$index].cantidad == 1 ? toggleModal(this.$index) : updateAmount(type, this.$index);
    }

    //FUNCIONES BOTON COMPRAR
    $scope.showModalBuyClick = function () {
        toggleModal(null, 'buy')
    }
    $scope.modalOptionBuy = function () {
        console.log(localStorage.token)

        services.threePost('cart', 'buyCart', {
                token: localStorage.token,
            })
            .then(function (response) {
                console.log(response);
                $scope.showModalDelete = false;
                location.href = "#/home";

            }, function (error) {
                console.log(error);
            });

        $scope.showModalDelete = false;

    }

    //FIN FUNCIONES BOTON COMPRAR
    $scope.modalOptionDelete = function () {
        updateAmount('delete', localStorage.indexModal)
        $scope.showModalDelete = false;
    }
    $scope.modalOptionDelete = function () {
        updateAmount('delete', localStorage.indexModal);
        $scope.showModalDelete = false;
    }
    $scope.updateAmountClick = function (type, index) {
        updateAmount(type, index);
    }



    function updateAmount(type, index) {
        console.log($scope.products)
        idProduct = $scope.products[index].idproducto;
        idAlbaran = $scope.products[index].idalbaran;

        console.log(index)
        console.log(idProduct)
        services.threePost('cart', 'updateAmount', {
                type: type,
                idProduct: idProduct,
                idUser: idUser,
                idAlbaran,
                idAlbaran
            })
            .then(function (response) {
                console.log(response);
                // if (type == 'rest') $scope.products[index].cantidad -= 1;
                // else if (type == 'sum') $scope.products[index].cantidad += 1;
                switch (type) {
                    case 'rest':
                        $scope.products[index].cantidad = parseInt($scope.products[index].cantidad) - 1
                        break;
                    case 'sum':
                        $scope.products[index].cantidad = parseInt($scope.products[index].cantidad) + 1
                        break;
                    case 'delete':
                        // let row = "#row-" + this.$index;

                        // document.getElementById("row-" + index).className = "hideRow"
                        $route.reload();
                        $scope.products[index] = null;
                        break;
                }

            }, function (error) {
                console.log(error);
            });
    }

    function toggleModal(index, type) {
        localStorage.indexModal = index;

        type ? $scope.showModalBuy = !$scope.showModalBuy : $scope.showModalDelete = !$scope.showModalDelete;
    }


});