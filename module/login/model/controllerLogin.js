function validateRegister() {
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
function validateLogin() {
  var username = $("#nameUserLogin").val();
  var password = $("#passwordLogin").val();
  if (username.length == 0 || password.length == 0) {
    $(".error").text("Rellena todos los campos");
    return false;
  }
  $(".error").empty();
  return true;
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

function ajaxSendForm(serialize, typeForm = "login") { //EN PROCÉS DE MIGRACIÓ!
  // console.log(serialize);
  ajaxPromise(friendlyModFunc("login", typeForm ),

   //typeForm =
    "GET",
    "JSON",
    { serialize: serialize }
  )
    .then(function (data) {
      console.log(typeForm);
      console.log(typeof data);
      console.log(data);

      switch (typeForm) {
        case "login":

          if (data == false) {
            console.log(1);
            $(".error").text(
              "Lo sentimos, este usuario o correo electrónico no se encuentra registrado"
            );
          } else if (data == "falsePssword") {
            console.log(2);
            $(".error").text("La contraseña es incorrecta");
          } else {
            localStorage.setItem("token", data);
            window.location.href = friendlyMod("home");
          }

          break;
        case "register":
          if (data == false) {
            $(".error").text(
              "Lo sentimos, este usuario o correo electrónico ya se encuentra registrado"
            );
          } else {
            toastr.success("Se ha registrado corréctamente");
            window.location.href = friendlyMod("shop");
          }
          // alert(data);
          // console.log(data);
          break;
      }
    })
    .catch(function (data) {
      alert(data);

      console.log(data);
    });
}
function sendRegisterForm() {
  if (validateRegister() == true) {
    console.log("valida y entra");

    let serialize = $("#formRegister").serializeArray();
    // console.log(serialize)
    ajaxSendForm(serialize, "register");
  }
}

function getClickEnterForm() {
  //REGISTER REGISTER REGISTER REGISTER REGISTER
  //REGISTER REGISTER REGISTER REGISTER REGISTER
  //REGISTER REGISTER REGISTER REGISTER REGISTER
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

  //LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
  //LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
  //LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN LOGIN
  $(".login-form").keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      if (validateLogin() === true) {
        ajaxSendForm($("#formLogin").serializeArray());
      }
    }
  });

  $("#buttonL").click(function (event) {
    event.preventDefault();
    if (validateLogin() === true) {
      ajaxSendForm($("#formLogin").serializeArray());
      // $("#formLogin").serializeArray()
    }
  });
}

$(document).ready(function () {
  getClickEnterForm();
  loginAnimate();
});
