filmaweb.factory('socialLogin', ['services','toolsLogin', function (services,toolsLogin) {
    let service = {
        initialize: initialize,
        socialLoginSendData: socialLoginSendData

    };
    return service

    function initialize() {
        var firebaseConfig = CONFIG;
        firebase.initializeApp(firebaseConfig);
    } // end_initialize



    function socialLoginSendData(dataUser) {

        services.threePost('login', "socialLogin", {
                dataUser: dataUser
            })
            .then(function (data) {
                console.log(data);
                alert(data);
                localStorage.token = data;
                toolsLogin.getUser();
                location.href = "#/home";
            }, function (error) {
                alert(data);
                console.log(data);
            });
    }


}]);

filmaweb.factory('services_Google', ['socialLogin','toolsLogin', function (socialLogin) {
    let service = {
        logIn: logIn
    };
    return service;

    function logIn(getUser) {
        socialLogin.initialize()

        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        let authService = firebase.auth();

        authService.signInWithPopup(provider)
            .then(function (result) {
                let dataUser = [("GM-" + result.user.uid), result.user.email, result.user.displayName, result.user.photoURL];
                socialLogin.socialLoginSendData(dataUser);
                getUser();
            }).catch(function (error) {
                console.log(error);
            });
    } // end_logIn
}]); // end_services_Google

filmaweb.factory('services_GitHub', ['socialLogin', function (socialLogin) {
    let service = {
        logIn: logIn
    };
    return service;

    function logIn() {
        socialLogin.initialize()

        let provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('email');
        let authService = firebase.auth();

        authService.signInWithPopup(provider)
            .then(function (result) {
                let dataUser = [("GH-" + result.user.uid), result.user.email, result.user.displayName, result.user.photoURL];

                socialLogin.socialLoginSendData(dataUser);
            }).catch(function (error) {
                console.log(error);
            });
    } // end_logIn
}]);