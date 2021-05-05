function changeLanguage(language) {
    language = language || localStorage.getItem('app-lang') || 'en';
    localStorage.setItem('app-lang', language);
    var element = document.querySelectorAll('[data-tr]');
    $.ajax({
        url: GENERAL_PATH + 'view/inc/language/' + language + '.json',
        type: 'POST',
        dataType: 'JSON',
        success: function (data) {
            for (var i = 0; i < element.length; i++) {
                element[i].innerHTML = data.hasOwnProperty(language) ?
                    data[language][element[i].dataset.tr] :
                    element[i].dataset.tr;
            }
        }
    })
}

function translate() {
    changeLanguage();

    $("#btn-es").on("click", function () {
        changeLanguage('es')
    });
    $("#btn-en").on("click", function () {
        changeLanguage('en')
    });
    $("#btn-val").on("click", function () {
        changeLanguage('val')
    });
};