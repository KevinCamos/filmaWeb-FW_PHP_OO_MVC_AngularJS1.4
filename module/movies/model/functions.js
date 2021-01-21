$(function () {
  $("#anyo").datepicker({
    changeMonth: false,
    changeYear: true,
    showButtonPanel: true,
    yearRange: "1900:2025", // Optional Year Range
    dateFormat: "yy",
    onClose: function (dateText, inst) {
      var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
      $(this).datepicker("setDate", new Date(year, 0, 1));
    },
  });
});

// DATETABLE
$(document).ready(function () {
    $("#data_list").DataTable();
  });
  