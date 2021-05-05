function loadDivsCarousel() {
  $("#carousel-products").empty(); //Borrar lo de 

  $("<div></div>")
    .attr({
      class: "row",
      id: "row_products"
    })
    .appendTo("#carousel-products");
  $("<div></div>")
    .attr({
      class: "large-12 columns",
      id: "large_columns"
    })
    .appendTo("#row_products");
  $("<h4></h4>")
    .attr({
      class: "line_menu"
    })
    .append(document.createTextNode("Categorías"))
    .appendTo("#large_columns");
  $("<div></div>")
    .attr({
      class: "loop owl-carousel owl-theme owl-loaded",
      id: "products_DIV",
    })
    .appendTo("#large_columns");

  loadCategoryCarousel()

}

function loadCategoryCarousel() {
  ajaxPromise(friendlyModFunc("home","carousel"), "GET", "JSON")
    .then(function (category) {
      console.log(category);
      for (let i = 0; i < category.length; i++) {
        let id = "" + category[i]["id_category"];
        let ObjectCategory = category[i]["category"];
        let img = "" + category[i]["img"];

        let firstDiv = $("<div></div>")
          .attr({
            class: "item",
            id: "item" + img
          })
          .appendTo("#products_DIV");
        $("<img>")
          .attr({
            id: "img" + id,
            class: "category",
            value: ObjectCategory,
            src: GENERAL_PATH+"module/home/img/" + img,
          })
          .appendTo(firstDiv);
      }
      $(".category").click(clickCategory); ////FUNCIÓ CLICK CATEGORY///////////////////////
      // var zoom = $(window).height()
      // itemsCalcul = zoom/300
      $("#products_DIV").owlCarousel({
        // items: category.length, //Puc canviar-la de lloc, però ¡¡ULL!! Hi hauria que deixar de gastar category.lenght
        loop: true,
        center: true,
        // nav: true,
        margin: 0, //Separación entre imágenes
        // URLhashListener: true,
        // autoplay:true,
        // autoplayTimeout:1000,
        // autoplayHoverPause:true,
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
    // .fail(function () {
    .catch(function (data) {
      alert(data);
      console.log(data);
    });
}

function ajaxSearch(dirUrl, offset = 0) {
  $("<div>").addClass("loading").appendTo("#productsHome"); //NO VAAAAA :(

  ajaxPromise(dirUrl, "GET", "JSON", {
      offset: offset
    })
    .then(function (category) {
      // $("#messages-list").removeClass("loading");
      console.log(category);
      for (let i = 0; i < category.length; i++) {
        let id = "" + category[i]["id"];
        // let name = category[i]["name"];
        let img = "";
        img = "" + category[i]["img"];

        $("<img>")
          .attr({
            id: id,
            class: "productHome",
            src: GENERAL_PATH+"module/movies/img/" + img,
          })
          .appendTo("#productsHome");
      }
      // $(".loading").removeItem();
      $(".productHome").click(clickProductHome); ////FUNCIÓ CLICK CATEGORY///////////////////////
    })
    .catch(function (data) {
      alert(data);
      console.log(data);
    });
}

function detectScrollBrands() {
  var count = 1;

  $(document).on("scroll", function () {
    // console.log($(window).scrollTop() + "ScrollTop");
    // console.log($(window).height() + "height");
    // console.log($(document).height() + "documentheight");
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      // console.log("ENTRA!");

      if (count < 7) {
        // console.log("CARGAR SCROLL");
        var offset = count * 2;
        loadHomeProducts(offset);
        count++;
      }
    } // end_if
  });
}

function loadHomeProducts(offset = 0) {


  ajaxSearch(friendlyModFunc("home","homeProducts"), offset


  );
}

function dialogBeastProducts() {
  $("<p></p> ")
    .attr({
      id: "font-center-home",
    })
    .append(document.createTextNode("Nuestros mejores productos"))
    .appendTo("#productsHome");
}

function clickCategory() {
  //FUNCIÓ A LA LÍNEA 45!
  cleanItems();

  var category = $(this).attr("value");
  sessionStorage.setItem("op", "category");

  sessionStorage.setItem("filterCategory", category);
  if (category == null) {
    // toastr["info"]("Ingresa criterios de busqueda"), {"iconClass":'toast-info'}; // NO ESTÀ DEFINIIIIT
    console.log(
      "El archivo al que das click no tiene ningún criterio de búsqueda añadido"
    );
  } else {

    // setTimetout() es una función para decirle que pasado X tiempo realice una función
    window.location.href = friendlyMod("shop");
  }
}

function clickProductHome() {
  //FUNCIÓ A LA LÍNEA 45!
  cleanItems();

  var id = $(this).attr("id");
  console.log(id);
  sessionStorage.setItem("op", "details");

  sessionStorage.setItem("id", id);
  sessionStorage.removeItem("category");
  if (id == null) {
    // toastr["info"]("Ingresa criterios de busqueda"), {"iconClass":'toast-info'}; // NO ESTÀ DEFINIIIIT
    console.log(
      "El archivo al que das click no tiene ningún criterio de búsqueda añadido"
    );
  } else {
    // setTimetout() es una función para decirle que pasado X tiempo realice una función
    countClickProduct(id);
    // return false;

    window.location.href = friendlyMod("shop");
  }
}

function countClickProduct(id) {
  dirUrl =   friendlyModFunc("home","countClick");
  console.log(dirUrl);
  // return false;

  ajaxPromise(dirUrl, "GET", "JSON", {
      id: id
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (data) {

      alert(data);

      console.log(data);

    });
}

$(document).ready(function () {
  $("#productsHome").empty(); //Borrar lo de dins
  loadDivsCarousel();
  // loadCategoryCarousel();
  dialogBeastProducts();
  loadHomeProducts();
  detectScrollBrands();
  clickShopMenu();

});