"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

filmaweb.controller('controller_cart', function ($scope, services, getAllCart) {
  console.log(getAllCart);
  $scope.products = getAllCart;
  $scope.cartMenu = true;
  $scope.showModal = false; // $scope.toggleModal = function () {
  //     $scope.showModal = !$scope.showModal;
  // };

  $scope.toggleOk = function (pepino) {
    console.log(pepino);
    alert(pepino);
  };
  /**
   * https://es.stackoverflow.com/questions/77202/obtener-solo-2-decimales
   * @param {*} valor 
   */


  $scope.miFormato = function (valor) {
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  };

  $scope.updateAmountClick = function (type, index, idProduct, idAlbaran) {
    console.log(index);
    console.log(idProduct);

    if (type == 'delete') {
      $scope.showModal = !$scope.showModal;
    }

    services.threePost('cart', 'updateAmount', _defineProperty({
      type: type,
      idProduct: idProduct,
      idUser: idUser,
      idAlbaran: idAlbaran
    }, "idAlbaran", idAlbaran)).then(function (response) {
      console.log(response); // if (type == 'rest') $scope.products[index].cantidad -= 1;
      // else if (type == 'sum') $scope.products[index].cantidad += 1;

      switch (type) {
        case 'rest':
          $scope.products[index].cantidad = parseInt($scope.products[index].cantidad) - 1;
          break;

        case 'sum':
          $scope.products[index].cantidad = parseInt($scope.products[index].cantidad) + 1;
          break;
      }
    }, function (error) {
      console.log(error);
    }); //         .then(function(response) {
    //             console.log(response);
    //             updateCart();
    //         }, function(error) {
    //             console.log(error);
    //         });
    // $scope.products[index].cantidad =5;
  }; //     $scope.changeDays = function(carPlate) {
  //          var idUser = getUser();
  //   if (idUser != -1) {
  //         services.put('cart', 'updateDays', {days: $scope.qtyDays[carPlate], JWT: localStorage.token, carPlate: carPlate})
  //         .then(function(response) {
  //             console.log(response);
  //             updateCart();
  //         }, function(error) {
  //             console.log(error);
  //         });
  //     };// end_changeDays

});