
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

// inputSearch
function cargarSearch() {
  ajaxPromise(
    "module/search/controller/controllerSearch.php?op=autoComplete",
    "GET",
    "JSON"
  )
    .then(function (datas) {
      $("#inputSearch").empty();
      console.log(datas);

      var options = {
        data: datas,
        placeholder: "Busca tu película",
        getValue: "movie",
        list: {
          match: {
            enabled: true,
          },
          maxNumberOfElements: 8,
        },

        theme: "square",
      };
      let section = $("<input>")
        .attr({ id: "inputSearch" })
        .appendTo("#formuID")
        .easyAutocomplete(options);

      // $("#inputSearch").easyAutocomplete(options);
    })
    .catch(function () {
      console.log("xeee");
    });
}

$(document).ready(function () {
  importarScript("assets/jquery.easy-autocomplete.min.js");
  cargarSearch();
});
