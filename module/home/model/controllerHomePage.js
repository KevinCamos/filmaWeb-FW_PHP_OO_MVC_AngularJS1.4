$(document).ready(function () {
  ///CAROUSEL CATEGORY
  loadDivsCarousel();
  loadCategoryCarousel();
  loadHomeProducts()
  // $(document).ready(function() {
  //   $('.owl-carousel').owlCarousel({
  //     margin: 10,
  //     loop: true,
  //     autoWidth: true,
  //     items: 4
  //   })
  // })
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
    url: "module/home/controller/controllerHomePage.php?op=homeCarousel",
    // url: "module/movies/controller/controller_movies.php?op=read_modal&modal=" + 15,
    dataType: "JSON", //  type : tipo de la petición, GET o POST (GET por defecto)
    type: "GET",
  }).done(function (category) {
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
          id: "img" + id,
          class: ObjectCategory,
          src: "module\\home\\img\\" + img,
        })
        .appendTo(firstDiv);
    }

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
  });
}

function loadHomeProducts() {
  $.ajax({
    url: "module/home/controller/controllerHomePage.php?op=homeProducts",
    // url: "module/movies/controller/controller_movies.php?op=read_modal&modal=" + 15,
    dataType: "JSON", //  type : tipo de la petición, GET o POST (GET por defecto)
    type: "GET",
  }).done(function (category) {
    $("#productsHome").empty(); //Borrar lo de dins
    $("<p></p> ")
    .attr({
      id:"font-center-home"
    }).append(document.createTextNode("Nuestros mejores productos"))
    .appendTo("#productsHome");
   
    
    for (let i = 0; i < category.length; i++) {
      let id = "" + category[i]["id"];
      let name = category[i]["name"];
      let img= "";
       img = "" + category[i]["img"];



      $("<img>")
      .attr({
        id: "productsHomeIMG" + id,
        class: name,
        src: "module\\movies\\img\\" + img,
      }).appendTo("#productsHome")
    }
  });
}
