function queryNameMovie(valueText) {
  if (valueText.length > 0) {
    return "movie =" + valueText + "  AND ";
  }
  return "";
}
function queryDirector(valueText) {
  if (valueText.length > 0) {
    return " AND director =" + valueText + "  AND ";
  }
  return "";
}
function queryYear(valueText) {
  if (valueText.length > 0) {
    return " AND anyo =" + valueText + "  AND ";
  }
  return "";
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
  var chairformats="";
  var formatsMatrix = ["VHS", "DVD", "Blu-Ray", "4K", "Digital", "Otro"];
  for (let i = 0; i < formatsMatrix.length; i++) {
    if (sessionStorage.getItem(formatsMatrix[i]) == formatsMatrix[i]) {
      chairformats += sessionStorage.getItem(formatsMatrix[i]) + " OR ";
    } 
    }
    console.log(chairformats);
    return chairformats;

  }
  // if (sessionStorage.getItem("VHS") == "VHS") {
  //    chairVHS = sessionStorage.getItem("VHS");
  // } else {
  //    chairVHS = "";
  // }
  // if (sessionStorage.getItem("DVD") == "DVD") {
  //    chairVHS = sessionStorage.getItem("VHS");
  // } else {
  //    chairVHS = "";
  // }
  // if (sessionStorage.getItem("Blu-Ray") == "Blu-Ray") {
  //    chairVHS = sessionStorage.getItem("VHS");
  // } else {
  //    chairVHS = "";
  // }
  // if (sessionStorage.getItem("4K") == "4K") {
  //    chairVHS = sessionStorage.getItem("VHS");
  // } else {
  //    chairVHS = "";
  // }
  // if (sessionStorage.getItem("Digital") == "Digital") {
  //    chairVHS = sessionStorage.getItem("VHS");
  // } else {
  //    chairVHS = "";
  // }
  // if (sessionStorage.getItem("Otro") == "Otro") {
  //    chairVHS = sessionStorage.getItem("VHS");
  // } else {
  //    chairVHS = "";
  // }


function searchFilter() {
  var chairNameMovie = queryNameMovie($("#movie").val());
  var chairDirector = queryDirector($("#director").val());
  var chairYear = queryYear($("#anyo").val());
  var chairFormats = chairsFormats();

  // var chairDirector = queryFormats();
}

//  if()

//   //<input type=checkbox value="VHS"> España
//   <br>

//   <input type=checkbox value="DVD"> Inglaterra
//   <br>

//   <input type=checkbox value="Blu-Ray"> Estados Unidos
//   <br>
$(document).ready(function () {
  loadFilterCountry();
  storageFormats();
});
