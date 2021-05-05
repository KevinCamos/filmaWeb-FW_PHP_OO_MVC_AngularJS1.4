getyourcar.controller('controller_register', function($scope, $location, services, toastr) {
    $scope.regUsername = /^[A-Za-z0-9._-]{5,15}$/;
    $scope.regEmail = /^[A-Za-z0-9._-]{5,20}@[a-z]{3,6}.[a-z]{2,4}$/;
    $scope.regPassword = /^[A-Za-z0-9._-]{5,20}$/;

    $scope.register = function() {
        let user = {'username': $scope.username, 
                    'email': $scope.email, 
                    'password': CryptoJS.MD5($scope.password).toString(), 
                    're_password': CryptoJS.MD5($scope.password).toString()};

        services.post('login', 'register', user)
        .then(function(response) {
            if (response == "Done") {
                toastr.success('Thank you. You will receive and email confirmation.' ,'You have registered succesfully');
                $location.path('/login');
            }else {
                toastr.error('This account already exists.' ,'Error');
            }// end_else
        }, function(error) {
            console.log(error);
        }); // end_services
    }; // end_register
});