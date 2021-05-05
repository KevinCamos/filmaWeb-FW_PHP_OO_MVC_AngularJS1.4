getyourcar.directive('favButton', function(services) {
    return {
        restrict: "E",
        scope: true,
        templateUrl: 'frontend/components/buttons/template/template_favButton.html',
        link: function(scope) {

            scope.detectFav = function(carPlate) {
                services.post('shop', 'updateFavs', {JWT: localStorage.token, carPlate: carPlate})
                .then(function(response) {
                    switch (response) {
                        case 'true':
                            scope.favs.push(carPlate);
                            break;
                        case '1':
                            scope.favs.splice(scope.$parent.favs.indexOf(carPlate), 1);
                            break;
                        default:
                            localStorage.jumpPage = "shop";
                            location.href = "#/login";
                    }// end_switch
        
                }, function(error) {
                    console.log(error);
                });
            };// end_detectFav
        }
    };
});