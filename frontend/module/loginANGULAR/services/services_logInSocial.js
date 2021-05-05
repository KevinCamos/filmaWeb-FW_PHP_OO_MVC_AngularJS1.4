getyourcar.factory('services_logInSocial', ['services', 'services_localStorage', 'services_logIn', 'FireBaseConst',function(services, toastr, services_logIn, FireBaseConst) {
    let service = {initialize: initialize, socialLogIn: socialLogIn};
    return service;

    function initialize() {
        var firebaseConfig = {
            apiKey: FireBaseConst.apiKey,
            authDomain: FireBaseConst.authDomain,
            databaseURL: FireBaseConst.databaseURL,
            projectId: FireBaseConst.projectId,
            storageBucket: FireBaseConst.storageBucket,
            messagingSenderId: FireBaseConst.messagingSenderId,
            appId: FireBaseConst.appId
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
    }// end_initialize

    function socialLogIn(profile) {
        services.post('login', 'socialLogIn', {profile: profile})
        .then(function(response) {
            services_logIn.redirectLogIn(response.secureSession, response.jwt);
            toastr.success('Log In succesfully.');
        }, function(error) {
            console.log(error);
        });
    }// end_socialLogIn
}]);// end_services_logInSocial

getyourcar.factory('services_Google', ['services_logInSocial', function(services_logInSocial) {
    let service = {logIn: logIn};
    return service;

    function logIn() {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        let authService = firebase.auth();

        authService.signInWithPopup(provider)
        .then(function(result) {
            services_logInSocial.socialLogIn({sub: result.user.uid, nickname: result.user.displayName, email: result.user.email, picture: result.user.photoURL});
        }).catch(function(error) {
            console.log(error);
        });
    }// end_logIn
}]);// end_services_Google

getyourcar.factory('services_GitHub', ['services_logInSocial', function(services_logInSocial) {
    let service = {logIn: logIn};
    return service;

    function logIn() {
        let provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('email');
        let authService = firebase.auth();

        authService.signInWithPopup(provider)
        .then(function(result) {
            services_logInSocial.socialLogIn({sub: result.user.uid, nickname: result.user.displayName, email: result.user.email, picture: result.user.photoURL});
        }).catch(function(error) {
            console.log(error);
        });
    }// end_logIn
}]); 