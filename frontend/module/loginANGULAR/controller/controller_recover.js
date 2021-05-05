getyourcar.controller('controller_recover', function($scope, services, toastr) {
    $scope.regUsername = /^[A-Za-z0-9._-]{5,15}$/;

    $scope.sendRecoverEmail = function() {
        let user = {'username': $scope.usernameRecover};

        services.post('login', 'sendRecoverEmail', user)
        .then(function(response){
            if (response == "Done") {
                toastr.success('We have sended and email for recover your password.' ,'Email Sended.');
                location.href = "#/home"
            }else {
                toastr.error("This username doesn't exists." ,'Error');
            }// end_else
        }, function(error) {
            console.log(error);
        });
    }; //end_sendRecoverEmail
});// end_controller_recover

getyourcar.controller('controller_recoverForm', function($scope, services, toastr) {
    $scope.regPassword = /^[A-Za-z0-9._-]{5,20}$/;

    $scope.setNewPassword = function() {
        services.put('login', 'updatePassword', {'password': CryptoJS.MD5($scope.newPassword).toString()})
        .then(function(response){
            if (response == 'true') {
                toastr.success('You have updated your password succesfully.' ,'Password updated succesfully.');
                location.href = '#/login';
            }else {
                toastr.error('Something happened when trying to update your password.' ,'Error');
            }// end_else
        }, function(error) {
            console.log(error);
        });// end_services
    };// end_setNewPassword
});// end_controller_recoverForm