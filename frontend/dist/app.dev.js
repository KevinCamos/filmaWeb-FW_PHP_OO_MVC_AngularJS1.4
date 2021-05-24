"use strict";

var filmaweb = angular.module('filmaweb', ['ngRoute', 'ui.bootstrap']); // var filmaweb = angular.module('filmaweb', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize', 'toastr', 'ui.bootstrap']);
//////

filmaweb.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when("/home", {
    templateUrl: "frontend/module/home/view/view_home.html",
    controller: "controller_home",
    resolve: {
      carousel: function carousel(services) {
        var data = services.twoGet('home', 'carousel');
        return data;
      },
      homeProducts: function homeProducts(services) {
        // console.log(services);
        var data = services.twoGet('home', 'homeProducts'); // console.log(data);

        return data;
      }
    } // end_resolve

  }).when("/shop", {
    templateUrl: "frontend/module/shop/view/view_shop.html",
    controller: "controller_shop"
  }).when("/login", {
    templateUrl: "frontend/module/login/view/view_login.html",
    controller: "controller_login"
  }).when("/login/recoveredPassword/:token", {
    templateUrl: "frontend/module/login/view/view_login.html",
    controller: "recoveredPassword",
    resolve: {
      dataRecovered: function dataRecovered(services, $route) {
        var data = services.threePost('login', 'recoveredPassword', {
          'token': $route.current.params.token
        });
        return data;
      } // end_checkToken

    } // end_resolve

  }).when("/login/userVerify/:token", {
    resolve: {
      userVerify: function userVerify(services, $route) {
        services.put('login', 'recoveredMail', {
          'token': $route.current.params.token
        }).then(function (response) {
          // toastr.success("Se ha enviado a tu e-mail un enlace para restablecer la contraseña");
          location.href = "#/login";
        }, function (error) {
          // toastr.success("Ha habido un error en el servicio");
          console.log(error);
        }); // end_services
      } // end_activateUser

    }
  }).when("/cart", {
    templateUrl: "frontend/module/cart/view/view_cart.html",
    controller: "controller_cart",
    resolve: {
      getAllCart: function getAllCart(services) {
        var idUser = localStorage.userID ? localStorage.userID : -1;

        if (idUser != -1) {
          var data = services.threePost('cart', 'getCart', {
            idUser: idUser
          });
          return data;
        } else {
          return null;
        }
      }
    }
  }).otherwise("/home", {
    templateUrl: "frontend/module/home/view/view_home.html",
    controller: "controller_home",
    resolve: {
      carousel: function carousel(services) {
        // console.log(services);
        var data = services.get('home', 'carousel'); // console.log(data);

        return data;
      },
      homeProducts: function homeProducts(services) {
        // console.log(services);
        var data = services.get('home', 'homeProducts'); // console.log(data);

        return data;
      }
    }
  });
}]);
filmaweb.run(function ($rootScope, $route, toolsLogin, search_services, like_cart_shop) {
  //      angular.element(document).ready(function() {
  toolsLogin.checkToken();
  toolsLogin.closeSession();
  search_services.searchFunction($route);

  if (localStorage.userID) {
    toolsLogin.updateMenu();
  } else {
    $rootScope.menuUserShow = false;
    $rootScope.menuLogShow = true;
  }

  like_cart_shop.countIconCart(); //  alert(localStorage.token)
  //  $rootScope.myFunct = function (keyEvent) {
  //      if (keyEvent.which === 13)
  //          alert('I am an alert');
  //  }

  $rootScope.shopClick = function () {
    localStorage.typeFilter = "listShop";
    $route.reload(); //Recarga el controlador, però no la página
  };
});