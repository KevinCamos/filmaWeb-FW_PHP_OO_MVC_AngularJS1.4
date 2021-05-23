"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

filmaweb.controller("controller_shop", function ($scope, services, filters_shop, like_cart_shop) {
  openShop();
  like_cart_shop.likeClick();

  $scope.productClick = function (data) {
    localStorage.typeFilter = "productID";
    console.log(data.product.id);
    localStorage.productID = data.product.id;
    services.threePost("home", "countClick", {
      id: data.product.id
    }).then(function (product) {
      alert("eh");
      console.log(product);
    }, function (error) {
      console.log(error);
    });
    openShop(); // $scope.$apply();
  };

  $scope.filterClick = function () {
    console.log(_typeof($scope.titulo));
    var titulo = $scope.titulo;
    console.log(_typeof(titulo)); // var filter = new Array();

    var page = $scope.titulo ? $scope.titulo : ""; //saca el número de páginas en un entero

    var filter = $scope.titulo ? [$scope.titulo] : [""];
    filter.push($scope.director ? $scope.director : "");
    filter.push($scope.year ? $scope.year : 0);
    var priceMin = $scope.priceMin ? $scope.priceMin : 0;
    var priceMax = $scope.priceMax ? $scope.priceMax : 999;

    if (priceMax >= priceMin) {
      filter.push(priceMin);
      filter.push(priceMax);
    } else {
      filter.push(priceMax);
      filter.push(priceMin);
    } // localStorage.typeFilter = "filter";
    // localStorage.typeFilter = "filter";


    filters_shop.getListShop("filter", filter);
  }; ///END filterClick


  function openShop() {
    if (localStorage.typeFilter == "productID") {
      $scope.listProducts = false;
      $scope.oneProduct = true;
      filters_shop.getProduct(localStorage.productID);
    } else {
      $scope.listProducts = true;
      $scope.oneProduct = false;
      console.log(localStorage.typeFilter);
      filter = localStorage.filter ? localStorage.filter : '';
      filters_shop.getListShop(localStorage.typeFilter, filter); // $scope.$apply();
    }
  }
});