filmaweb.controller("controller_login", function ($scope, services) {
    $scope.regUsername = /^[A-Za-z0-9._-]{5,15}$/;
    $scope.regEmail = /^[A-Za-z0-9._-]{5,20}@[a-z]{3,10}.[a-z]{2,4}$/;
    $scope.regPassword = /^[A-Za-z0-9._-]{5,20}$/;
    $scope.logShow = true;
    $scope.regShow = false;

    $scope.regiShow = function () {
        $scope.logShow = false;
        $scope.regShow = true;
    }
    $scope.signShow = function () {
        $scope.regShow = false;
        $scope.logShow = true;
    }
    $scope.register = function () {

        if ($scope.nameUserRegister && $scope.emailRegister && $scope.passwordRegister && $scope.passwordRegister2) {
            $scope.error = '';
            $scope.error = $scope.passwordRegister == $scope.passwordRegister2 ? '' : 'Escribe correctamente la contraseña en los dos campos';
            if ($scope.error == '') {
                //S'ha validat i entra

                // console.log(CryptoJS.MD5($scope.passwordRegister).toString())
                // console.log(CryptoJS.MD5($scope.passwordRegister))
                var user = [$scope.nameUserRegister]
                user.push($scope.emailRegister);
                user.push($scope.passwordRegister);
                console.log(user)
                services.threePost('login', "register", {
                        user: user
                    })
                    .then(function (data) {
                        if (data == false) {
                            $scope.error = "Lo sentimos, este usuario o correo electrónico ya se encuentra registrado";
                        } else {
                            // toastr.success("Se ha registrado corréctamente");
                            alert("se ha enviado un correo");
                            location.href = "#/home";
                        }
                    }, function (error) {
                        console.log(error);
                    });
            }
        } else {
            if (!$scope.nameUserRegister && !$scope.passwordRegister && !$scope.passwordRegister2 && !$scope.emailRegister) $scope.error = 'Rellena todos los campos'
            else if (!$scope.nameUserRegister) $scope.error = 'Escribe un usuario entre 5 y 15 carácteres'
            else if (!$scope.passwordRegister && !$scope.passwordRegister2) $scope.error = 'Escribe una contraseña válida entre 5 y 20 carácteres'
            else if (!$scope.emailRegister) $scope.error = "Escribe un E-mail válido"
            else $scope.error = "Rellena todos los campos"



            // $scope.error = $scope.emailRegister ? 'Rellena todos los campos' : 'Escribe un email válido';
            // $scope.error = $scope.passwordRegister && $scope.passwordRegister2 ? 'Rellena todos los campos' : 'Rellena los campos de la contraseña';
            // $scope.error = $scope.nameUserRegister ? 'Rellena todos los campos' : 'Escribe un nombre de usuario válido entre 5 y 15 carácteres';
        }
    }


});