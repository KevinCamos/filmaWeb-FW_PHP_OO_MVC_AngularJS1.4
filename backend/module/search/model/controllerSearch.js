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
    window.location.href =  friendlyMod("shop");
  }
}

// inputSearch
function cargarSearch() {
  ajaxPromise(friendlyModFunc("search", "autoComplete"),
    "GET",
    "JSON"
  )
    .then(function (datas) {
      // alert(datas);
      $("#inputSearch").empty();
      // console.log(datas);

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
    .catch(function (datas) {

      console.log("xeee");
    });
}

function formSubmit() {
  $(".formuSearch").on("submit", function () {
    event.preventDefault();

    searchMenu();
  });
}

$(document).ready(function () {
  importarScript(GENERAL_PATH+"assets/jquery.easy-autocomplete.min.js");
  cargarSearch();
  formSubmit();
});
