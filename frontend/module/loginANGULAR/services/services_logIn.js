getyourcar.factory('services_logIn', ['$rootScope', 'services', 'services_localStorage', function($rootScope, services, services_localStorage) {
    let service = {printMenu: printMenu, logOut: logOut, redirectLogIn: redirectLogIn};
    let refresh = null;

    return service;

    function printMenu() {
        if ((localStorage.token) && (localStorage.secureSession)) {
            services.post('login', 'returnSession', {jwt: localStorage.token, secureSession: localStorage.secureSession})
            .then(function(response) {
                if (response.secureSession) {
                    $rootScope.showProfile = true;
                    $rootScope.showLogIn = false;
                    $rootScope.profileName = response.username;
                    $rootScope.profileImg = response.avatar;

                    services_localStorage.setSession(response.secureSession, response.jwt);
                    refresh = setInterval(refreshSession, 300000);

                    if (response.type === "client") {
                        $rootScope.panelAdmin = false;
                    }// end_if
                    if (response.type === "admin") {
                        $rootScope.panelAdmin = true;
                    }// end_if
                }// end_if
                return;
                
            }, function(error) {
                console.log(error);
            });// end_services
        }// end_if
        $rootScope.showLogIn = true;
        $rootScope.showProfile = false;
    }// end_logIn

    function redirectLogIn(secureSession, JWTToken) {
        let jumpPage = (localStorage.jumpPage) ? services_localStorage.setJumpPage() : 'home';

        services_localStorage.setSession(secureSession, JWTToken);
        printMenu();
        location.href = "#/" + jumpPage;
    }// end_redirectLogIn

    function logOut() {
        services.get('login', 'logOut')
        .then(function(response) {
            if (response === "Done") {
                clearInterval(refresh);
                services_localStorage.clearSession();
                printMenu();
                location.href = "#/home";
            }// end_if
            
        }, function(error) {
            console.log(error);
        });
    }// end_logOut

    function refreshSession() {
        services.post('login', 'reload', {JWT: localStorage.token})
        .then(function(response) {
            services_localStorage.setSession(response.secureSession, response.token);

        }, function(error) {
            console.log(error);
        });
    }// end_refreshSesison
}]);// end_services_login