filmaweb.controller("controller_login", function ($scope, services, toolsLogin) {
    $scope.regUsername = /^[A-Za-z0-9._-]{5,15}$/;
    $scope.regUsernameMail = /^[A-Za-z0-9._-][@]{5,50}$/ | /^[A-Za-z0-9._-]{5,20}@[a-z]{3,10}.[a-z]{2,4}$/;

    $scope.regEmail = /^[A-Za-z0-9._-]{5,20}@[a-z]{3,10}.[a-z]{2,4}$/;
    $scope.regPassword = /^[A-Za-z0-9._-]{5,20}$/;
    $scope.logShow = true;
    $scope.regShow = false;
    //FUNTIONS SHOW DOM
    $scope.regiShow = function () {
        $scope.logShow = false;
        $scope.regShow = true;
    }
    $scope.signShow = function () {
        $scope.regShow = false;
        $scope.logShow = true;
    }

    //END FUNTIONS SHOW DOM
    $scope.register = function () {
        console.log("entra1");
        if ($scope.nameUserRegister && $scope.emailRegister && $scope.passwordRegister && $scope.passwordRegister2) {
            console.log("entra3");

            $scope.errorReg = '';
            $scope.errorReg = $scope.passwordRegister == $scope.passwordRegister2 ? '' : 'Escribe correctamente la contraseña en los dos campos';
            if ($scope.errorReg == '') {
                console.log("entra2");

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

            if (!$scope.nameUserRegister && !$scope.passwordRegister && !$scope.passwordRegister2 && !$scope.emailRegister) $scope.errorReg = 'Rellena todos los campos'
            else if (!$scope.nameUserRegister) $scope.errorReg = 'Escribe un usuario entre 5 y 15 carácteres'
            else if (!$scope.passwordRegister && !$scope.passwordRegister2) $scope.errorReg = 'Escribe una contraseña válida entre 5 y 20 carácteres'
            else if (!$scope.emailRegister) $scope.errorReg = "Escribe un E-mail válido"
            else $scope.errorReg = "Rellena todos los campos"
        }
    }
    $scope.login = function () {

        if ($scope.nameUserLogin && $scope.passwordLogin) {
            $scope.errorLog = '';
            if ($scope.errorLog == '') {
                //S'ha validat i entra
                var user = [$scope.nameUserLogin]
                user.push($scope.passwordLogin);
                console.log(user)
                services.threePost('login', "login", {
                        user: user
                    })
                    .then(function (data) {
                        if (data == false) {
                            $scope.errorLog = "Lo sentimos, este usuario o correo electrónico no se encuentra registrado";
                        } else if (data == -1) {
                            $scope.errorLog = "La contraseña es incorrecta";
                        } else {
                            localStorage.token = data;
                            getUser()
                            location.href = "#/home";
                        }

                    }, function (error) {
                        console.log(error);
                    });
            }
        } else {
            if (!$scope.nameUserLogin && !$scope.passwordLogin) $scope.errorLog = 'Rellena todos los campos'
            else if (!$scope.nameUserLogin) $scope.errorLog = 'Escribe un nombre de usuario válido'
            else $scope.errorLog = 'Escribe la contraseña correctamente'


        }
    }

    function getUser() {
        if (localStorage.token) {
            services.threePost('login', "getUser", {
                    token: localStorage.token
                })
                .then(function (data) {
                    console.log("EHHH: " + data)
                    console.log(data)
                    if (data == false) {
                            alert("Eliminar token")
                            //  localStorage.removeItem("token");
                            //  toastr.warning("La sesión se ha cerrado por seguridad");
                            //  removeItemLogin();
                            //  loginMenu();
                            //  getCart();
                            return false;
                        } else if (typeof data == "object") {
                            alert("hi ha token")
                            localStorage.userID = data.idusers
                            localStorage.user = data.username
                            localStorage.type = data.type
                            localStorage.avatar = data.avatar
                            localStorage.email = data.email
                            toolsLogin.updateMenu()

                        }
                    },
                    function (error) {
                        console.log(error);
                    });
        
        }

    }
});