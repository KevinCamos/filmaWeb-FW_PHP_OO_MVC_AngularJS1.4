function validateUser() {
  var username = $("#nameUserRegister").val();
  var password = $("#passwordRegister").val();
  var password2 = $("#passwordRegister2").val();
  var email = $("#emailRegister").val();
  var expRegUsName = new RegExp("[a-zA-Z0-9]");
  var expRegEmail = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );

  //VALIDACION NAMEUSER
  if (username.length == 0 || password.length == 0 || email.length == 0) {
    $(".error").text("Rellena todos los campos");
    return false;
  } else if (
    username.length < 5 ||
    username.length > 12 ||
    !expRegUsName.test(username)
  ) {
    $(".error").text(
      "El nombre de usuario debe de tener de 4 y 12 carácteres, tampoco puede contener carácteres especiales"
    );
    return false;
  }
  //VALIDACION PASSWORD

  if (password.length < 5 || password.length > 12) {
    $(".error").text("La contraseña debe de tener de 4 y 12 carácteres");
    return false;
  } else if (password != password2) {
    $(".error").text("Repite la contraseña corréctamente");
    return false;
  }

  if (password.length < 5 || password.length > 12) {
    $(".error").text("La contraseña debe de tener de 4 y 12 carácteres");
    return false;
  } else if (password != password2) {
    $(".error").text("Repite la contraseña corréctamente");
    return false;
  }
  //VALIDACION EMAIL
  if (!expRegEmail.test(email)) {
    $(".error").text("Introduce un correo electrónico válido");
  }
  $(".error").empty();
  return true;
}

function getForm() {
  //LOGIN
  $(".login-form").keypress(function (event) {
    if (event.which == 13) {
      console.log($("#nameUserLogin").val());
      console.log($("#passwordLogin").val());
    }
  });
  //REGISTER
  $(".register-form").keypress(function (event) {
    if (event.which == 13) {
      console.log("entra");
      if (validateUser() === true) {
        ///ficar el que s'hatja de ficar
        ///ficar el que s'hatja de ficar
        ///ficar el que s'hatja de ficar
      }
    }
  });

  $(".register-form").submit(function (event) {
    event.preventDefault();
    console.log("entra a submit register");

    console.log($(this).serialize());
    console.log($("form").serialize());
    console.log($(".register-form").serialize());
    console.log($(event).serialize());
  });


  // $(".form .login-form").submit(function (e) {
  //   var texto = $(".login-form").serialize();
  //   console.log("login form");
  //   console.log(texto);
  //   var texto = $(this).serialize();
  //   console.log(texto);

  // });
}

function loginMenu() {
  $("#loginMenu").text("Login").addClass("loginMenu").css("color", "gainsboro");

  ////El cambio de color al pasar el ratón por el login
  $("#loginMenu").mouseenter(function () {
    $("#loginMenu").css("color", "white");
  });
  $("#loginMenu").mouseleave(function () {
    $("#loginMenu").css("color", "gainsboro");
  });
  ////Fin cambio de color

  $("#loginMenu").click(function () {
    window.location.href = "index.php?page=login";
  });
}
function loginAnimate() {
  // https://codepen.io/colorlib/pen/rxddKy plantilla
  $(".message a").click(function () {
    $(".form .modLog").animate(
      { height: "toggle", width: "toggle", opacity: "toggle" },
      "slow"
    );
    $(".error").empty();
  });
}

$(document).ready(function () {
  loginMenu();
  loginAnimate();
  getForm();
});
