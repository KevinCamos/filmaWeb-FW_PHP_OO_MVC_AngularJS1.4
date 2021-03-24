function getAllCart() {
  $("#cartMenu").empty();
  var idUser = getUser();
  if (idUser != -1) {
    ajaxPromise(
      "module/cart/controller/controllerCart.php", //typeForm =
      "POST",
      "JSON",
      { op: "getCart", idUser: idUser }
    )
      .then(function (data) {
        console.log(data);
        if (data != -1) {
          console.log(Object.keys(data).length);
          var table = $("<table>").appendTo("#cartMenu");
          $("<tr>").attr({ id: "tileLine" }).appendTo(table);
          $("<th>").html("<h2>Cesta</h2>").appendTo(tileLine);
          for (var i = 0; i < Object.keys(data).length; i++) {
            var cantidad = data[i]["cantidad"];
            var idalbaran = data[i]["idalbaran"];
            var idlinea = data[i]["idlinea"];
            var idproducto = data[i]["idproducto"];
            var movie = data[i]["movie"];
            var price = data[i]["price"];
            var img = data[i]["img"];
            var totalPrice = price * cantidad;
            totalPrice = totalPrice.toFixed(2).replace(".", ",");
            var line = $("<tr>")
              .attr({ id: "lineProduct" + idproducto })
              .appendTo(table);
            var columna = $("<th>")
              .attr({ id: "colImg" + idproducto })
              .appendTo(line);
            $("<img>")
              .attr({
                id: movie + idproducto,
                src: "module\\movies\\img\\" + img,
              })
              .appendTo(columna);
            var columna = $("<th>")
              .attr({ id: "colInfo" + idproducto })
              .appendTo(line);
            $("<div>")
              .attr({ id: "infoProduct" })
              .text(movie)
              .appendTo(columna);
            $("<div>")
              .attr({ id: "price" + idproducto })
              .html("<h1 class='linePrice'>" + totalPrice + "<h2>") /////recalcular!!!!! OJO!
              .appendTo(columna);
            var amount = $("<div>")
              .attr({ id: "amount" + idproducto, class: "amount" })
              .appendTo(columna);
            $("<svg>")
              .attr({
                class: "fas fa-minus",
                id: "rest-" + idproducto + "-" + idalbaran,
                onMouseover: "this.style.color='tomato'",
                onMouseout: "this.style.color='black'",
                style: "color:'gray';",
              })
              .appendTo(amount);
            // $("<input>")
            // .attr({ type:"number",id: "totalAmount" + idproducto, class:"inputNum" })
            // .appendTo(amount);
            $("<span>")
              .attr({ id: "totalAmount" + idproducto, class: "inputNum" })
              .text(cantidad)
              .appendTo(amount);
            $("<svg>")
              .attr({
                class: "fas fa-plus",
                id: "sum-" + idproducto + "-" + idalbaran,
                onMouseover: "this.style.color='#00BB2D'",
                onMouseout: "this.style.color='black'",
                style: "color:'gray';",
              })
              .appendTo(amount);
            $("<svg>")
              .attr({
                class: "fas fa-trash-alt",
                id: "delete-" + idproducto + "-" + idalbaran,
                onMouseover: "this.style.color='gray'",
                onMouseout: "this.style.color='black'",
                style: "color:'gray';",
              })
              .appendTo(amount);
          }
        } else {
          cartEmpty();
        }
      })
      .catch(function (data) {
        // cartEmpty();
      });
  } else {
    cartEmpty();
  }
}

function cartEmpty() {
  var table = $("<table>").appendTo("#cartMenu");
  $("<tr>").attr({ id: "tileLine" }).appendTo(table);
  $("<th>").html("<h1>La Cesta está vacía</h1>").appendTo(tileLine);
}

function clickAction(etiqueta) {
  $("body").on("click", etiqueta, function () {
    console.log(this);
    var thisClass = $(this).attr("class");
    if (thisClass == "fas fa-minus" || thisClass == "fas fa-plus") {
      console.log("entra");
      if (tokenTrue() == true) {
        id = $(this).attr("id");
        var id = id.split("-");
        var type = id[0];
        var idproducto = id[1];
        var idalbaran = id[2];
        var idUser = localStorage.getItem("idusers");
        console.log(
          idproducto + " i " + idalbaran + " i " + type + " i " + idUser
        );

        // ajaxPromise(
        //   "module/shop/controller/controllerShopPage.php", //typeForm =
        //   "GET",
        //   undefined,
        //   { op: "likeds", typeLike: typeLike, idProduct: id, idUser: idUser }
        // )
        //   .then(function () {

        //   })
        //   .catch(function () {
        //     alert("error");
        //   });
      }
    }
  });
}

$(document).ready(function () {
  getAllCart();
  clickAction("svg");
});
