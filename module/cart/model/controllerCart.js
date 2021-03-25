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
function modalDelete(thisProduct, idProduct) {
  $("#modalCart")
    .text("¿De verdad deseas quitar esta película del carrito?")
    .dialog({
      width: 400, //<!-- ------------- ancho de la ventana -->
      height: 150, //<!--  ------------- altura de la ventana -->
      //show: "scale", <!-- ----------- animación de la ventana al aparecer -->
      //hide: "scale", <!-- ----------- animación al cerrar la ventana -->
      resizable: "true", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
      //position: "down",<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
      modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
      buttons: {
        No: function () {
          $(this).dialog("close");

          return false;
        },
        Eliminar: function () {
          $(this).dialog("close");
          ajaxUpdateRemoProduct(thisProduct, true);
          $("#lineProduct" + idProduct).remove();
          getCart()
        },
      },
      show: {
        effect: "blind",
        duration: 100,
      },
      hide: {
        effect: "blind",
        duration: 100,
      },
    });
}

function restrictionSumRestDelete(
  thisProduct,
  type,
  idProduct,
  deleteQuest2True = false
) {
  if (deleteQuest2True == true) {
    return true;
  }
  cantidad = parseInt($("#totalAmount" + idProduct).text(), 10);
  // return type;
  // alert(cantidad);
  switch (type) {
    case "rest":
      if (cantidad == 1) {
        modalDelete(thisProduct, idProduct);
        return false;
      } else {
        return true;
      }
    case "sum":
      return true;

    case "delete":
      modalDelete(thisProduct, idProduct);

      break;
  }
}
function ajaxUpdateRemoProduct(thisProduct, deleteQuest2True = false) {
  console.log(thisProduct);
  var thisClass = $(thisProduct).attr("class");
  if (
    thisClass == "fas fa-minus" ||
    thisClass == "fas fa-plus" ||
    thisClass == "fas fa-trash-alt"
  ) {
    console.log("entra");
    if (tokenTrue() == true) {
      id = $(thisProduct).attr("id");
      var id = id.split("-");
      var type = id[0];
      var idProduct = id[1];
      var idAlbaran = id[2];
      var idUser = localStorage.getItem("idusers");
      var deleteQuest = restrictionSumRestDelete(
        thisProduct,
        type,
        idProduct,
        deleteQuest2True
      );

      if (deleteQuest == true) {
        console.log(
          idProduct + " i " + idAlbaran + " i " + type + " i " + idUser
        );

        ajaxPromise(
          "module/cart/controller/controllerCart.php", //typeForm =
          "POST",
          "JSON",
          {
            op: "updateAmount",
            type: type,
            idProduct: idProduct,
            idUser: idUser,
            idAlbaran: idAlbaran,
          }
        )
          .then(function (date) {
            getCart()

            switch (type) {
              case "rest":
                sumRestAmount(idProduct, -1);
                break;

              case "sum":
                sumRestAmount(idProduct, 1);
                break;
              case "delete":
                $("#lineProduct" + idProduct).remove();

                break;
            }

            // alert(date);
            console.log(date);
          })
          .catch(function (date) {
            // alert(date);
          });
      }
    }
  }
}
function clickAction() {
  $("body").on("click", "svg", function () {
    ajaxUpdateRemoProduct(this);
  });
}
function sumRestAmount(idProduct, num) {
  cantidad = parseInt($("#totalAmount" + idProduct).text(), 10);
  $("#totalAmount" + idProduct).text(cantidad + num);
}

$(document).ready(function () {
  getAllCart();
  clickAction();
});
