function validate_nameMovie(valueText) {
  console.log(valueText);

  if (valueText.length == 0) {
    $("#error_movie").html("*Escribe el nombre de la película");
  } else if (!valueText.match("^[a-z-A-Z \D 1-9]+$")||valueText.length <3 || valueText.length >30) {
    $("#error_movie").html(
      "*Escribe el nombre de la película entre 3 y 30 letras, sin carácteres especiales"
    );
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
    $("#error_ref").html(
      "*Escribe una referéncia con 6 carácteres, sin carácteres especiales"
    );
  } else {
    $("#error_ref").html("");
  }
}
function validate_director(valueText) {
  if (valueText.length == 0) {
    $("#error_director").html("*Escribe el nombre del director");
  } else if (!valueText.match("^[a-z-A-Z \D]+$")||valueText.length <3 || valueText.length >15) {
    $("#error_director").html(
      "*Escribe el nombre un nombre de director entre 3 y 15 carácteresr"
    );
  } else {
    $("#error_director").html("");
  }
}

function validate_email(valueText) {
  if (valueText.length == 0) {
    $("#error_email").html("*Escribe un e-mail");
  } else if (
    !valueText.match(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    )
  ) {
    $("#error_email").html("*Escribe una dirección de correo válida");
  } else {
    $("#error_email").html("");
  }
}

function validate_format(array) {
  // console.log(array.length);
  //    console.log("array_format.length");
  var count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i].checked) {
      count++;
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
  } else if (!valueText.match("[0-9]{4}")) {
    $("#error_email").html("*Escribe un año correcto");
  } else {
    $("#error_date").html("");
  }
}
function validate_price(valueText) {
  if (valueText.length == 0) {
    $("#error_price").html("*No te olvides de poner un precio");
  } else if (valueText < 0) {
    $("#error_price").html(
      "*Escribe una cantidad utilizando símbolos numéricos"
    );
  } else {
    $("#error_price").html("");
  }
}
function validate_img(valueText) {
  if (valueText.length == 0) {
    $("#error_img").html("*Escribe una ruta de img");
  } else {
    $("#error_img").html("");
  }
}
function validate_movies() {
  // console.log
  validate_nameMovie($("#movie").val());

  validate_ref($("#ref").val());
  validate_director($("#director").val());
  validate_email($("#email").val());
  validate_format(document.formmovies["format[]"]);
  validate_awards(document.formmovies.awards.value);
  validate_genere(document.formmovies.genere.value);
  validate_date($("#anyo").val());
  validate_price($("#price").val());
  validate_img($("#img").val());

  if (
    document.getElementById("error_movie").textContent == "" &&
    document.getElementById("error_ref").textContent == "" &&
    document.getElementById("error_director").textContent == "" &&
    document.getElementById("error_email").textContent == "" &&
    document.getElementById("error_format").textContent == "" &&
    document.getElementById("error_awards").textContent == "" &&
    document.getElementById("error_genere").textContent == "" &&
    document.getElementById("error_date").textContent == "" &&
    document.getElementById("error_price").textContent == "" &&
    document.getElementById("error_img").textContent == ""
  ) {
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
