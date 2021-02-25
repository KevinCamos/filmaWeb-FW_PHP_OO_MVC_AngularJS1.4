$(document).ready(function () {});
//LA FONT D'AQUESTA SOLUCIÓ SURT D'ACÍ https://es.stackoverflow.com/questions/1366/c%C3%B3mo-incluir-un-archivo-javascript-a-otro-archivo-javascript-sin-utilizar-jquer
function importarScript(nombre) {
  var scriptImport = document.createElement("script");
  scriptImport.src = nombre;
  document.querySelector("head").appendChild(scriptImport);
}

function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: sUrl,
      type: sType,
      dataType: sTData,
      data: sData,
    })
      .done((data) => {
        resolve(data);
      })
      .fail((jqXHR, textStatus, errorThrow) => {
        reject(errorThrow);
      });
  });
}

function clickShopMenu() {
  $("#Tienda").click(function () {
    // if (sessionStorage.getItem("filterCategory") != null) {
    //   var stop = false;
    // sessionStorage.removeItem("filterCategory");
    // sessionStorage.removeItem("id");

    cleanItems();

    // }
  });
}

function cleanItems() {
  sessionStorage.removeItem("VHS");
  sessionStorage.removeItem("DVD");
  sessionStorage.removeItem("Blu-Ray");
  sessionStorage.removeItem("4K");
  sessionStorage.removeItem("Digital");
  sessionStorage.removeItem("Otro");
  sessionStorage.removeItem("op");
  sessionStorage.removeItem("order");
}

function cleanSQLInyection(chairSearch) {
  chairSearch = chairSearch
    .split("'") // separa el string según espacios en blanco
    .join(""); // vuelve a armar el string

  chairSearch = chairSearch
    .split('"') // separa el string según espacios en blanco
    .join(""); // vuelve a armar el string
  return chairSearch;
}
