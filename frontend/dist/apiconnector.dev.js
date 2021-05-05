"use strict";

filmaweb.factory("services", ['$http', '$q', function ($http, $q) {
  var serviceBase = '/Kevin/Ejercicios_Kevin/Projecte/backend/index.php?module=';
  var obj = {};

  obj.get = function (module, functi) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: 'GET',
      url: serviceBase + module + '&function=' + functi // url: `${serviceBase}${module}&function=${functi}`

    }).success(function (data, status, headers, config) {
      console.log(data); //   alert(data);

      defered.resolve(data);
    }).error(function (data, status, headers, config) {
      console.log(data);
      alert("no entra");
      defered.reject(data);
    });
    return promise;
  }; //   obj.get = function (module, functi, dada) {
  //       var defered=$q.defer();
  //       var promise=defered.promise;
  //       $http({
  //             method: 'GET',
  //             url: serviceBase + module + '&function=' + functi + '&param=' + dada
  //         }).success(function(data, status, headers, config) {
  //            console.log(data);
  //            defered.resolve(data);
  //         }).error(function(data, status, headers, config) {
  //            defered.reject(data);
  //         });
  //       return promise;
  //   };
  //   obj.get = function (module, functi, dada, dada2) {
  //       var defered=$q.defer();
  //       var promise=defered.promise;
  //       $http({
  //             method: 'GET',
  //             url: serviceBase + module + '&function=' + functi + '&param=' + dada + '&param2=' + dada2
  //         }).success(function(data, status, headers, config) {
  //            console.log(data);
  //            defered.resolve(data);
  //         }).error(function(data, status, headers, config) {
  //            alert("no entra");
  //            defered.reject(data);
  //         });
  //       return promise;
  //   };
  //   obj.post = function (module, option, data) {
  //     var defered = $q.defer();
  //     var promise = defered.promise;
  //     $http({
  //           method: 'POST',
  //           url: serviceBase + module + '&function=' + option,
  //           data: data
  //       }).success(function(response, status, headers, config) {
  //          defered.resolve(response);
  //       }).error(function(error, status, headers, config) {
  //          defered.reject(error);
  //       });
  //     return promise;
  //   };
  //   obj.put = function (module, functi, dada) {
  //     var defered=$q.defer();
  //     var promise=defered.promise;
  //     $http({
  //           method: 'PUT',
  //           url: serviceBase + module + '&function=' + functi,
  //           data: dada
  //       }).success(function(data, status, headers, config) {
  // 	       defered.resolve(data);
  //       }).error(function(data, status, headers, config) {
  //          defered.reject(data);
  //       });
  //     return promise;
  //   };
  //   obj.delete = function (module, functi, dada) {
  //       var defered=$q.defer();
  //       var promise=defered.promise;
  //       $http({
  //             method: 'DELETE',
  //             url: serviceBase + module + '&function=' + functi + '&param=' + dada
  //         }).success(function(data, status, headers, config) {
  //            //console.log(data);
  //            defered.resolve(data);
  //         }).error(function(data, status, headers, config) {
  //            defered.reject(data);
  //         });
  //       return promise;
  //   };


  return obj;
}]);