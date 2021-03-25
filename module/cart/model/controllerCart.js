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
              .text(price + "€") /////recalcular!!!!! OJO!
              .appendTo(columna);
            $("<div>")
              .attr({ id: "totalprice" + idproducto })
              .html("<h1 class='linePrice'>" + totalPrice + "€<h2>") /////recalcular!!!!! OJO!
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
function modalDelete(thisProduct) {
  Swal.fire({
    title: "¿De verdad quieres eliminar este producto? :'(",
    text: "No te olvides de que el cine es cultura, no te deshagas de él",
    icon: "ask",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Eliminar!",
    cancelButtonText: "Mantener en el carrito",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "¡Eliminado!",
        "El producto ha sido eliminado con éxito",
        "success"
      );
      ajaxUpdateRemoProduct(thisProduct, true, "delete");
      // $("#lineProduct" + idProduct).remove();
      // getCart();
    } else {
      return false;
    }
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
        modalDelete(thisProduct);
        return false;
      } else {
        return true;
      }
    case "sum":
      return true;

    case "delete":
      modalDelete(thisProduct);

      break;
  }
}
function ajaxUpdateRemoProduct(
  thisProduct,
  deleteQuest2True = false,
  typeQuest = null
) {
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
        if (typeQuest != null) {
          type = typeQuest;
        }
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
            switch (type) {
              case "rest":
                updateTotalPrice(idProduct, idAlbaran);
                // sumRestAmount(idProduct, -1);
                toastr.success("Producto disminuido con éxito!");

                break;
              case "sum":
                updateTotalPrice(idProduct, idAlbaran);
                // sumRestAmount(idProduct, 1);
                toastr.success("Producto sumado con éxito!");

                break;
              case "delete":
                $("#lineProduct" + idProduct).remove();
                toastr.success("Producto eliminado con éxito!");

                break;
            }

            getCart();

            console.log(date);
          })
          .catch(function (date) {
            toastr.error("Error en el proceso de eliminación");
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
function updateTotalPrice(idProduct, idAlbaran) {
  ajaxPromise(
    "module/cart/controller/controllerCart.php", //typeForm =
    "POST",
    "JSON",
    { op: "totalPrice", idProduct: idProduct, idAlbaran: idAlbaran }
  )
    .then(function (data) {
      console.log(data);
      // totalPrice = totalPrice.toFixed(2).replace(".", ",");
      var price = parseFloat(data.price);
      var cantidad = parseFloat(data.cantidad);
      var totalPrice = price * cantidad;
      
      price = price.toFixed(2).replace(".", ",");
      totalPrice = totalPrice.toFixed(2).replace(".", ",");

      $("#price" + idProduct).text(price + "€");
      $("#totalprice" + idProduct).html(
        "<h1 class='linePrice'>" + totalPrice + "€<h2>"
      );
      $("#totalAmount" + idProduct).text(cantidad);
    })
    .catch(function (data) {
      toastr.error("Error en el proceso de eliminación");
    });
}

$(document).ready(function () {
  getAllCart();
  clickAction();
});
