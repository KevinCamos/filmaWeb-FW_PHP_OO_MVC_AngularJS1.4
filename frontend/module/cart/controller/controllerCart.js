BASE_IMPONIBLE = 0;
IVA = 1;
PRECIO_TOTAL = 2;

function getAllCart() {
  $("#cartMenu").empty();
  var idUser = getUser();
  if (idUser != -1) {
    ajaxPromise(friendlyModFunc("cart", "getCart"), //typeForm =
        "POST",
        "JSON", {
          idUser: idUser
        }
      )
      .then(function (data) {
        console.log(data);
        if (data != -1) {
          console.log(Object.keys(data).length);
          $("<h2>").text("Cesta").appendTo("#cartMenu");

          var table = $("<table>").appendTo("#cartMenu");

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
              .attr({
                id: "lineProduct" + idproducto
              })
              .appendTo(table);
            var columna = $("<th>")
              .attr({
                id: "colImg" + idproducto
              })
              .appendTo(line);
            $("<img>")
              .attr({
                id: movie + idproducto,
                src: "module\\movies\\img\\" + img,
              })
              .appendTo(columna);
            var columna = $("<th>")
              .attr({
                id: "colInfo" + idproducto
              })
              .appendTo(line);
            $("<div>")
              .attr({
                id: "infoProduct"
              })
              .text(movie)
              .appendTo(columna);
            $("<div>")
              .attr({
                id: "price" + idproducto
              })
              .text(price + "€") /////recalcular!!!!! OJO!
              .appendTo(columna);
            $("<div>")
              .attr({
                id: "totalprice" + idproducto
              })
              .html("<h1 class='linePrice'>" + totalPrice + "€<h2>") /////recalcular!!!!! OJO!
              .appendTo(columna);
            var amount = $("<div>")
              .attr({
                id: "amount" + idproducto,
                class: "amount"
              })
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
              .attr({
                id: "totalAmount" + idproducto,
                class: "inputNum"
              })
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
          $("<input>")
            .attr({
              id: "buyMe",
              type: "button",
              value: "Comprar"
            })
            .appendTo("#cartMenu");
          buyMe();
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
  $("<tr>").attr({
    id: "tileLine"
  }).appendTo(table);
  $("<th>").html("<h1>La Cesta está vacía</h1>").appendTo(tileLine);
}

function modalDelete(thisProduct) {
  Swal.fire({
    title: "¿De verdad quieres eliminar este producto? :'(",
    text: "No te olvides de que el cine es cultura, no te deshagas de él",
    icon: "ask",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
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
      if (cantidad < 2) {
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
      // var idUser = localStorage.getItem("idusers");
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
        // console.log(
        //   idProduct + " i " + idAlbaran + " i " + type + " i " + idUser
        // );
        ajaxPromise(friendlyModFunc("cart", "updateAmount"), //typeForm =
            "POST",
            "JSON", {
              type: type,
              idProduct: idProduct,
              // idUser: idUser,
              idAlbaran: idAlbaran,
            }
          )
          .then(function (date) {
            // alert(date);
            console.log(date);

            switch (type) {
              case "rest":
                updateTotalPrice(idProduct, idAlbaran);
                // sumRestAmount(idProduct, -1);
                // toastr.success("Producto disminuido con éxito!");

                break;
              case "sum":
                updateTotalPrice(idProduct, idAlbaran);
                // sumRestAmount(idProduct, 1);
                // toastr.success("Producto sumado con éxito!");

                break;
              case "delete":
                $("#lineProduct" + idProduct).remove();
                // toastr.success("Producto eliminado con éxito!");

                break;
            }

            getCart();

            console.log(date);
          })
          .catch(function (date) {
            // alert(date);
            console.log(date);
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
  ajaxPromise(friendlyModFunc("cart", "totalPrice"), //typeForm =
      "POST",
      "JSON", {
        idProduct: idProduct,
        idAlbaran: idAlbaran
      }
    )
    .then(function (data) {
      // alert(data)
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
      // alert("xeee")
      toastr.error("Error en el proceso de eliminación");
    });
}

function buyMe() {
  $("#buyMe").click(function () {
    checkToken();
    if (tokenTrue() == true) {
      idUser = localStorage.getItem("idusers");

      ajaxPromise(friendlyModFunc("cart", "getAlbaran"), "POST", "JSON", {
          idUser: idUser,
        })
        .then(function (data) {
          var idAlbaran = data;
          ajaxPromise(friendlyModFunc("cart", "getTotalCart"),
              "POST",
              "JSON", {
                idAlbaran: idAlbaran
              }
            )
            .then(function (data) {
              // alert("entra:"+data)
              console.log(data);
              continueBuy(data);
              // totalPrice = totalPrice.toFixed(2).replace(".", ",");
            })
            .catch(function (data) {
              alert("NO ENTRA :"+data)
              console.log(data);
            });
        })
        .catch(function (data) {
          alert(data);
          console.log(data);
          toastr.error("Error");
        });
    }
  });
}

function continueBuy(data) {
  $("#cartMenu").empty();
  $("<h2>").text("Proceso de compra").appendTo("#cartMenu");

  var table = $("<table>").appendTo("#cartMenu").addClass("albaranTable");

  var totalPrice = 0;
  var idAlbaran = data[0]["idalbaran"];

  for (var i = 0; i < Object.keys(data).length; i++) {
    var cantidad = data[i]["cantidad"];
    var idproducto = data[i]["idproducto"];
    var movie = data[i]["movie"];
    var price = parseFloat(data[i]["price"]);
    var totalPriceProduct = parseFloat(data[i]["totalPrice"]);
    totalPrice += parseFloat(totalPriceProduct);

    price = price.toFixed(2).replace(".", ",");
    totalPriceProduct = totalPriceProduct.toFixed(2).replace(".", ",");

    var line = $("<tr>")
      .attr({
        id: "lineProduct" + idproducto
      })
      .appendTo(table);
    $("<td>").text(cantidad).appendTo(line);
    $("<td>")
      .text(price + "€")
      .addClass("albaranPrice")
      .appendTo(line);
    $("<td>").text(movie).css("padding-left", "80px").appendTo(line);

    $("<td>")
      .text(totalPriceProduct + "€")
      .appendTo(line);
  }
  BaseImponible = (totalPrice / 1.21).toFixed(2).replace(".", ",");
  iva = ((totalPrice / 1.21) * 0.21).toFixed(2).replace(".", ",");
  totalPrice = totalPrice.toFixed(2).replace(".", ",");

  for (var i = 0; i < 3; i++) {
    var line = $("<tr>").appendTo(table);

    for (var j = 0; j < 2; j++) {
      $("<td>").appendTo(line);

      console.log(i);
      console.log(BASE_IMPONIBLE);
      console.log(IVA);
      console.log(PRECIO_TOTAL);
    }

    switch (i) {
      case BASE_IMPONIBLE:
        $("<td>").text("Base Imponible").appendTo(line);
        $("<td>")
          .text(BaseImponible + "€")
          .appendTo(line);
        break;
      case IVA:
        $("<td>").text("IVA").appendTo(line);
        $("<td>")
          .text(iva + "€")
          .appendTo(line);
        break;
      case PRECIO_TOTAL:
        $("<td>").text("Precio Total").appendTo(line);
        $("<td>")
          .text(totalPrice + "€")
          .appendTo(line);
        break;
    }
  }
  $("<input>")
    .attr({
      id: "returnCart",
      type: "button",
      value: "Volver a la cesta"
    })
    .appendTo("#cartMenu");
  $("<input>")
    .attr({
      id: "endCart",
      type: "button",
      value: "Finalizar Compra"
    })
    .appendTo("#cartMenu");
  returnEndClick(idAlbaran);
}

function returnEndClick(idAlbaran) {
  $("#returnCart").click(function () {
    getAllCart();
  });
  $("#endCart").click(function () {
    Swal.fire(
      "¡Compra finalizada!",
      "Gracias por confiar en nuestos servicios",
      "success"
    ).then(() => {
      ajaxPromise(friendlyModFunc("cart", "endCart"), "POST", "JSON", {
          idAlbaran: idAlbaran,
        })
        .then(function (data) {
          // alert(data);
          // alert(data)
          window.location.href = friendlyMod("shop");
        })
        .catch(function (data) {
          alert(data);
          alert("NO ENTRA");

        });
    });
  });
}

$(document).ready(function () {
  getAllCart();
  clickAction();
});