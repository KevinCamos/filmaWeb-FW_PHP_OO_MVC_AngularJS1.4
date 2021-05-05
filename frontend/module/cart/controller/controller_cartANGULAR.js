getyourcar.controller('controller_cart', function($scope, services, toastr, dataCart) {
    $scope.dataCart = "";
    $scope.showCart = false;
    $scope.qtyDays = {};
    $scope.appliedDisc = "";
    $scope.discPercent = "";

    if (Array.isArray(dataCart)) {
        $scope.dataCart = dataCart;
        $scope.showCart = true;
        $scope.appliedDisc = dataCart[0].code_name;
        $scope.discPercent = dataCart[0].discount;
    }// end_if

    $scope.maxDays = function(num) {
        let daysArr = [];

        for (let i = 0; i < num; i++) {
            daysArr.push((i + 1).toString());
        }// end_for

        return daysArr;
    };// end_maxDays

    $scope.changeDays = function(carPlate) {
        services.put('cart', 'updateDays', {days: $scope.qtyDays[carPlate], JWT: localStorage.token, carPlate: carPlate})
        .then(function(response) {
            console.log(response);
            updateCart();

        }, function(error) {
            console.log(error);
        });
    };// end_changeDays

    $scope.deleteFromCart = function(carPlate) {
        $scope.qtyDays[carPlate]

        services.put('cart', 'removeCart', {carPlate: carPlate, JWT: localStorage.token})
        .then(function(response) {
            if (response === 'true') {
                updateCart();
            }// end_if

        }, function(error) {
            console.log(error);
        });
    };// end_deleteFromCart

    $scope.checkOut = function() {
        services.put('cart', 'checkOut', {JWT: localStorage.token})
        .then(function(response) {
            if (response != "false") {
                forceEmptyCart();
                toastr.success('Thanks for trust in our cars :)' ,'Purchase succesfully.');
            }else {
                toastr.error("It seems you don't have enough money." ,'Error');
            }// end_else

        }, function(error) {
            console.log(error);
        });// end_services
    }; // end_checkOut

    $scope.addDiscCode = function() {
        services.put('cart', 'addDiscCode', {code: $scope.discCode, JWT: localStorage.token})
        .then(function(response) {
            if (response != 'false') {
                $scope.appliedDisc = response.code_name;
                $scope.discPercent = response.discount;
                $scope.discCode = null;
            }// end_of

        }, function(error) {
            console.log(error);
        });
    }; // end_removeDiscCode

    $scope.removeDiscCode = function() {
        services.put('cart', 'removeDiscCode', {JWT: localStorage.token})
        .then(function(response) {
            if (response == 'true') {
                $scope.appliedDisc = null;
                $scope.discPercent = null;
            }// end_if

        }, function(error) {
            console.log(error);
        });
    }; // end_removeDiscCode

    $scope.getTotal = function() {
        let totalPrice = 0;

        for (row in $scope.dataCart) {
            totalPrice += ($scope.dataCart[row].price) * (1 + ($scope.dataCart[row].days / 10 - 0.1));
        }// end_for

        if ($scope.discPercent) {
            totalPrice = totalPrice - (totalPrice * $scope.discPercent / 100);
        }// end_if

        return totalPrice;
    }; // end_getTotal

    function updateCart() {
        services.post('cart', 'loadDataCart', {JWT: localStorage.token})
        .then(function(response) {
            if (Array.isArray(response)) {
                $scope.dataCart = response;
            }else {
                forceEmptyCart();
            }// end_else

        }, function(error) {
            console.log(error);
        });// end_services
    }// end_updateCart

    function forceEmptyCart() {
        $scope.dataCart = "";
        $scope.showCart = false;
    }// end_forceEmptyCart
});