// function loadDivsCarousel() {
//   $("#carousel-products").empty(); //Borrar lo de dins

//   $("<div></div>")
//     .attr({ class: "row", id: "row_products" })
//     .appendTo("#carousel-products");
//
function loginMenu() {
  $("#loginMenu").text("Login").addClass("loginMenu").css("color", "gainsboro");

  ////El cambio de color al pasar el ratón por el login
  $("#loginMenu").mouseenter(function () {
    $("#loginMenu").css("color", "white");
  });
  $("#loginMenu").mouseleave(function () {
    $("#loginMenu").css("color", "gainsboro");
  });
  ////Fin cambio de color

  $("#loginMenu").click(function () {
    window.location.href = "index.php?page=login";
  });
}
function loginAnimate() {
  // https://codepen.io/colorlib/pen/rxddKy plantilla
  $(".message a").click(function () {
    $(".form #register").animate(
      { height: "toggle", width: "toggle",opacity: "toggle" },
      "slow"
    );
  });
}

$(document).ready(function () {
  loginMenu();
  loginAnimate();
});
