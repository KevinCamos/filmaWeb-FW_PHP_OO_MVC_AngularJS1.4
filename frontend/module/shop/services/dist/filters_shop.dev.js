"use strict";

filmaweb.factory('filters_shop', ['$rootScope', 'services', function ($rootScope, services) {
  var service = {
    getListShop: getListShop,
    paginationClick: paginationClick,
    getProduct: getProduct
  };
  return service;

  function getListShop(typeFilter, arrayFilter) {
    // if (localStorage.filter) arrayFilter = localStorage.filter
    // else if (!arrayFilter) arrayFilter == '';
    arrayFilter = arrayFilter ? arrayFilter : '';
    modulo = localStorage.typeFilter == 'searchList' ? 'search' : 'shop'; // console.log(arrayFilter)

    services.threePost(modulo, typeFilter, {
      "arrayFilter": arrayFilter
    }).then(function (productsList) {
      // console.log(productsList)
      position = 0;
      movies = 6;
      $rootScope.products = productsList.slice(position, position + 6);
      var page = productsList.length % 6 == 0 ? productsList.length / 6 : (productsList.length / 6 + 0.5).toFixed(); //saca el número de páginas en un entero

      var maxPagination = productsList.length % 6 == 0 ? productsList.length - 6 : productsList.length - productsList.length % 6; // console.log(page);

      var pagination = [0];

      for (var i = 1; i <= page; i++) {
        pagination.push(i);
      }

      pagination.shift(); //Elimina el valor 0 de la variable
      // console.log(pagination)

      var clickPage = 1;
      $rootScope.pagination = pagination;
      $rootScope.clickPage = clickPage;
      localStorage.page = page;
      localStorage.maxPagination = maxPagination;
      localStorage.pagination = pagination;
      localStorage.clickPage = clickPage;
      paginationClick(productsList);
    }, function (error) {
      console.log(error);
    });
  } // end_logIn


  function paginationClick(productsList) {
    $rootScope.paginationClick = function (data) {
      // page = localStorage.page, maxPagination = localStorage.maxPagination, pagination = localStorage.pagination, clickPage = localStorage.clickPage;
      page = localStorage.page;
      maxPagination = localStorage.maxPagination;
      pagination = localStorage.pagination;
      clickPage = localStorage.clickPage;

      switch (data) {
        case "prev":
          position = position == 0 ? position : position - 6;
          clickPage = clickPage == 1 ? clickPage : clickPage - 1;
          break;

        case "next":
          position = position == maxPagination ? position : position + 6;
          clickPage = clickPage == pagination[pagination.length] ? clickPage : clickPage + 1;
          break;

        default:
          position = data.page == pagination[pagination.length] ? maxPagination : data.page * 6 - 6;
          clickPage = data.page;
      }

      $rootScope.clickPage = clickPage;
      $rootScope.products = productsList.slice(position, position + 6); // alert(position);
      // $scope.$apply();
    };
  }

  ;

  function getProduct(id) {
    services.threePost('shop', "productID", {
      id: id
    }).then(function (product) {
      console.log(product);
      $rootScope.product = product[0];
    }, function (error) {
      console.log(error);
    });
  }
}]);