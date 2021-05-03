importarScript(GENERAL_PATH + "module/shop/model/filter.js");
importarScript(GENERAL_PATH + "module/shop/model/orderby.js");

/////FUNCIONES PARA CARGAR LOCALSTORAGE DE LOS FORMATOS
function clickerItems(itemString, id) {
  if (
    sessionStorage.getItem(itemString) == null ||
    sessionStorage.getItem(itemString) == "null"
  ) {
    sessionStorage.setItem(itemString, id);
  } else {
    sessionStorage.removeItem(itemString);
  }
  console.log(sessionStorage.getItem(itemString));
}

function storageFormats() {
  $("#VHS").click(function () {
    clickerItems("VHS", this.getAttribute("id"));
  });
  $("#DVD").click(function () {
    clickerItems("DVD", this.getAttribute("id"));
  });
  $("#Blu-Ray").click(function () {
    clickerItems("Blu-Ray", this.getAttribute("id"));
  });
  $("#4K").click(function () {
    clickerItems("4K", this.getAttribute("id"));
  });
  $("#Digital").click(function () {
    clickerItems("Digital", this.getAttribute("id"));
  });
  $("#Otro").click(function () {
    clickerItems("Otro", this.getAttribute("id"));
  });
}
///// FIN DE LAS FUNCIONES PARA CARGAR LOCALSTORAGE DE LOS FORMATOS

//---------------DIVS DE TOTS ELS PRODUCTES O D'UN PRODUCTE-------------//
//CARREGA ELS DIVS GENÈRICS, ES CARGA EN LA FUNCIÓ "loadHomeProducts"
function loadDivsProducts() {
  let section = $("<section></section>")
    .attr({
      id: "port-sec",
    })
    .appendTo("#listShop");
  let divContainer = $("<div></div>")
    .attr({
      class: "container",
    })
    .appendTo(section);
  return $("<ul></ul>")
    .attr({
      class: "portfolio-items col-3",
    })
    .appendTo(divContainer);
}
//ELS DIVS GENÈRICS DELS PRODUCTES
function divsProduct(urls, id) {
  var idUser = localStorage.getItem("idusers");
  idUser == null ? (idUser = -1) : (idUser = idUser);
  // alert(idUser);
  // alert(id);

  ajaxPromise(friendlyModFunc("shop", "openProduct"), "GET", "JSON", {
      id: id,
      idUser: idUser,
    })
    .then(function (category) {
      console.log(category);
      category = category[0];
      //// .hide PER A OCULTAR EL FORMULARI QUE REOBRIREM AL EIXIR
      $("#formularioFiltro").hide();
      $("#orderBy").hide();
      $("#pagination").hide();

      $("#listShop").empty(); //Borrar lo de dins
      var count = 0;
      var id = "" + category.id;
      var img = "" + category.img;

      var table = $("<p></p>")
        .attr({
          id: "p" + id,
        })
        .appendTo("#listShop");

      for (var clave in category) {
        // console.log(clave);

        if (clave == "img") {
          $("<img>")
            .attr({
              id: "return",
              // class: name,
              src: GENERAL_PATH + "module/shop/img/return.png",
              align: "left",
            })
            .appendTo(table);

          $("<img>")
            .attr({
              id: category.id,
              src: GENERAL_PATH + "module/movies/img/" + img,
              align: "left",
              style: "margin-top: -250px;       margin-left: 25px;",
            })
            .addClass("productShop")
            .appendTo(table);
        } else if (count == 0) {
          $("<ul>")
            .attr({
              id: "item-shop",
            })
            .appendTo(table);
          $("<li></li>")
            .addClass("attribute-item")
            .text(clave + ": " + category[clave])
            .appendTo("#item-shop");
          count = 1;
        } else if (
          clave != "formats" &&
          clave != "awards" &&
          clave != "clicks" &&
          clave != "likes"
        ) {
          $("<li></li>")
            .addClass("attribute-item")

            .text(clave + ": " + category[clave])
            .appendTo("#item-shop");
        }
      }
      //ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI
      if (category.likes != null && clave == "likes") {
        $("<svg>")
          .addClass("attribute-item")

          .attr({
            class: "fas fa-heart unlike",
            id: "unlike-" + id,
            onMouseover: "this.style.color='black'",
            onMouseout: "this.style.color='tomato'",
          })
          .appendTo("#item-shop");
      } else {
        $("<svg>")
          .attr({
            class: "far fa-heart like",
            id: "like-" + id,
            onMouseover: "this.style.color='tomato'",
            onMouseout: "this.style.color='black'",
            style: "color:'gray';",
          })
          .appendTo("#item-shop");
      }
      $("<svg>")
        .attr({
          class: "fas fa-cart-plus",
          id: "cart-" + id,
          onMouseover: "this.style.color='green'",
          onMouseout: "this.style.color='gray'",
        })
        .text("comprar")
        .appendTo("#item-shop");

      //ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI ACI

      // PRUEBA

      // $("<div>").attr({id:"map"}).appendTo(table);
      openMaps(id);
      APIspam();
    })
    .catch(function () {
      window.location.href = "index.php?page=error503";
    });
}
//-------FIN-----DIVS DE TOTS ELS PRODUCTES O D'UN PRODUCTE-------------//

//---------------CARGA ELS PRODUCTES O UN PRODUCTE-------------//

//CARREGA TOTS ELS PRODUCTES
function loadHomeProducts(offset = 0) {
  pagOne(offset); //Si la busqueda tiene un nuevo filtro, termina de asegurar que la página por defecto sea la 1.

  let urlCategory = "module/shop/controller/controllerShopPage.php?op=";
  if (sessionStorage.getItem("order") === null) {
    // alert("a vore...");
    sessionStorage.setItem("order", "clicks desc");
  }

  // console.log(sessionStorage.getItem("order"));
  var order = sessionStorage.getItem("order");
  let op = sessionStorage.getItem("op");
  console.log(op);
  switch (op) {
    case "details":
      let homeID = sessionStorage.getItem("id");

      divsProduct(urlCategory + "openProduct&product=", homeID); // FET AL FRAMEWORK
      break;
    case "category":
      let filterCategory = sessionStorage.getItem("filterCategory");
      switch (filterCategory) {
        case "decade":
          console.log("decade 80 <3");
          "formate";
          "genere";
          "searchQuery";
          "listShop";

          pagination("decade");
          searchAjaxProducts(
            friendlyModFunc("shop", "categoryDecade"),
            order,
            offset
          ); // FET AL FRAMEWORK
          break;

        case "formate":
          console.log("fomato VHS");
          pagination("formate");
          searchAjaxProducts(
            friendlyModFunc("shop", "categoryFormate"),
            order,
            offset
          ); // FET AL FRAMEWORK

          break;

        case "genere":
          console.log("género fantasía ⚔");
          pagination("genere");
          searchAjaxProducts(
            friendlyModFunc("shop", "categoryGenere"),
            order,
            offset
          ); // FET AL FRAMEWORK
          break;

        default:
          alert("DEFINIR CATEGORÍA");
          searchAjaxProducts(
            friendlyModFunc("shop", "listShop"),
            order,
            offset
          );
          break;
      }

      break;

    case "search":
      console.log("search");
      var search = sessionStorage.getItem("search");
      console.log(search);
      pagination("searchQuery", search);
      searchAjaxProducts(
        friendlyModFunc("search", "searchList"),
        order,
        offset,
        search
      ); //Modul per fer!!!
      break;

    case "filter":
      var filter = sessionStorage.getItem("filter");
      // alert(filter);
      filter = window.btoa(unescape(encodeURIComponent(filter)));
      pagination("filterQuery", filter);
      searchAjaxProducts(
        friendlyModFunc("shop", "filter"),
        order,
        offset,
        filter
      ); // FET AL FRAMEWORK
      break;
    default:
      // console.log("default");
      pagination();
      friendlyModFunc("shop", "listShop");

      searchAjaxProducts(friendlyModFunc("shop", "listShop"), order, offset);
      break;
  }

  clickShopMenu();
}

//CLICK PRODUCTE
function clickProduct() {
  $("body").on("click", "img", function () {
    var clase = this.getAttribute("class");
    var idReturn = this.getAttribute("id");
    var id = this.id;
    if (clase === "touch") {
      sessionStorage.setItem("opStore", sessionStorage.getItem("op"));
      id = id.split("-"); ///Dividir imgShop de l'ID. Les ID están juntes a imgShop per a evitar interferències.
      id = id[1];
      divsProduct(
        // FET AL FRAMEWORK
        "module/shop/controller/controllerShopPage.php?op=openProduct&product=",
        id
      );
      // console.log(API_KAY);
      // console.log("la ID es " + id);
      countClickProduct(id);
      // openMaps(id);
      // APIspam();
    } else if (idReturn === "return") {
      $("#formularioFiltro").show();
      $("#orderBy").show();
      $("#pagination").show();
      $("#map").empty().removeAttr("style");
      $("#apispam").empty();
      sessionStorage.setItem("op", sessionStorage.getItem("opStore"));

      // sessionStorage.removeItem("op");
      // sessionStorage.setItem("id", null);
      loadHomeProducts(); ///Vuelve al catálogo
    }
  });
}

function countClickProduct(id) {
  dirUrl =
    "module/home/controller/controllerHomePage.php?op=countClick&count=" + id;
  console.log(dirUrl);
  // return false;
  ajaxPromise(dirUrl, "GET", "JSON")
    .then(function (data) {
      console.log(data);
    })
    .catch(function () {
      console.log("ERROR, click no registrado");
    });
}
//-------FIN-----CARGA ELS PRODUCTES O UN PRODUCTE-------------//

function searchAjaxProducts(
  dirUrl,
  order,
  offset,
  search = undefined,
  boolTrue = false
) {
  var idUser = getUser();
  // alert(idUser)
  // alert(dirUrl)
  var sendData = [idUser, order, offset, search]; //Cambiar -1 per id User en funcionar, modificació per al framework
  // alert(sendData)
  ajaxPromise(dirUrl, "GET", "JSON", {
      sendData: sendData,
    })
    .then(function (category) {
      // alert("entra: "+category)
      if (category.length === 1) {
        // FET AL FRAMEWORK
        divsProduct(
          "module/shop/controller/controllerShopPage.php?op=openProduct&product=",
          category[0]["id"]
        );
      } else {
        console.log(category);
        $("#listShop").empty();
        if (boolTrue === true) {
          $("<h1></h1>")
            .text("No se han encontrado resultados con esta búsqueda")
            .appendTo("#listShop");
        }
        loadDivsProducts();

        for (let i = 0; i < category.length; i++) {
          let id = "" + category[i]["id"];
          let name = category[i]["name"];
          let img = "";
          img = "" + category[i]["img"];

          let li = $("<li></li>")
            .attr({
              id: "li" + i + "-" + id,
              class: "portfolio-item",
            })
            .appendTo(".portfolio-items");
          let div1 = $("<div></div>")
            .attr({
              id: "div1" + i + "-" + id,
              class: "item-main",
            })
            .appendTo(li);
          let div2 = $("<div></div>")
            .attr({
              id: "div2" + i + "-" + id,
              class: "portfolio-image",
            })
            .appendTo(div1);
          $("<img>")
            .attr({
              id: "imgShop-" + id,
              class: "touch",
              src: GENERAL_PATH + "module/movies/img/" + img,
            })
            .appendTo(div2);

          $("<h5></h5>").text(category[i]["movie"]).appendTo(div2);

          var h2 = $("<h2></h2>")
            .text(category[i]["price"] + "€")
            .appendTo(div2);
          //ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ ACÍ
          if (category[i]["likes"] != null) {
            $("<svg>")
              .attr({
                class: "fas fa-heart unlike",
                id: "unlike-" + id,
                onMouseover: "this.style.color='black'",
                onMouseout: "this.style.color='tomato'",
              })
              .appendTo(h2);
          } else {
            $("<svg>")
              .attr({
                class: "far fa-heart like",
                id: "like-" + id,
                onMouseover: "this.style.color='tomato'",
                onMouseout: "this.style.color='black'",
              })
              .appendTo(h2);
          }
          $("<svg>")
            .attr({
              class: "fas fa-cart-plus",
              id: "cart-" + id,
              onMouseover: "this.style.color='green'",
              onMouseout: "this.style.color='#303030'",
            })
            .appendTo(h2);
        }
      }
    })
    .catch(function (category) {
      alert(category);
      console.log(category);
      var order = sessionStorage.getItem("order");
      if (boolTrue === true) {
        $("#listShop").empty();
        $("<h1></h1>")
          .text("Ha habido un problema en tu búsqueda")

          .appendTo("#listShop");
      } else {
        searchAjaxProducts(
          friendlyModFunc("shop", "listShop"),
          order,
          0,
          undefined,
          true
        );
      }
    });
}

function spanFilter(textSpan) {
  $("<br>").appendTo("#filters");
  $("<span>").text(textSpan).appendTo("#filters");
  $("<br>").appendTo("#filters");
}

function genereFilter() {
  ajaxPromise(friendlyModFunc("shop", "filterType"), "GET", "JSON", {
      type: "genere",
    })
    .then(function (data) {
      // console.log(data);
      spanFilter("Género");
      $("<select>")
        .attr({
          id: "genere",
          style: "color: black",
        })
        .appendTo("#filters");

      $("<option>")
        .attr({
          value: "default",
        })
        .text("Todos los géneros")
        .appendTo("#genere");
      for (var clave in data) {
        let valueGenere = data[clave]["genere"];

        $("<option>")
          .attr({
            value: valueGenere,
          })
          .text(valueGenere)
          .appendTo("#genere");
      }
    })
    .catch(function () {});
}

function countryFilter() {
  ajaxPromise(friendlyModFunc("shop", "filterType"), "GET", "JSON", {
      type: "country",
    })
    .then(function (data) {
      // console.log(data);
      spanFilter("País");

      $("<select>")
        .attr({
          id: "country",
          style: "color: black",
        })
        .appendTo("#filters");

      $("<option>")
        .attr({
          value: "default",
        })
        .text("Todo el mundo")
        .appendTo("#country");
      for (var clave in data) {
        let valueCountry = data[clave]["country"];

        $("<option>")
          .attr({
            value: valueCountry,
          })
          .text(valueCountry)
          .appendTo("#country");
      }
    })
    .catch(function () {});
}

function formatsFilter() {
  var formatsMatrix = ["VHS", "DVD", "Blu-Ray", "4K", "Digital", "Otro"];
  spanFilter("Formato");

  for (let i = 0; i < formatsMatrix.length; i++) {
    // console.log(sessionStorage.getItem(formatsMatrix[i]));
    // console.log(typeof sessionStorage.getItem(formatsMatrix[i]));
    if (sessionStorage.getItem(formatsMatrix[i]) == formatsMatrix[i]) {
      $("<input>")
        .attr({
          type: "checkbox",
          value: formatsMatrix[i],
          id: formatsMatrix[i],
          checked: "true",
        })
        .appendTo("#filters");
    } else {
      $("<input>")
        .attr({
          type: "checkbox",
          value: formatsMatrix[i],
          id: formatsMatrix[i],
        })
        .appendTo("#filters");
    }
    $("<label>")
      .append(document.createTextNode(formatsMatrix[i]))
      .appendTo("#filters");
    $("<br>").appendTo("#filters");
  }
}

function filtersInput() {
  $("#filters").empty(); //Borrar lo de dins
  genereFilter();
  formatsFilter();
  countryFilter();
}
//BORRA ELS SESSIONSTORAGE

//   <!-- <script src="module\shop\model\filter.js"></script> -->
// <!-- <script src="module\shop\model\geoloclizacion.js"></script> -->
function pagination(type = "listShop", search = undefined) {
  type = [type, search];
  ajaxPromise(friendlyModFunc("shop", "pagination"), "GET", "JSON", {
      type: type,
    })
    .then(function (data) {
      // console.log("e");

      // console.log(data);
      // console.log("e");

      // alert("pagination " + data);

      var countItems = data[0]["countPage"];
      var numPage = countItems / 6;
      if (countItems % 6 != 0) {
        numPage++;
      }

      $("#pagination").bootpag({
        total: numPage, // total pages
      });
      return;
    })
    .catch(function (data) {
      // alert("pagination " + data);
      console.log(data);
    }); ////END AJAX
}

function clickPage() {
  $("#pagination")
    .bootpag({
      maxVisible: 5, // visible pagination
      leaps: true, // next/prev leaps through maxVisible
    })
    .on("page", function (event, num) {
      var offset = (num - 1) * 6;
      // alert(offset);
      sessionStorage.setItem("offset", offset);

      console.log(offset);
      loadHomeProducts(offset);
    });
}

function pagOne(offset) {
  if (offset == 0) {
    $("#pagination").bootpag({
      page: 1,
    });
  }
  return;
}

$(document).ready(function () {
  loadHomeProducts();
  filtersInput();
  storageFormats();
  pagination();

  clickProduct();
  clickPage();
  likeCart("svg");

  // like("li"); en principi este ja estava així, si al acabar de migrar-ho tot funciona, a tope!
});