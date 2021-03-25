function likeCart(etiqueta) {
  $("body").on("click", etiqueta, function () {
    console.log(this);
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
    var id = id[1];
    var idUser = localStorage.getItem("idusers");
    console.log(id + " i " + typeLike + "i" + idUser);

    ajaxPromise(
      "module/shop/controller/controllerShopPage.php", //typeForm =
      "GET",
      undefined,
      { op: "likeds", typeLike: typeLike, idProduct: id, idUser: idUser }
    )
      .then(function () {
        // console.log(data);
        switch (typeLike) {
          case "like":
            console.log("we");
            $("#" + typeLike + "-" + id).attr({
              class: "fas fa-heart unlike",
              id: "unlike-" + id,
              onMouseover: "this.style.color='black'",
              onMouseout: "this.style.color='tomato'",
              style: "color: tomato",
            });
           
            toastr.success("'Me Gusta' añadido correctamente!");

            break;
          case "unlike":
            $("#" + typeLike + "-" + id).attr({
              class: "far fa-heart like",
              id: "like-" + id,
              onMouseover: "this.style.color='tomato'",
              onMouseout: "this.style.color='black'",
              style: "color: black",
            });
            toastr.success("'Me Gusta' eliminado correctamente!");

            break;
        }
      })
      .catch(function () {
        alert("error");
      });
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
      "JSON",
      { op: "addLine", idProduct: id, idUser: idUser }
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
