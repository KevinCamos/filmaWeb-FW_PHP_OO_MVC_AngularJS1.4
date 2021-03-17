function like(etiqueta) {
  //   $("body").on("mouseenter", "svg", function () {
  //     $(this).css("color", "tomato");
  //   });
  //   $("body").on("mouseleave", "svg", function () {
  //     $(this).css("color", "black");
  //   });
  // $(".far fa-heart like").click(function () {
  //   console.log("eegegheh");
  // });

  $("body").on("click", etiqueta, function () {
    if (tokenTrue() == true) {
      id = $(this).attr("id");
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
              break;
            case "unlike":
              $("#" + typeLike + "-" + id).attr({
                class: "far fa-heart like",
                id: "like-" + id,
                onMouseover: "this.style.color='tomato'",
                onMouseout: "this.style.color='black'",
                style: "color: black",
              });
              break;
          }
        })
        .catch(function () {
          alert("error");
        });
    }
  });
}
