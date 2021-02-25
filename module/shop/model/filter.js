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
  minPrice = minPrice == "" || minPrice < 1 ? 0 : parseFloat(minPrice);
  maxPrice = maxPrice == "" || maxPrice < 1 ? 0 : parseFloat(maxPrice);

  if (minPrice == maxPrice && minPrice <= 0) {
    return "";
  } else if (minPrice <= maxPrice) {
    console.log("el preu menor es menor");
    return " price BETWEEN " + minPrice + " AND " + maxPrice + " AND";
  } else if (minPrice > maxPrice) {
    console.log("el preu menor es major");

    return " price BETWEEN " + maxPrice + " AND " + minPrice + " AND";
  }
  return "";
  // return " country BETWEEN'" + minPrice + "' AND '" + maxPrice + "' AND";
}

function chairsFormats() {
  var chairformats = "";
  var formatsMatrix = ["VHS", "DVD", "Blu-Ray", "4K", "Digital", "Otro"];
  for (let i = 0; i < formatsMatrix.length; i++) {
    if (sessionStorage.getItem(formatsMatrix[i]) == formatsMatrix[i]) {
      console.log(chairformats);

      chairformats +=
        " formats  LIKE '%" +
        sessionStorage.getItem(formatsMatrix[i]) +
        "%' OR";
    }
  }
  console.log(chairformats);
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
    sessionStorage.removeItem("op");

    loadHomeProducts();
  } else {
    console.log("búsqueda!");

    chairQUERY = "WHERE " + chairQUERY;
    console.log(chairQUERY);

    sessionStorage.setItem("op", "filter");

    sessionStorage.setItem("filter", chairQUERY);
    loadHomeProducts();
  }

  // searchAjaxProducts("module/shop/controller/controllerShopPage.php?op=searchQuery&query="+chairQUERY, cData=undefined);
}
// $(document).ready(function () {
//   // storageFormats();

// });
