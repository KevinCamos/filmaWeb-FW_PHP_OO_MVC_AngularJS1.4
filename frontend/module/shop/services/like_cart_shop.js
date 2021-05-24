filmaweb.factory('like_cart_shop', ['$rootScope', 'services', 'toolsLogin', function ($rootScope, services, toolsLogin) {
    let service = {

        likeClick: likeClick,
        cartShop: cartShop
    };
    return service

    function likeClick() {



        $rootScope.likeClick = function (idProduct, classLike) {


            if (localStorage.userID) {
                console.log(idProduct);
                // alert(classLike + '-' + idProduct)
                var typeLike = classLike == 'product' ? document.getElementById('product-' + idProduct).className : document.getElementById('like-' + idProduct).className
                typeLike = typeLike.split(' ')[2];
                // alert(typeLike)
                services.threePost('shop', "likeds", {
                        op: "likeds",
                        typeLike: typeLike,
                        idProduct: idProduct,
                        idUser: localStorage.userID
                    })
                    .then(function () {

                        if (typeLike == 'unlike') {
                            document.getElementById("like-" + idProduct)?  document.getElementById("like-" + idProduct).className = "far fa-heart like":null;
                            document.getElementById("product-" + idProduct)?  document.getElementById("product-" + idProduct).className = "far fa-heart like":null;

                        } else if (typeLike = 'like') {
                            document.getElementById("like-" + idProduct)?  document.getElementById("like-" + idProduct).className = "fas fa-heart unlike":null;
                            document.getElementById("product-" + idProduct)?  document.getElementById("product-" + idProduct).className = "fas fa-heart unlike":null;

                        }
                    }, function (error) {
                        console.log(error);

                    });
            } else {
                alert("T'has de loguetjar, ficar toastr")
            }
        }

    }


    function cartShop() {



        $rootScope.cartClick = function (idProduct) {


            if (localStorage.userID) {
                console.log(idProduct);
                services.threePost('cart', "addLine", {
                        idProduct: idProduct,
                        idUser: localStorage.userID
                    })
                    .then(function (data) {
                        console.log(data);
                        // toastr.success("Se ha añadido al carrito correctamente");

                    }, function (error) {
                        console.log(error);

                    });
            } else {
                alert("T'has de loguetjar, ficar toastr")
            }
        }

    }






}]);