// function friendlyURL(url) {
// 	var link = "";
// 	url = url.replace("?", "");
// 	url = url.split("&");
// 	cont = 0;
// 	for (var i = 0; i < url.length; i++) {
// 		cont++;
// 		var aux = url[i].split("=");
// 		if (cont == 2) {
// 			link += "/" + aux[1] + "/";
// 		} else {
// 			link += "/" + aux[1];
// 		}
// 	}
// 	return "http://" + window.location.hostname + "/Kevin/Ejercicios_Kevin/Projecte" + link;
// }

function validateEmail() {
	$(".error").remove();

	result = true;

	var pname = /^[a-zA-Z]+[\-'\s]?[a-zA-Z]{2,51}$/;
	var pmessage = /^[0-9A-Za-z\s]{20,100}$/;
	var pmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

	if ($("#cname").val() === "" || $("#cname").val() === "Introduce tu nombre") {
		$("#cname").focus().after("<span class='error'>Introduce tu nombre</span>");
		return false;
	} else if (!pname.test($("#cname").val())) {
		$("#cname").focus().after("<span class='error'>El nombre tiene un minimo de 3 caracteres</span>");
		return false;
	} else {}
	if ($("#cemail").val() === "" || $("#cemail").val() === "Introduce tu email") {
		$("#cemail").focus().after("<span class='error'>Introduce tu email</span>");
		return false;
	} else if (!pmail.test($("#cemail").val())) {
		$("#cemail").focus().after("<span class='error'>El formato del mail es incorrecto</span>");
		return false;
	}
	if ($("#matter").val() === "Seleccione un asunto") {
		$("#matter").focus().after("<span class='error'>Seleccione un asunto</span>");
		return false;
	}
	if ($("#message").val() === "" || $("#message").val() === "Seleccione un asunto") {
		$("#message").focus().after("<span class='error'>Introduzca su mensaje</span>");
		return false;
	} else if (!pmessage.test($("#message").val())) {
		$("#message").focus().after("<span class='error'>El mensaje tiene un minimo de 20 caracteres</span>");
		return false;
	}
	return result;
}

function sendEmail() {

	$('.ajaxLoader').fadeOut("fast");

	$(document).on('click', '#send_contact', function () {

		if (validateEmail() == true) {
			$('#send_contact').attr('disabled', true);
			$('.ajaxLoader').fadeIn("fast");
			var fin_data = $('#contactForm').serializeArray();
			// var data = {
			// 	"cname": $("#cname").val(),
			// 	"cemail": $("#cemail").val(),
			// 	"matter": $("#matter").val(),
			// 	"message": $("#message").val()
			// };
			// var fin_data = JSON.stringify(data);
			alert(fin_data);
			http: //localhost/1_Fw_PHP_OO_MVC_jQuery_AngularJS/Framework/9_adoptions_dogs/contact_dogs/send_cont/

				ajaxPromise("index.php?module=contact&function=send_cont", "GET", "JSON", {
					"fin_data": fin_data
				})
				.then(function (data) {

					console.log(data)
				}).catch(function (data) {
					$('.ajaxLoader').fadeOut("fast");
					console.log(data);
					$("#rltsendmessage").html(data).fadeIn("slow");

					setTimeout(function () {
						$("#rltsendmessage").fadeOut("slow")
					}, 5000);

				})

			// console.log(friendlyURL("?module=contact_dogs&function=send_cont"))
			// ajaxPromise("?module=contact_dogs&function=send_cont", "POST", "JSON", 
			// {"fin_data": fin_data})
			// .then(function (data, event) {
			// 	alert(data)
			// 	alert(event)
			// }).catch(function (data, event) {
			// 	$('.ajaxLoader').fadeOut("fast");
			// 	console.log(data);
			// 	$("#rltsendmessage").html(data).fadeIn("slow");

			// 	setTimeout(function () {
			// 		$("#rltsendmessage").fadeOut("slow")
			// 	}, 5000);

			// })

			// $.post(amigable("?module=contact_dogs&function=send_cont"), {
			// 	"fin_data": fin_data
			// }, function (data, event) {
			// 	// $.post("../../index.php?module=contact_dogs&function=send_cont",{"fin_data":fin_data},function(data,event){
			// 	$('.ajaxLoader').fadeOut("fast");
			// 	console.log(data);
			// 	$("#rltsendmessage").html(data).fadeIn("slow");

			// 	setTimeout(function () {
			// 		$("#rltsendmessage").fadeOut("slow")
			// 	}, 5000);
			// });
		}
	});

}
$(document).ready(function () {
	sendEmail()

});