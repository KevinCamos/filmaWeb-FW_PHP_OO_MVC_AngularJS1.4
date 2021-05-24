"use strict";

filmaweb.controller('controller_cart', function ($scope, services, getAllCart) {
  // getAllCart();
  console.log(getAllCart);
  $scope.products = getAllCart;
  $scope.cartMenu = true; // function getAllCart() {
  //     var idUser = localStorage.userID ? localStorage.userID : -1;
  //     if (idUser != -1) {
  //         services.threePost('cart', 'getCart', {
  //                 idUser: idUser
  //             })
  //             .then(function (data) {
  //                 $scope.produts = console.log(data);
  //             }, function (error) {
  //                 console.log(error);
  //             });
  //     }
  // }; // end_changeDays
});