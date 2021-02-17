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
  ajaxPromise(
    "module/home/controller/controllerHomePage.php?op=homeCarousel",
    "GET",
    "JSON"
  )
    .then(function (category) {
      // $.ajax({
      //   url: "module/home/controller/controllerHomePage.php?op=homeCarousel",
      //   dataType: "JSON", //  type : tipo de la petición, GET o POST (GET por defecto)
      //   type: "GET",
      // })
      //   .done(function (category) {
      for (let i = 0; i < category.length; i++) {
        let id = "" + category[i]["id_category"];
        let ObjectCategory = category[i]["category"];
        let img = "" + category[i]["img"];

        let firstDiv = $("<div></div>")
          .attr({ class: "item", id: "item" + img })
          .appendTo("#products_DIV");
        $("<img>")
          .attr({
            id: "img" + id,
            class: "category",
            value: ObjectCategory,
            src: "module\\home\\img\\" + img,
          })
          .appendTo(firstDiv);
      }
      $(".category").click(clickCategory); ////FUNCIÓ CLICK CATEGORY///////////////////////

      $("#products_DIV").owlCarousel({
        // items: category.length, //Puc canviar-la de lloc, però ¡¡ULL!! Hi hauria que deixar de gastar category.lenght
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
    // .fail(function () {
    .catch(function () {
      window.location.href = "index.php?page=error503";
    });
}
function ajaxSearch(dirUrl) {
  ajaxPromise(dirUrl, "GET", "JSON")
    .then(function (category) {
      $("#productsHome").empty(); //Borrar lo de dins
      $("<p></p> ")
        .attr({
          id: "font-center-home",
        })
        .append(document.createTextNode("Nuestros mejores productos"))
        .appendTo("#productsHome");

      for (let i = 0; i < category.length; i++) {
        let id = "" + category[i]["id"];
        let name = category[i]["name"];
        let img = "";
        img = "" + category[i]["img"];

        $("<img>")
          .attr({
            id: id,
            class: "productHome",
            src: "module\\movies\\img\\" + img,
          })
          .appendTo("#productsHome");
      }
      $(".productHome").click(clickProductHome); ////FUNCIÓ CLICK CATEGORY///////////////////////
    })
    .catch(function () {
      window.location.href = "index.php?page=error503";
    });
}

function loadHomeProducts() {
  ajaxSearch("module/home/controller/controllerHomePage.php?op=homeProducts");
}
function clickCategory() {
  //FUNCIÓ A LA LÍNEA 45!
  var category = $(this).attr("value");
  sessionStorage.setItem("filterCategory", category);
  if (category == null) {
    // toastr["info"]("Ingresa criterios de busqueda"), {"iconClass":'toast-info'}; // NO ESTÀ DEFINIIIIT
    console.log(
      "El archivo al que das click no tiene ningún criterio de búsqueda añadido"
    );
  } else {
    // setTimetout() es una función para decirle que pasado X tiempo realice una función
    window.location.href = "index.php?page=shop";
  }
}
function clickProductHome() {
  //FUNCIÓ A LA LÍNEA 45!
  var id = $(this).attr("id");
  console.log(id);
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("category", null);
  if (id == null) {
    // toastr["info"]("Ingresa criterios de busqueda"), {"iconClass":'toast-info'}; // NO ESTÀ DEFINIIIIT
    console.log(
      "El archivo al que das click no tiene ningún criterio de búsqueda añadido"
    );
  } else {
    // setTimetout() es una función para decirle que pasado X tiempo realice una función

    window.location.href = "index.php?page=shop";
  }
}
// function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: sUrl,
//       type: sType,
//       dataType: sTData,
//       data: sData,
//     })
//       .done((data) => {
//         resolve(data);
//       })
//       .fail((jqXHR, textStatus, errorThrow) => {
//         reject(errorThrow);
//       });
//   });
// }

$(document).ready(function () {
  loadDivsCarousel();
  loadCategoryCarousel();
  loadHomeProducts();
});
