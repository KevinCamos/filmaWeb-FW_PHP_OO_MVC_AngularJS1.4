 var filmaweb = angular.module('filmaweb', ['ngRoute', 'ui.bootstrap']);
 // var filmaweb = angular.module('filmaweb', ['ngRoute', 'ngAnimate', 'ngTouch', 'ngSanitize', 'toastr', 'ui.bootstrap']);
 //////
 filmaweb.config(['$routeProvider', '$locationProvider',
     function ($routeProvider, $locationProvider) {
         $routeProvider
             .when("/home", {
                 templateUrl: "frontend/module/home/view/view_home.html",
                 controller: "controller_home",
                 resolve: {
                     carousel: function (services) {
                         var data = services.twoGet('home', 'carousel');
                         return data;
                     },
                     homeProducts: function (services) {
                         // console.log(services);
                         var data = services.twoGet('home', 'homeProducts');
                         // console.log(data);
                         return data;
                     }
                 } // end_resolve
                }).when("/shop", {
                    templateUrl: "frontend/module/shop/view/view_shop.html",
                    controller: "controller_shop"
                }).when("/login", {
                    templateUrl: "frontend/module/login/view/view_login.html",
                    controller: "controller_login"
      
             }).otherwise("/home", {
                 templateUrl: "frontend/module/home/view/view_home.html",
                 controller: "controller_home",

                 resolve: {
                     carousel: function (services) {
                         // console.log(services);
                         var data = services.get('home', 'carousel');
                         // console.log(data);
                         return data;
                     },
                     homeProducts: function (services) {
                         // console.log(services);
                         var data = services.get('home', 'homeProducts');
                         // console.log(data);
                         return data;
                     }
                 }
             });
     }
 ]);

 filmaweb.run(function ($rootScope, $route) {

     // angular.element(document).ready(function() {
     // });
     $rootScope.shopClick = function () {
         localStorage.typeFilter = "listShop";
         $route.reload(); //Recarga el controlador, però no la página

     };
 });