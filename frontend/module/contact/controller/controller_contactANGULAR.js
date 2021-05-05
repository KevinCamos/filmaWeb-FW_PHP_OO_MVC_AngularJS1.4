function addAPI() {
    //////
    var script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + googleApi + '&callback=loadMap';
    document.getElementsByTagName('head')[0].appendChild(script);
}// end_addAPI

function loadMap() {
    var location = {lat: 38.809893, lng: -0.604617}; 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location
    }); // end_map
    ////
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h4>Ontinyent</h4>'+
        '<div id="bodyContent">'+
        '<p><b>Get your Car</b></p>'+
        '<a href="index.php?page=controllerHomePage&op=list">Home</a>'+
        '</div>'+
        '</div>';
        //////
    var popWindow = new google.maps.InfoWindow({
        content: contentString
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Get your Car'
    });
    //////
    marker.addListener('click', function() {
        popWindow.open(map, marker);
    });
}// end_loadMap

getyourcar.controller('controller_contact', function($scope, services, toastr) {
    addAPI();
    ////// $Scope
    $scope.regName = /^[A-Za-z\s]{6,60}$/;
    $scope.regEmail = /^[A-Za-z0-9._-]{5,20}@[a-z]{3,6}.[a-z]{2,4}$/;
    $scope.regMatter = /^[A-Za-z-\s]{6,60}$/;
    $scope.regMessage = /^[A-Za-z0-9-\s.]{15,200}$/;
    //////
    $scope.sendEmail = function() {
        let email = {'name': $scope.full_name, 'email': $scope.user_email, 'matter': $scope.email_matter, 'message': $scope.email_message};
        //////
        services.post('contact', 'sendEmail', email)
        .then(function(response) {
            if (response == 'true') {
                toastr.success('The email has been sended, you will receive an answer as soon as posible.' ,'Email sended');
                $scope.full_name = null;
                $scope.user_email = null;
                $scope.email_matter = null;
                $scope.email_message = null;
            }else {
                toastr.error('Something happend when trying to send.' ,'Error');
            }// end_else
        }, function(error) {
            console.log(error);
        });// end_request
    }// end_$sendEmail
});
