function like() {
  //   $("body").on("mouseenter", "svg", function () {
  //     $(this).css("color", "tomato");
  //   });
  //   $("body").on("mouseleave", "svg", function () {
  //     $(this).css("color", "black");
  //   });
  // $(".far fa-heart like").click(function () {
  //   console.log("eegegheh");
  // });

  $("body").on("click", "svg", function () {
    if (tokenTrue() == true) {
      id = $(this).attr("id");
      var id = id.split("-");
      var typeLike = id[0];
      var id = id[1];
      var idUser= localStorage.getItem("user")
      console.log(id + " i " + typeLike + "i" + idUser);
      // ajaxPromise(
      //   "module/shop/controller/controllerShopPage.php", //typeForm =
      //   "POST",
      //   "JSON",
      //   { id: id, op: typeLike }
      // )
      //   .then(function (data) {
      //     console.log(data);
      //   })
      //   .catch(function (data) {
      //     console.log(data);
      //   });
    }
  });
}
