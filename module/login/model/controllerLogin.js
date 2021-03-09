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
/**
 * typeForm="register"/"login"
 */
function ajaxSend(typeForm, serialize) {
  console.log("entra a ajaxSend");

  ajaxPromise(
    "module/login/controller/controllerLogin.php?op=" + typeForm, //typeForm =
    "POST",
    "JSON",
    {serialize:serialize}
  )
    .then(function (data) {
      console.log("entra a Then");

      console.log(data);
    })
    .catch(function (data) {
      console.log(data);
    });
}
function sendRegisterForm() {
  if (validateUser() === true) {
    console.log("valida y entra");

    let serialize = $("formRegister").serializeArray();
    ajaxSend("register", serialize);
  }
}

function getClickEnterForm() {
  //REGISTER
  //REGISTER
  //REGISTER
  $(".register-form").keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      sendRegisterForm();
    }
  });

  $("#buttonR").click(function (event) {
    event.preventDefault();
    sendRegisterForm();
  });

  //LOGIN
  //LOGIN
  //LOGIN
  $(".login-form").keypress(function (event) {
    if (event.which == 13) {
      // FER FER FER sendLoginForm();
    }
  });

  $("#buttonL").click(function (event) {
    event.preventDefault();
    // FER FER FER sendLoginForm();
  });
}

$(document).ready(function () {
  loginMenu();
  loginAnimate();
  getClickEnterForm();
});
