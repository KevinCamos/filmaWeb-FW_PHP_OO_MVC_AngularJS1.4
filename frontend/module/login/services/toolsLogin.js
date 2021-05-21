filmaweb.factory('toolsLogin', ['$rootScope', 'services', function ($rootScope, services, $route) {
    let service = {
        updateMenu: updateMenu,
        dropLocalStorage: dropLocalStorage,
        saveUserStorage: saveUserStorage,
        closeSession: closeSession,
        checkToken: checkToken,
        getUser: getUser
    };
    return service



    function updateMenu() {
        $rootScope.menuLogShow = false;
        $rootScope.menuUserShow = true;

        $rootScope.user = localStorage.user;
        $rootScope.avatar = localStorage.avatar;



    }

    function dropLocalStorage() {
        localStorage.removeItem('userID');
        localStorage.removeItem('user');
        localStorage.removeItem('type');
        localStorage.removeItem('avatar');
        localStorage.removeItem('email');
        localStorage.removeItem('token');

    }

    function saveUserStorage(data) {
        localStorage.userID = data.idusers
        localStorage.user = data.username
        localStorage.type = data.type
        localStorage.avatar = data.avatar
        localStorage.email = data.email

    }

    function closeSession() {
        $rootScope.closeSessionClick = function () {
            dropLocalStorage();
            location.reload()
        }


    }

    function checkToken() {
        if (localStorage.token) {

            services.threePost('login', "updateToken", {
                    token: localStorage.token
                })
                .then(function (data) {
                        console.log("checkToken: " + data)
                        console.log(typeof data);
                        console.log(data);

                        if (!data) {
                            alert("NO")
                            alert(data)

                            dropLocalStorage()
                            // return false;
                        } else {
                            localStorage.token = data;

                            localStorage.username ? getUser() : updateMenu();
                        }
                    },
                    function (error) {
                        console.log(error);
                    });
        }
    };

    function getUser() {
        console.log("getUserIni")
        if (localStorage.token) {
            services.threePost('login', "getUser", {
                    token: localStorage.token
                })
                .then(function (data) {
                        console.log(data)
                        if (data == false) {
                            console.log("Eliminar token")

                            return false;
                        } else if (typeof data == "object") {
                            console.log("hi ha token")
                            saveUserStorage(data)
                            updateMenu()

                        }
                    },
                    function (error) {
                        console.log(error);
                    });

        }

    }
}]);