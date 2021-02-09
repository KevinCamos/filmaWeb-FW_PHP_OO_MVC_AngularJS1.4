function queryNameMovie(valueText) {
  if (valueText.length > 0) {
    return " movie LIKE '%" + valueText + "%' AND";
  }
  return "";
}
function queryDirector(valueText) {
  if (valueText.length > 0) {
    return " director LIKE '%" + valueText + "%' AND";
  }
  return "";
}
function queryYear(valueText) {
  if (valueText.length > 0) {
    return " anyo = '" + valueText + "' AND";
  }
  return "";
}
function queryGenere(valueText) {
  if (valueText == "default") {
    return "";
  }
  return " genere = '" + valueText + "' AND";
}
function queryCountry(valueText) {
  if (valueText == "default") {
    return "";
  }
  return " country = '" + valueText + "' AND";
}
function queryPrice(minPrice, maxPrice) {
  minPrice = minPrice == "" || minPrice < 1 ? 0 : minPrice;
  maxPrice = maxPrice == "" || maxPrice < 1 ? 0 : maxPrice;

  if (minPrice == maxPrice || minPrice <= 0) {
    return "";
  } else if (minPrice < maxPrice) {
    return " price BETWEEN " + minPrice + " AND " + maxPrice + " AND";
  } else if (minPrice > maxPrice) {
    return " price BETWEEN " + maxPrice + " AND " + minPrice + " AND";
  }
  return "";
  // return " country BETWEEN'" + minPrice + "' AND '" + maxPrice + "' AND";
}
function clickerItems(itemString, id) {
  if (
    sessionStorage.getItem(itemString) == null ||
    sessionStorage.getItem(itemString) == "null"
  ) {
    sessionStorage.setItem(itemString, id);
  } else {
    sessionStorage.removeItem(itemString);
  }
  console.log(sessionStorage.getItem(itemString));
}
function storageFormats() {
  $("#VHS").click(function () {
    clickerItems("VHS", this.getAttribute("id"));
  });
  $("#DVD").click(function () {
    clickerItems("DVD", this.getAttribute("id"));
  });
  $("#Blu-Ray").click(function () {
    clickerItems("Blu-Ray", this.getAttribute("id"));
  });
  $("#4K").click(function () {
    clickerItems("4K", this.getAttribute("id"));
  });
  $("#Digital").click(function () {
    clickerItems("Digital", this.getAttribute("id"));
  });
  $("#Otro").click(function () {
    clickerItems("Otro", this.getAttribute("id"));
  });
}

function chairsFormats() {
  var chairformats = "";
  var formatsMatrix = ["VHS", "DVD", "Blu-Ray", "4K", "Digital", "Otro"];
  for (let i = 0; i < formatsMatrix.length; i++) {
    if (sessionStorage.getItem(formatsMatrix[i]) == formatsMatrix[i]) {
      chairformats +=
        " formats  LIKE '%" +
        sessionStorage.getItem(formatsMatrix[i]) +
        "%' OR";
    }
  }
  chairformats = chairformats
    .split(" ") // separa el string según espacios en blanco
    .slice(0, -1) // toma todos los elementos menos el último
    .join(" "); // vuelve a armar el string
  // console.log(chairformats);
  if (chairformats === "") {
    return "";
  }
  chairformats = "(" + chairformats + ") AND";
  return chairformats;
}

function searchFilter() {
  var chairNameMovie = queryNameMovie($("#movie").val());
  var chairDirector = queryDirector($("#director").val());
  var chairYear = queryYear($("#anyo").val());
  var chairGenere = queryGenere($("#genere").val());
  var chairFormats = chairsFormats();
  var chairCountry = queryCountry($("#country").val());
  var chairPrice = queryPrice($("#precioMin").val(), $("#precioMax").val());

  var chairQUERY =
    chairNameMovie +
    chairDirector +
    chairYear +
    chairFormats +
    chairGenere +
    chairCountry +
    chairPrice;

  console.log(chairQUERY);
  chairQUERY = chairQUERY
    .split(" ") // separa el string según espacios en blanco
    .slice(0, -1) // toma todos los elementos menos el último
    .join(" "); // vuelve a armar el string
  console.log(chairQUERY);
  // return false;
  if (chairQUERY == "") {
    console.log("home!");
    loadHomeProducts();
  } else {
    console.log("búsqueda!");

    chairQUERY = "SELECT * FROM  movies WHERE " + chairQUERY;
    console.log(chairQUERY);
    searchAjaxProducts(
      "module/shop/controller/controllerShopPage.php?op=searchQuery&query=" +
        chairQUERY,
      (cData = undefined)
    );
  }

  // searchAjaxProducts("module/shop/controller/controllerShopPage.php?op=searchQuery&query="+chairQUERY, cData=undefined);
}
// $(document).ready(function () {
//   storageFormats();
// });
