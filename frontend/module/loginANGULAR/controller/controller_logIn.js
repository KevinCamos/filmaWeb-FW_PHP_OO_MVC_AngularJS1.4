getyourcar.controller('controller_logIn', function($scope, $rootScope, services_logIn, services, services_logInSocial, services_Google, services_GitHub, toastr) {
    $scope.regUsername = /^[A-Za-z0-9._-]{5,15}$/;
    $scope.regPassword = /^[A-Za-z0-9._-]{5,20}$/;
    
    if (!$rootScope.socialInit) {
        $rootScope.socialInit = 0;
    }// end_if
    if ($rootScope.socialInit == 0) {
        services_logInSocial.initialize();
        $rootScope.socialInit = 1;
    }// end_if
    $scope.logIn = function() {
        let user = {'username': $scope.username, 'password': CryptoJS.MD5($scope.password).toString()};
        
        services.post('login', 'logIn', user)
        .then(function(response){
            if (response != "Fail") {
                services_logIn.redirectLogIn(response.secureSession, response.jwt);
                toastr.success('Log In succesfully.');
            }else {
                toastr.error("This account doesn't exist.");
            }// end_else

        }, function(error) {
            console.log(error);
        }); // end_services
    };// end_logIn

    $scope.logInGoogle = function() {
        services_Google.logIn();
    };// end_logInGoogle

    $scope.logInGitHub = function() {
        services_GitHub.logIn();
    };// end_logInGitHub
});