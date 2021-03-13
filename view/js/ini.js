//LA FONT D'AQUESTA SOLUCIÓ SURT D'ACÍ https://es.stackoverflow.com/questions/1366/c%C3%B3mo-incluir-un-archivo-javascript-a-otro-archivo-javascript-sin-utilizar-jquer
function importarScript(nombre) {
  var scriptImport = document.createElement("script");
  scriptImport.src = nombre;
  document.querySelector("head").appendChild(scriptImport);
}

function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: sUrl,
      type: sType,
      dataType: sTData,
      data: sData,
    })
      .done((data) => {
        resolve(data);
      })
      .fail((jqXHR, textStatus, errorThrow) => {
        reject(errorThrow);
      });
  });
}

function clickShopMenu() {
  $("#Tienda").click(function () {
    // if (sessionStorage.getItem("filterCategory") != null) {
    //   var stop = false;
    // sessionStorage.removeItem("filterCategory");
    // sessionStorage.removeItem("id");

    cleanItems();

    // }
  });
}

function cleanItems() {
  sessionStorage.removeItem("VHS");
  sessionStorage.removeItem("DVD");
  sessionStorage.removeItem("Blu-Ray");
  sessionStorage.removeItem("4K");
  sessionStorage.removeItem("Digital");
  sessionStorage.removeItem("Otro");
  sessionStorage.removeItem("op");
  sessionStorage.removeItem("order");
}

function cleanSQLInyection(chairSearch) {
  chairSearch = chairSearch
    .split("'") // separa el string según espacios en blanco
    .join(""); // vuelve a armar el string

  chairSearch = chairSearch
    .split('"') // separa el string según espacios en blanco
    .join(""); // vuelve a armar el string
  return chairSearch;
}

function openMaps(id) {
  sessionStorage.setItem("idmaps", id);
  $("#map").attr({ style: "height: 400px;width: 100%;" });

  geolocation();
  script_maps();
}

function script_maps() {
  if (document.getElementById("map") != null) {
    var script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=" +
      API_KEY +
      "&callback=initMap";
    script.async;
    script.defer;
    document.getElementsByTagName("script")[0].parentNode.appendChild(script);
    // console.log(script);
  }
}
function initMap() {
  //Opciones de mapa
  var options = {
    zoom: 10,
    center: {
      lat: parseFloat(sessionStorage.getItem("latitude")),
      lng: parseFloat(sessionStorage.getItem("longitude")),
    },
  };

  // NEW MAP
  map = new google.maps.Map(document.getElementById("map"), options);

  //Add Marker
  var marker = new google.maps.Marker({
    position: {
      lat: parseFloat(sessionStorage.getItem("latitude")),
      lng: parseFloat(sessionStorage.getItem("longitude")),
    },
    map: map,
    icon: "",
    // 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
  });
  OpenCoords();

  // const cityCircle = new google.maps.Circle({
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 0.2,
  //   strokeWeight: 2,
  //   fillColor: "#FF0000",
  //   fillOpacity: 0.35,
  //   map,
  //   center: {
  //     lat: parseFloat(sessionStorage.getItem("latitude")),
  //     lng: parseFloat(sessionStorage.getItem("longitude")),
  //   },
  //   radius: Math.sqrt(3000) * 100,
  // });
}

function OpenCoords() {
  let id = sessionStorage.getItem("idmaps");
  var url =
    "module/shop/controller/controllerShopPage.php?op=shopsGeolocation&product=" +
    id;
  // console.log(url);

  ajaxPromise(url, "GET", "JSON")
    .then(function (data) {
      var pointMarker = new Array();

      // console.log("Sí apleguen les coordenades");
      // console.log(data);
      pointMarker = setPoint(data);
      return pointMarker;
    })
    .catch(function () {
      console.log("No apleguen les coordenades");
    });
}
function setPoint(coords) {
  var pointMarker = new Array();

  for (var i = 0; i < coords.length; i++) {
    pointMarker[i] = new google.maps.Marker({
      position: {
        lat: parseFloat(coords[i]["latitude"]),
        lng: parseFloat(coords[i]["longitude"]),
      },
      map: map,
      icon:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    });
  }
  return pointMarker;
}

function geolocation() {
  if (navigator.geolocation) {
    // console.log("Tu navegador permite la geolocalización ");
  } else {
    console.log("Tu navegador NO permite la geolocalización ");
  }

  function localizacion(posicion) {
    sessionStorage.setItem("latitude", posicion.coords.latitude);
    sessionStorage.setItem("longitude", posicion.coords.longitude);
    // console.log(typeof(sessionStorage.getItem("latitude"))  +" "+ typeof(sessionStorage.getItem("longitude")))
  }

  function error() {
    alert("No se pudo obtener tu geolocalización ");
  }
  navigator.geolocation.getCurrentPosition(localizacion, error);
}

function APIspam() {
  $("#apispam").empty();
  $("<h2>")
    .attr({ style: "text-align: center;  margin-top: 40px;  " })
    .text(
      "¡Hola cinemaniaco! Creo que las siguientes películas te pueden interesar"
    )
    .appendTo("#apispam");

  //   $("#apispam").addClass("owl-carousel");
  // var four = 4;
  for (i = 0; i < 4; i++) {
    var number = Math.round(Math.random() * 100);
    console.log(number);
    ajaxPromise(
      "http://www.omdbapi.com/?t=" + number + "&apikey=" + API_MOVIES_KEY,
      "GET",
      "JSON"
    )
      .then(function (data) {
        // console.log(data);
        if (data.Poster != "N/A") {
          console.log(data.Title);
          var hrefWeb = $("<a>")
            .attr({ href: data.Website, id: "websiteAPI" })
            .appendTo("#apispam");

          $("<img>")
            .attr({ src: data.Poster, id: "apiPublicidad" })
            .appendTo(hrefWeb);
        }
        // $.each(data, function (index, list) {});
      })
      .catch(function () {
        console.log("error API_SPAM");
      });
  }
}
function removeItemLogin() {
  console.log("entra");
   localStorage.removeItem("id");
      localStorage.removeItem("user");
      localStorage.removeItem("type");
      localStorage.removeItem("avatar");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
}
function DOMLogin() {
  $("#loginUser").empty();

  $("#loginMenu").text("Login").addClass("loginMenu").css("color", "gainsboro");
}
function loginMenu() {
  $("#loginMenu").empty();
  $("#loginUser").empty();

  console.log(localStorage.getItem("user"));
  console.log("eh");

  if (localStorage.getItem("user") != null) {
    $("#loginUser")
      .text(localStorage.getItem("user"))
      .css("color", "gainsboro");
    $("#loginMenu")
      .text("cerrar sesion")
      .addClass("loginMenu")
      .css("color", "gainsboro");
  } else {
    DOMLogin();
  }
  ////El cambio de color al pasar el ratón por el login
  $("#loginMenu").mouseenter(function () {
    $("#loginMenu").css("color", "white");
  });
  $("#loginMenu").mouseleave(function () {
    $("#loginMenu").css("color", "gainsboro");
  });
  ////Fin cambio de color

  $("#loginMenu").click(function () {
    console.log(localStorage.getItem("user"));
    if (localStorage.getItem("user") != null) {
      removeItemLogin();
      DOMLogin();
    } else {
      window.location.href = "index.php?page=login";
    }
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
function DOMLogin() {
  $("#loginUser").empty();

  $("#loginMenu").text("Login").addClass("loginMenu").css("color", "gainsboro");
}
function loginMenu() {
  $("#loginMenu").empty();
  $("#loginUser").empty();

  if (localStorage.getItem("user") != null) {
    $("#loginUser")
      .text(localStorage.getItem("user"))
      .css("color", "gainsboro")
      .prepend(
        '<img id="menuAvatar" src=' + localStorage.getItem("avatar") + " />"
      );
    $("#loginMenu")
      .text("cerrar sesion")
      .addClass("loginMenu")
      .css("color", "gainsboro");
  } else {
    DOMLogin();
  }
  ////El cambio de color al pasar el ratón por el login
  $("#loginMenu").mouseenter(function () {
    $("#loginMenu").css("color", "white");
  });
  $("#loginMenu").mouseleave(function () {
    $("#loginMenu").css("color", "gainsboro");
  });
  ////Fin cambio de color

  $("#loginMenu").click(function () {
    if (localStorage.getItem("user") != null) {
      removeItemLogin();
      DOMLogin();
    } else {
      window.location.href = "index.php?page=login";
    }
  });
}
function checkToken() {
  if (localStorage.getItem("token") != null) {
    var token = localStorage.getItem("token");
    ajaxPromise(
      "module/login/controller/controllerLogin.php?op=menu", //typeForm =
      "POST",
      "JSON",
      { token: token }
    )
      .then(function (data) {
        console.log(typeof data);
        console.log(data);
        if (data == false) {
          localStorage.removeItem("token");
          alert("la sesión ha finalizado");
          removeItemLogin();
          loginMenu();
        } else if (typeof data == "object") {
          console.log(data.username);
          localStorage.setItem("id", data.id);
          localStorage.setItem("user", data.username);
          localStorage.setItem("type", data.type);
          localStorage.setItem("avatar", data.avatar);
          localStorage.setItem("email", data.email);
          loginMenu();
        }
      })
      .catch(function (data) {
        console.log(data);
      });
  } else {
    loginMenu();
  }
}

$(document).ready(function () {
  checkToken();
});
