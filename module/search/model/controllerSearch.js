function searchMenu() {
  var chairSearch = $("#inputSearch").val();
  console.log(chairSearch);
  //   chairSearch= cleanSQLInyection(chairSearch);
  //   console.log(chairSearch);

  // return false;
  if (chairSearch == "") {
    console.log("No hay contenido");
  } else {
    console.log("BUSQUEDA!");
    sessionStorage.setItem("op", "search");
    sessionStorage.setItem("search", chairSearch);
    window.location.href = "index.php?page=shop";
  }
}
// $(document).ready(function () {

//   });
