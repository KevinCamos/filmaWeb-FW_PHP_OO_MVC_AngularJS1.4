getyourcar.directive('cartButton', function(services) {
    return {
        templateUrl: 'frontend/components/buttons/template/template_cartButton.html',
        scope: true,
        link: function(scope) {
            
            scope.addToCart = function(carPlate) {
                services.put('cart', 'storeCart', {carPlate: carPlate, days: 1, JWT: localStorage.token})
                .then(function(response) {
                    if (response === 'true') {
                        scope.$parent.cart.push(carPlate);
                    }// end_if
        
                }, function(error) {
                    console.log(error);
                });
            };// end_addToCart
        }
    };
});