let timer = 0;
//////

function launchCounter() {
    //////
    let interval = setInterval(function() {timeCounter()}, 60000);
    let launchSession = setInterval(function() {reloadSession()}, 300000);
}// end_launchCounter

function timeCounter() {
    //////
    timer = timer + 1;
    //////
    if (timer > 14) {
        timer = 0;
        logOut();
    }//
}// end_timeCounter

function reloadSession() {
    //////
    friendlyURL('?page=login&op=reload').then(function(url) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'JSON',
            data: {JWT: localStorage.getItem('token')}
        }).done(function(data) {
            localStorage.setItem('secureSession', data.secureSession);
            localStorage.setItem('token', data.token);
        }).fail(function(f) {
            console.log(f.responseText);
        });
    });
}// end_reloadSession

function checkActivity() {
    //////
    $(document).on('mousedown mousemove keydown scroll touchstart', function() {
        timer = 0;
    });
    //////
}// end_checkActivity

$(document).ready(function() {
    checkActivity();
    launchCounter();
});