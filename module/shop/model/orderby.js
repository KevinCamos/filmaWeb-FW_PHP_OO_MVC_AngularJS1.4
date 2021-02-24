
$(document).ready(function () {

    $("#orderBy").on("change", function () {
        // alert(this.value)
      switch (this.value) {
        case "pop":
          sessionStorage.setItem("order", "clicks desc");
          break;
        case "pra":
          sessionStorage.setItem("order", "price asc");
          break;
        case "prd":
          sessionStorage.setItem("order", "price desc");
          break;
        case "ala":
          sessionStorage.setItem("order", "movie asc");
          break;
        case "ald":
          sessionStorage.setItem("order", "movie desc");
          break;
      }
      loadHomeProducts();
      pagination();

  });
  
});
