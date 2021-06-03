filmaweb.factory('like_cart_shop', ['$rootScope', 'services', 'toastr', function ($rootScope, services, toastr) {
    let service = {

        likeClick: likeClick,
        cartShop: cartShop,
        countIconCart: countIconCart
    };
    return service

    function likeClick() {

        $rootScope.likeClick = function (idProduct, classLike) {


            if (localStorage.userID) {
                console.log(idProduct);
                // alert(classLike + '-' + idProduct)
                var typeLike = classLike == 'product' ? document.getElementById('product-' + idProduct).className : document.getElementById('like-' + idProduct).className
                typeLike = typeLike.split(' ')[2];
                services.threePost('shop', "likeds", {
                        op: "likeds",
                        typeLike: typeLike,
                        idProduct: idProduct,
                        idUser: localStorage.userID
                    })
                    .then(function () {

                        if (typeLike == 'unlike') {
                            document.getElementById("like-" + idProduct) ? document.getElementById("like-" + idProduct).className = "far fa-heart like" : null;
                            document.getElementById("product-" + idProduct) ? document.getElementById("product-" + idProduct).className = "far fa-heart like" : null;
                            toastr.success("Se ha eliminado este producto a favoritos", "Eliminado");

                        } else if (typeLike = 'like') {
                            document.getElementById("like-" + idProduct) ? document.getElementById("like-" + idProduct).className = "fas fa-heart unlike" : null;
                            document.getElementById("product-" + idProduct) ? document.getElementById("product-" + idProduct).className = "fas fa-heart unlike" : null;
                            toastr.success("Se ha añadido este producto a favoritos", "Añadido");

                        }
                    }, function (error) {
                        console.log(error);

                    });
            } else {
                toastr.error("Tienes que conectarte con una cuenta de usuario", "Error");
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
                        sumClientCart();
                        toastr.success("Se ha añadido este producto a carrito", "Añadido");

                    }, function (error) {
                        console.log(error);
                    });
            } else {
                toastr.error("Tienes que conectarte con una cuenta de usuario", "Error");

            }
        }

    }

    function sumClientCart() {
        console.log("entra")
         $rootScope.countCart>=0? ($rootScope.countCart= parseInt($rootScope.countCart)+1):countIconCart();
    }
    function countIconCart() {
        console.log('+1')
        if (localStorage.userID) {
            idUser = localStorage.userID;
            services.threePost('cart', "countCart", {
                    idUser: idUser
                })
                .then(function (data) {
                    data = data.split('"');
                    
                    $rootScope.countCart = data[1];
                    console.log($rootScope.countCart)
                }, function (error) {
                    console.log(error);
                });
        }

    }






}]);