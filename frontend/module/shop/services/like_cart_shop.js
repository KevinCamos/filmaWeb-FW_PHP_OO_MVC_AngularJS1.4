filmaweb.factory('like_cart_shop', ['$rootScope', 'services', function ($rootScope, services) {
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
                // alert(typeLike)
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

                        } else if (typeLike = 'like') {
                            document.getElementById("like-" + idProduct) ? document.getElementById("like-" + idProduct).className = "fas fa-heart unlike" : null;
                            document.getElementById("product-" + idProduct) ? document.getElementById("product-" + idProduct).className = "fas fa-heart unlike" : null;

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
                        countIconCart()
                        // toastr.success("Se ha añadido al carrito correctamente");
                             //     });
    //  like_cart_shop.countIconCart();

                    }, function (error) {
                        console.log(error);
                    });
            } else {
                alert("T'has de loguetjar, ficar toastr")
            }
        }

    }

    function countIconCart() {

        // idUser = localStorage.userID ? localStorage.userID : -1;
if(localStorage.userID ){
    idUser = localStorage.userID;
        services.threePost('cart', "countCart", {
                idUser: idUser
            })
            .then(function (data) {
                data=data.split('"');
                $rootScope.countCart= data[1]; 
                console.log($rootScope.countCart)              // toastr.success("Se ha añadido al carrito correctamente");
            }, function (error) {
                console.log(error);
            });
        }

    }






}]);