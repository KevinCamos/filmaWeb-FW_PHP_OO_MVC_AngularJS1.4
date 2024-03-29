filmaweb.factory("services", ['$http', '$q', function ($http, $q) {
  let serviceBase = '/Kevin/Ejercicios_Kevin/Projecte/backend/index.php?module=';
  let obj = {};

  obj.twoGet = function (module, functi) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: 'GET',
//Gràcies Huertas!
      url: `${serviceBase}${module}&function=${functi}`

    }).success(function (data, status, headers, config) {
      //  console.log(data);
      console.log(data);
      //   alert(data);
      defered.resolve(data);
    }).error(function (data, status, headers, config) {
      //  console.log(data);
      alert("no entra")
      defered.reject(data);
    });
    return promise;
  };


  /**
   * Función para enviar 3 valores en el método POST, el primero que pertenece al módulo, el segundo a la función y el tercero a los datos que enviamos
   * @param {*} module 
   * @param {*} option 
   * @param {*} data 
   */
  obj.threePost = function (module, functi, data) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http({
      method: 'POST',
      url: `${serviceBase}${module}&function=${functi}`,

      data: data
    }).success(function (response, status, headers, config) {
      defered.resolve(response);
    }).error(function (error, status, headers, config) {
      defered.reject(error);
    });
    return promise;
  };


  return obj;
}]);