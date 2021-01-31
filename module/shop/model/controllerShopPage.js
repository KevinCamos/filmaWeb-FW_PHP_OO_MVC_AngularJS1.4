$(document).ready(function () {
  loadDivsCarousel();
  loadCategoryCarousel();
  loadHomeProducts();
});

$(document).ready(function () {
  clickProduct();
  clickReturn();
});
function loadDivsCarousel() {
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
  $.ajax({
    url: "module/shop/controller/controllerShopPage.php?op=homeCarousel",
    // url: "module/movies/controller/controller_movies.php?op=read_modal&modal=" + 15,
    dataType: "JSON", //  type : tipo de la petición, GET o POST (GET por defecto)
    type: "GET",
  })
    .done(function (category) {
      for (let i = 0; i < category.length; i++) {
        let id = "" + category[i]["id_category"];
        let ObjectCategory = category[i]["category"];
        let img = "" + category[i]["img"];

        let firstDiv = $("<div></div>")
          .attr({ class: "item", id: "item" + img })
          .appendTo("#products_DIV");
        //  .html('<h4 class=h4'+img+' ><img src=module\\home\\img\\'+img+'> </h4> ');
        // $('<h4></h4>').attr({class:'h4'+img}).appendTo(firstDiv);
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
        // startPosition: "URLHash",

        responsive: {
          // 0: {
          //   items: 1,
          // },
          // 350: {
          //   items: 2,
          // },
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
    .fail(function () {
      window.location.href = "index.php?page=error503";
    });
}

function loadHomeProducts() {
  $.ajax({
    url: "module/shop/controller/controllerShopPage.php?op=listShop",
    dataType: "JSON", //  type : tipo de la petición, GET o POST (GET por defecto)
    type: "GET",
  }).done(function (category) {
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
  });
}
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

function clickProduct() {
  $("body").on("click", "img", function () {
    var clase = this.getAttribute("class");
    var idReturn= this.getAttribute("id");
    var id = this.id;

    if (clase === "touch") {
      id = id.split("-"); ///Dividir imgShop de l'ID. Les ID están juntes a imgShop per a evitar interferències.
      id = id[1];

      $.ajax({
        url:
          "module/shop/controller/controllerShopPage.php?op=openProduct&product=" +
          id,
        dataType: "JSON",
        type: "GET", //  type : tipo de la petición, GET o POST (GET por defecto)
      }).done(function (category) {
        console.log(category);
        $("#listShop").empty(); //Borrar lo de dins
        let count = 0;
        for (var clave in category) {
          console.log(clave);
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
                style: "margin-top:20px;"
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
          style: "margin-left: 25px; margin-top: -330px; width: 50px; height: 50px;",
        })
        .appendTo(table);
      });

      // console.log("id"+id);
      // console.log(clase);
    }else if( idReturn ==="return"){
      loadHomeProducts(); ///Vuelve al catálogo
    }
  });
}


          // num = 0;
          // for (var clave in category[i]) {
          //   let tr = $("<tr></tr>")
          //     .attr({ id: "tr" + i + "-" + num + id })
          //     .appendTo(table);
          //   let th = $("<td></td>")
          //     .attr({ id: "tr" + i + "-" + id })
          //     .append(document.createTextNode(clave + ": " + category[i][clave]))
          //     .appendTo(tr);
          //   num++;
          // }
        
    


      // console.log("id"+id);
      // console.log(clase);

// //   $.ajax({
// //     url: "module/shop/controller/controllerShopPage.php?op=listShop",
//     // url: "module/movies/controller/controller_movies.php?op=read_modal&modal=" + 15,
//     dataType: "JSON", //  type : tipo de la petición, GET o POST (GET por defecto)
//     type: "GET",
//   }).done(function (category) {
