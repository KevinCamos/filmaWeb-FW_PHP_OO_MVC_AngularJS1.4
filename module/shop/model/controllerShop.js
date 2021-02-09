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

function loadDivsCarousel() {
  ///NO SE GASTA
  $("#carousel-products").empty(); //Borrar lo de dins

  $("<div></div>")
    .attr({ class: "row", id: "row_products" })
    .appendTo("#carousel-products");
  $("<div></div>")
    .attr({ class: "large-12 columns", id: "large_columns" })
    .appendTo("#row_products");
  $("<h4></h4>")
    .attr({ class: "line_menu" })
    .append(document.createTextNode("Categorías"))
    .appendTo("#large_columns");
  $("<div></div>")
    .attr({
      class: "loop owl-carousel owl-theme owl-loaded",
      id: "products_DIV",
    })
    .appendTo("#large_columns");
}
function loadCategoryCarousel() {
  ///NO SE GASTA
  ajaxPromise(
    "module/shop/controller/controllerShopPage.php?op=homeCarousel",
    "GET",
    "JSON"
  )
    .then(function (category) {
  
      for (let i = 0; i < category.length; i++) {
        let id = "" + category[i]["id_category"];
        let ObjectCategory = category[i]["category"];
        let img = "" + category[i]["img"];

        let firstDiv = $("<div></div>")
          .attr({ class: "item", id: "item" + img })
          .appendTo("#products_DIV");

        $("<img>")
          .attr({
            id: id,
            class: ObjectCategory,
            src: "module\\home\\img\\" + img,
          })
          .appendTo(firstDiv);
      }

      $("#products_DIV").owlCarousel({
        loop: true,
        center: true,
        nav: true,
        margin: 0, //Separación entre imágenes
        URLhashListener: true,

        responsive: {

          1000: {
            items: 3,
          },
          1200: {
            items: 4,
          },
          1400: {
            items: 5,
          },
          3000: {
            items: 6,
          },
          3200: {
            items: 7,
          },
          3400: {
            items: 10,
          },
          4000: {
            items: 15,
          },
        },
      });
    })
    .catch(function () {
      window.location.href = "index.php?page=error503";
    });
}
///////////////////LO ANTERIOR NO ES GASTA
///////////////////LO ANTERIOR NO ES GASTA
///////////////////LO ANTERIOR NO ES GASTA

//CARREGA ELS DIVS GENÈRICS
function loadDivsProducts() {
  let section = $("<section></section>")
    .attr({ id: "port-sec" })
    .appendTo("#listShop");
  let divContainer = $("<div></div>")
    .attr({ class: "container" })
    .appendTo(section);
  return $("<ul></ul>")
    .attr({ class: "portfolio-items col-3" })
    .appendTo(divContainer);
}
//CARREGA TOTS ELS PRODUCTES

function loadHomeProducts() {
let homeID=sessionStorage.getItem("id")
// console.log(sessionStorage.getItem("id"))
///typeof(nomDeLaVariableOFUNCIÓ) 
  if (homeID == "null" || homeID == null) {
    // console.log(sessionStorage.getItem("id"))
    let filterCategory = sessionStorage.getItem("filterCategory");
    switch (filterCategory) {
      case "decade":
        console.log("decade 80 <3");
        searchAjaxProducts(
          "module/shop/controller/controllerShopPage.php?op=filterCarousel&category=decade"
        );
        break;

      case "formate":
        console.log("fomato VHS");
        searchAjaxProducts(
          "module/shop/controller/controllerShopPage.php?op=filterCarousel&category=formate"
        );
        break;

      case "genere":
        console.log("género fantasía ⚔");
        searchAjaxProducts(
          "module/shop/controller/controllerShopPage.php?op=filterCarousel&category=genere"
        );
        break;

      default:
        // console.log("default");
        searchAjaxProducts(
          "module/shop/controller/controllerShopPage.php?op=listShop"
        );
        break;
    }
  }else{
    divsProduct("module/shop/controller/controllerShopPage.php?op=openProduct&product=", homeID)
    console.log(sessionStorage.getItem("id"))

    console.log("abriremos este producto!");
    // sessionStorage.setItem("id", null);


  }

  clickShopMenu();
  // console.log("vale");
  // console.log(sessionStorage.getItem("filterCategory"));
}

//ELS DIVS GENÈRICS DELS PRODUCTES
function divsProduct(urls, id){
  ajaxPromise(
    urls +
      id,
    "GET",
    "JSON"
  )
    .then(function (category) {

      $("#listShop").empty(); //Borrar lo de dins
      let count = 0;
      for (var clave in category) {
        // console.log(clave);
        let id = "" + category["id"];
        let name = category["name"];
        let img = "" + category["img"];

        var table = $("<p></p>")
          .attr({ id: "p" + id })
          .appendTo("#listShop");

        if (clave == "img") {
          $("<img>")
            .attr({
              id: "listShopIMG" + id,
              class: name,
              src: "module\\movies\\img\\" + img,
              align: "left",
              style: "margin-top: -275px;       margin-left: 25px;",
            })
            .appendTo(table);
        } else if (count == 0) {
          $("<ul>")
            .attr({
              id: "item-shop",
              style: "margin-top:20px;",
            })
            .appendTo(table);
          $("<li></li>")
            .attr({
              id: "attribute-item",
              style: "margin-left: 500px;",
            })
            .append(document.createTextNode(clave + ": " + category[clave]))
            .appendTo("#item-shop");
        } else {
          $("<li></li>")
            .attr({
              id: "attribute-item",
            })
            .append(document.createTextNode(clave + ": " + category[clave]))
            .appendTo("#item-shop");
        }
      }
      $("<img>")
        .attr({
          id: "return",
          class: name,
          src: "module\\shop\\img\\return.png",
          align: "left",
          style:
            "margin-left: 25px; margin-top: -330px; width: 50px; height: 50px;",
        })
        .appendTo(table);
    })
    .catch(function () {
      window.location.href = "index.php?page=error503";
    });
}
//AL CLICAR SOBRE UN PRODUCTE L'OBRI I RETORNA
function clickProduct() {
  $("body").on("click", "img", function () {
    var clase = this.getAttribute("class");
    var idReturn = this.getAttribute("id");
    var id = this.id;

    if (clase === "touch") {
      id = id.split("-"); ///Dividir imgShop de l'ID. Les ID están juntes a imgShop per a evitar interferències.
      id = id[1];
      divsProduct("module/shop/controller/controllerShopPage.php?op=openProduct&product=", id);
    } else if (idReturn === "return") {
      sessionStorage.setItem("id", null);
      loadHomeProducts(); ///Vuelve al catálogo
    }
  });
}

//BORRA ELS SESSIONSTORAGE DE MENÚ
function clickShopMenu() {
  $("#Tienda").click(function () {
    // if (sessionStorage.getItem("filterCategory") != null) {
    //   var stop = false;
      sessionStorage.setItem("filterCategory", null);
      sessionStorage.setItem("id", null);
    // }
  });
}

function searchAjaxProducts(dirUrl) {
  ajaxPromise(dirUrl, "GET", "JSON")
    .then(function (category) {
      $("#listShop").empty();

      loadDivsProducts();

      for (let i = 0; i < category.length; i++) {
        let id = "" + category[i]["id"];
        let name = category[i]["name"];
        let img = "";
        img = "" + category[i]["img"];

        let li = $("<li></li>")
          .attr({ id: "li" + i + "-" + id, class: "portfolio-item" })
          .appendTo(".portfolio-items");
        let div1 = $("<div></div>")
          .attr({ id: "div1" + i + "-" + id, class: "item-main" })
          .appendTo(li);
        let div2 = $("<div></div>")
          .attr({ id: "div2" + i + "-" + id, class: "portfolio-image" })
          .appendTo(div1);
        $("<img>")
          .attr({
            id: "imgShop-" + id,
            class: "touch",
            src: "module\\movies\\img\\" + img,
          })
          .appendTo(div2);

        $("<h5></h5>")
          .append(document.createTextNode(category[i]["movie"]))
          .appendTo(div2);
        $("<h2></h2>")
          .append(document.createTextNode(category[i]["price"] + "€"))
          .appendTo(div2);
      }
    })
    .catch(function () {
      window.location.href = "index.php?page=error503";
    });
}
function loadFilterCountry() {
  ///NO SE GASTA
  $("#countryFilter").empty(); //Borrar lo de dins

  ajaxPromise(
    "module/shop/controller/controllerShopPage.php?op=countryFilter",
    "GET",
    "JSON"
  )
    .then(function (data) {
      // console.log(data);
      typeof data;
      for (var clave in data) {
        // console.log(data[clave]["country"]);
        let valueCountry = data[clave]["country"];
        $("<input>")
          .attr({ type: "checkbox", value: valueCountry, id: "country" })
          .appendTo("#countryFilter");

        $("<label>")
          .append(document.createTextNode(valueCountry))
          .appendTo("#countryFilter");
        $("<br>").appendTo("#countryFilter");
      }
    })
    .catch(function () {});
}

$(document).ready(function () {
  loadHomeProducts();
  clickProduct();
});
