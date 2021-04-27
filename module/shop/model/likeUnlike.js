function likeCart(etiqueta) {
  $("body").on("click", etiqueta, function () {
    // console.log(this);
    var thisClass = $(this).attr("class");
    if (
      thisClass == "far fa-heart like" ||
      thisClass == "fas fa-heart unlike"
    ) {
      like(this);
    } else if (thisClass == "fas fa-cart-plus") {
      cartShop(this);
    }
  });
}

function like(like) {
  console.log("entra");
  if (tokenTrue() == true) {
    id = $(like).attr("id");
    var id = id.split("-");
    var typeLike = id[0];
    var idProduct = id[1];
    var idUser = localStorage.getItem("idusers");
    // alert(idProduct + " i " + typeLike + "i" + idUser);
    var arr = ["likeds", typeLike, idProduct, idUser]; //// LA QUE HI HA QUE FICAR A AJAXPROMISE 
    ajaxPromise(friendlyModFunc("shop", "likeds"), //typeForm =
        "GET",
        undefined, {
          op: "likeds",
          typeLike: typeLike,
          idProduct: idProduct,
          idUser: idUser
        }
      )
      .then(function (date) {
        // alert("entra:"+ date)
        // console.log(data);
        switch (typeLike) {
          case "like":
            console.log("we");
            $("#" + typeLike + "-" + idProduct).attr({
              class: "fas fa-heart unlike",
              id: "unlike-" + idProduct,
              onMouseover: "this.style.color='black'",
              onMouseout: "this.style.color='tomato'",
              style: "color: tomato",
            });

            toastr.success("'Me Gusta' añadido correctamente!");

            break;
          case "unlike":
            $("#" + typeLike + "-" + idProduct).attr({
              class: "far fa-heart like",
              id: "like-" + idProduct,
              onMouseover: "this.style.color='tomato'",
              onMouseout: "this.style.color='black'",
              style: "color: black",
            });
            toastr.success("'Me Gusta' eliminado correctamente!");

            break;
        }
      })
      .catch(function (date) {
        alert("No entra:"+ date)
        alert("error");
      });
  }else{
    toastr.warning("Debes estar registrado para hacer esta acción");

  }

}

function cartShop(addCart) {
  // alert("entra");
  if (tokenTrue() == true) {
    id = $(addCart).attr("id");
    var id = id.split("-");
    var siteShop = id[0];
    var id = id[1];
    var idUser = localStorage.getItem("idusers");
    // console.log(id + " i " + siteShop + " i " + idUser);

    ajaxPromise(
        "module/cart/controller/controllerCart.php", //typeForm =
        "POST",
        "JSON", {
          op: "addLine",
          idProduct: id,
          idUser: idUser
        }
      )
      .then(function (data) {
        console.log(data);
        toastr.success("Se ha añadido al carrito correctamente");

        getCart();

      })
      .catch(function () {
        alert("error");
      });
  }
}