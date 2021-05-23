"use strict";

filmaweb.factory('like_cart_shop', ['$rootScope', 'services', function ($rootScope, services) {
  var service = {
    likeClick: likeClick
  };
  return service;

  function likeClick() {
    $rootScope.likeClick = function (data) {}; // services.threePost('shop', "productID", {
    //         id: id
    //     })
    //     .then(function (product) {
    //         console.log(product);
    //         $rootScope.product = product[0];
    //     }, function (error) {
    //         console.log(error);
    //     });

  }
}]);