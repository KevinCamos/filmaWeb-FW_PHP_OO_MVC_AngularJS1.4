filmaweb.factory('toolsLogin', ['$rootScope', 'services', function ($rootScope, services, $route) {
    let service = {
        updateMenu: updateMenu,
        dropLocalStorage: dropLocalStorage,
        checkToken: checkToken,
        closeSession: closeSession
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
                        alert(data)

                        if (!data) {
                            alert("false")
                            dropLocalStorage()
                            // return false;
                        } else if (typeof data == "object") {
                            localStorage.token = data;
                        }
                    },
                    function (error) {
                        console.log(error);
                    });
        }
    };
}]);