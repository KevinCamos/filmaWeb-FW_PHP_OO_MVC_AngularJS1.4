"use strict";

filmaweb.controller("controller_login", function ($scope, services, toolsLogin, services_Google, services_GitHub) {
  $scope.regUsername = /^[A-Za-z0-9._-]{5,15}$/;
  $scope.regUsernameMail = /^[A-Za-z0-9._-][@]{5,50}$/ | /^[A-Za-z0-9._-]{5,20}@[a-z]{3,10}.[a-z]{2,4}$/;
  $scope.regEmail = /^[A-Za-z0-9._-]{5,20}@[a-z]{3,10}.[a-z]{2,4}$/;
  $scope.regPassword = /^[A-Za-z0-9._-]{5,20}$/;
  toolsLogin.closeSession();
  $scope.logShow = true;
  $scope.recoveredShow = false;
  $scope.regShow = false;
  $scope.recoveringShow = false; //FUNTIONS SHOW DOM

  $scope.regiShow = function () {
    $scope.logShow = false;
    $scope.recoveredShow = false;
    $scope.recoveringShow = false;
    $scope.regShow = true;
  };

  $scope.signShow = function () {
    $scope.regShow = false;
    $scope.recoveredShow = false;
    $scope.recoveringShow = false;
    $scope.logShow = true;
  };

  $scope.recovShow = function () {
    $scope.regShow = false;
    $scope.logShow = false;
    $scope.recoveringShow = false;
    $scope.recoveredShow = true;
  }; //END FUNTIONS SHOW DOM


  $scope.register = function () {
    console.log("entra1");

    if ($scope.nameUserRegister && $scope.emailRegister && $scope.passwordRegister && $scope.passwordRegister2) {
      console.log("entra3"); // $scope.errorReg = '';

      $scope.errorReg = $scope.passwordRegister == $scope.passwordRegister2 ? '' : 'Escribe correctamente la contraseña en los dos campos';

      if ($scope.errorReg == '') {
        console.log("entra2"); // console.log(CryptoJS.MD5($scope.passwordRegister).toString())
        // console.log(CryptoJS.MD5($scope.passwordRegister))

        var user = [$scope.nameUserRegister];
        user.push($scope.emailRegister);
        user.push($scope.passwordRegister);
        console.log(user);
        services.threePost('login', "register", {
          user: user
        }).then(function (data) {
          console.log(data);

          if (data == false) {
            $scope.errorReg = "Lo sentimos, este usuario o correo electrónico ya se encuentra registrado";
          } else {
            // toastr.success("Se ha registrado corréctamente");
            alert("se ha enviado un correo");
            location.href = "#/home";
          }
        }, function (error) {
          console.log("noEntra");
          console.log(error);
        });
      }
    } else {
      if (!$scope.nameUserRegister && !$scope.passwordRegister && !$scope.passwordRegister2 && !$scope.emailRegister) $scope.errorReg = 'Rellena todos los campos';else if (!$scope.nameUserRegister) $scope.errorReg = 'Escribe un usuario entre 5 y 15 carácteres';else if (!$scope.passwordRegister && !$scope.passwordRegister2) $scope.errorReg = 'Escribe una contraseña válida entre 5 y 20 carácteres';else if (!$scope.emailRegister) $scope.errorReg = "Escribe un E-mail válido";else $scope.errorReg = "Rellena todos los campos";
    }
  };

  $scope.login = function () {
    if ($scope.nameUserLogin && $scope.passwordLogin) {
      $scope.errorLog = '';

      if ($scope.errorLog == '') {
        //S'ha validat i entra
        var user = [$scope.nameUserLogin];
        user.push($scope.passwordLogin);
        console.log(user);
        services.threePost('login', "login", {
          user: user
        }).then(function (data) {
          if (data == false) {
            $scope.errorLog = "Lo sentimos, este usuario o correo electrónico no se encuentra registrado";
          } else if (data == -1) {
            $scope.errorLog = "La contraseña es incorrecta";
          } else {
            localStorage.token = data;
            toolsLogin.getUser();
            location.href = "#/home";
          }
        }, function (error) {
          console.log(error);
        });
      }
    } else {
      if (!$scope.nameUserLogin && !$scope.passwordLogin) $scope.errorLog = 'Rellena todos los campos';else if (!$scope.nameUserLogin) $scope.errorLog = 'Escribe un nombre de usuario válido';else $scope.errorLog = 'Escribe la contraseña correctamente';
    }
  };

  $scope.recovered = function () {
    if ($scope.nameUserRecov) {
      $scope.errorRec = '';

      if ($scope.errorRec == '') {
        //S'ha validat i entra
        var user = $scope.nameUserRecov;
        services.threePost('login', "recoveredMail", {
          user: user
        }).then(function (data) {
          // toastr.success("Se ha enviado a tu e-mail un enlace para restablecer la contraseña");
          alert("Se ha enviado a tu e-mail un enlace para restablecer la contraseña");
        }, function (error) {
          console.log(error);
        });
      }
    } else {
      $scope.errorRec = 'Escribe un usuario o correo válido';
    }
  };

  $scope.socialLoginClick = function (data) {
    switch (data) {
      case "gmail":
        services_Google.logIn();
        break;

      case "ghub":
        services_GitHub.logIn();
        break;

      default:
        console.log("Hay un error en el servicio");
    }
  }; // services_Google

});
filmaweb.controller("recoveredPassword", function ($scope, services, toolsLogin, dataRecovered, services_Google, services_GitHub) {
  $scope.regUsername = /^[A-Za-z0-9._-]{5,15}$/;
  $scope.regUsernameMail = /^[A-Za-z0-9._-][@]{5,50}$/ | /^[A-Za-z0-9._-]{5,20}@[a-z]{3,10}.[a-z]{2,4}$/;
  $scope.regEmail = /^[A-Za-z0-9._-]{5,20}@[a-z]{3,10}.[a-z]{2,4}$/;
  $scope.regPassword = /^[A-Za-z0-9._-]{5,20}$/;
  toolsLogin.closeSession();
  localStorage.token = dataRecovered;
  toolsLogin.getUser();
  $scope.recoveringShow = true;
  $scope.logShow = false;
  $scope.recoveredShow = false;
  $scope.regShow = false;

  $scope.recovering = function () {
    console.log("entra1");

    if ($scope.passwordRecoverin && $scope.passwordRecoverin2) {
      console.log("entra3"); // $scope.errorReg = '';

      $scope.errorRecovering = $scope.passwordRecoverin == $scope.passwordRecoverin2 ? '' : 'Escribe correctamente la contraseña en los dos campos';

      if ($scope.errorRecovering == '') {
        console.log("entra2");
        var password = $scope.passwordRecoverin;
        services.threePost('login', "changePassword", {
          token: localStorage.token,
          password: password
        }).then(function (data) {
          console.log(data);

          if (data == false) {
            $scope.errorRecovering = "Ha habido un problema, vuelve a intentarlo";
          } else {
            // toastr.success("Se ha registrado corréctamente");
            alert("Se ha modificado correctamente");
            location.href = "#/home";
          }
        }, function (error) {
          console.log("noEntra");
          console.log(error);
        });
      }
    } else $scope.errorRecovering = 'Rellena ambos campos con contraseñas válidas';
  };
});