function validate_nameMovie(valueText) {
    // if (texto.length > 0){
    //     var regEx=/[a-zA-Z0-9- ]{3,30}/;
    //     return regEx.test(texto);

    if (valueText.length == 0) {
        $("#error_movie").html("*Escribe el nombre de la película");
    } else if (!valueText.match("[a-zA-Z0-9- ]{3,30}")) {
        $("#error_movie").html("*Escribe el nombre de la película entre 3 y 30 letras, sin carácteres especiales");
    } else {
        $("#error_movie").html("");
    }
}
function validate_ref(valueText) {
    // if (texto.length > 0){
    //     var regEx=/[a-zA-Z0-9- ]{3,30}/;
    //     return regEx.test(texto);

    if (valueText.length == 0) {
        $("#error_ref").html("*Escribe una referéncia única");
    } else if (!valueText.match("[a-zA-Z0-9]") || valueText.length != 6) {
        $("#error_ref").html("*Escribe una referéncia con 6 carácteres, sin carácteres especiales");
    } else {
        $("#error_ref").html("");
    }
}
function validate_director(valueText) {
    if (valueText.length == 0) {
        $("#error_director").html("*Escribe el nombre del director");
    } else if (!document.formmovies.director.value.match("[a-zA-Z- ]{3,15}")) {
        $("#error_director").html("*Escribe el nombre un nombre de director entre 3 y 15 carácteresr");
    } else {
        $("#error_director").html("");
    }
}


function validate_email(valueText) {
    if (valueText.length == 0) {
        $("#error_email").html("*Escribe un e-mail");
    } else if (!valueText.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")) {
        $("#error_email").html("*Escribe una dirección de correo válida");
    } else {
        $("#error_email").html("");
    }
}

function validate_format(array) {
    // console.log(array.length);
    //    console.log("array_format.length");
    var count = 0
    for (var i = 0; i < array.length; i++) {
        if (array[i].checked) {
            count++
        }
    }
    if (count == 0) {
        $("#error_format").html("*Marca al menos una casilla");

    } else {
        $("#error_format").html("");
    }
    // console.log(count);

}
function validate_awards(valueText) {
    if (valueText.length == 0) {
        $("#error_awards").html("*Selecciona si obtuvo premios");
    } else {
        $("#error_awards").html("");
    }
}
function validate_genere(valueText) {
    if (valueText == "Selecciona un genero") {
        $("#error_genere").html("*Selecciona un género");
    } else {
        $("#error_genere").html("");
    }
}
function validate_date(valueText) {
    if (valueText.length == 0) {
        $("#error_date").html("*Selecciona una fecha");
    } else {
        $("#error_date").html("");
    }
}

function validate_movies() {
    // console.log
    validate_nameMovie(document.formmovies.movie.value);
    validate_ref(document.formmovies.ref.value)
    validate_director(document.formmovies.director.value);
    validate_email(document.formmovies.email.value);
    validate_format(document.formmovies['format[]']);
    validate_awards(document.formmovies.awards.value);
    validate_genere(document.formmovies.genere.value);
    validate_date(document.formmovies.anyo.value);

    if (document.getElementById('error_movie').textContent == ""
        && document.getElementById('error_ref').textContent == ""
        && document.getElementById('error_director').textContent == ""
        && document.getElementById('error_email').textContent == ""
        && document.getElementById('error_format').textContent == ""
        && document.getElementById('error_awards').textContent == ""
        && document.getElementById('error_genere').textContent == ""
        && document.getElementById('error_date').textContent == "") {
        console.log("siiii");


        if (document.formmovies.id.value != "undefined") {
            document.formmovies.submit();
            document.formmovies.action = "index.php?page=movies&op=update";
            console.log("UPDATE");
        } else {
            document.formmovies.submit();
            document.formmovies.action = "index.php?page=movies&op=create";
            console.log("CREATE");
        }
        // return true;

    }
    // else{
    //     console.log("nooooo");

    // }

}   