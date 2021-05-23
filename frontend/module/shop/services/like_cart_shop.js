filmaweb.factory('like_cart_shop', ['$rootScope', 'services', 'toolsLogin', function ($rootScope, services, toolsLogin) {
    let service = {

        likeClick: likeClick
    };
    return service

    function likeClick() {



        $rootScope.likeClick = function (idProduct) {

            console.log(idProduct);
            toolsLogin.getUser();
            var typeLike = document.getElementById('like-' + idProduct).className;
            typeLike = typeLike.split(' ')[2];

            if (localStorage.userID) {
                services.threePost('shop', "likeds", {
                        op: "likeds",
                        typeLike: typeLike,
                        idProduct: idProduct,
                        idUser: localStorage.userID
                    })
                    .then(function () {

                        if (typeLike == 'unlike') {
                            var iconoLike = document.getElementById("like-" + idProduct);
                            iconoLike.className = "far fa-heart like";
                        } else if (typeLike = 'like') {
                            var iconoLike = document.getElementById("like-" + idProduct);
                            iconoLike.className = "fas fa-heart unlike";
                        }
                        // console.log(product);
                    }, function (error) {
                        console.log(error);

                    });
            } else {
                alert("T'has de loguetjar, ficar toastr")
            }
        }

    }








}]);