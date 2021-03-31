$(document).ready(function(){
	$('.ajaxLoader').fadeOut("fast");

	$(document).on('click','#send_contact',function(){
		alert(fin_data);

		result = true;
		$(".error").remove();

		var pname = /^[a-zA-Z]+[\-'\s]?[a-zA-Z]{2,51}$/;
	    var pmessage = /^[0-9A-Za-z\s]{20,100}$/;
    	var pmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

		if ($("#cname").val() === "" || $("#cname").val() === "Introduce tu nombre" ) {
			$("#cname").focus().after("<span class='error'>Introduce tu nombre</span>");
			return false;
		}else if (!pname.test($("#cname").val())) {
			$("#cname").focus().after("<span class='error'>El nombre tiene un minimo de 3 caracteres</span>");
			return false;
		}
		if ($("#cemail").val() === "" || $("#cemail").val() === "Introduce tu email" ) {
			$("#cemail").focus().after("<span class='error'>Introduce tu email</span>");
			return false;
		}else if (!pmail.test($("#cemail").val())) {
			$("#cemail").focus().after("<span class='error'>El formato del mail es incorrecto</span>");
			return false;
		}
		if ($("#matter").val() === "Seleccione un asunto" ) {
			$("#matter").focus().after("<span class='error'>Seleccione un asunto</span>");
			return false;
		}
		if ($("#message").val() === "" || $("#message").val() === "Seleccione un asunto" ) {
			$("#message").focus().after("<span class='error'>Introduzca su mensaje</span>");
			return false;
		}else if (!pmessage.test($("#message").val())) {
			$("#message").focus().after("<span class='error'>El mensaje tiene un minimo de 20 caracteres</span>");
			return false;
		}
		
		if (result) {
			$('#send_contact').attr('disabled', true);
			$('.ajaxLoader').fadeIn("fast");
			var data = {"cname":$("#cname").val(),"cemail":$("#cemail").val(),"matter":$("#matter").val(),"message":$("#message").val()};
			var fin_data = JSON.stringify(data);



			$.post(amigable("?module=contact_dogs&function=send_cont"),{"fin_data":fin_data},function(data,event){
			// $.post("../../index.php?module=contact_dogs&function=send_cont",{"fin_data":fin_data},function(data,event){
				$('.ajaxLoader').fadeOut("fast");
				console.log(data);
				$("#rltsendmessage").html(data).fadeIn("slow");
                    
			    setTimeout(function() {
			        $("#rltsendmessage").fadeOut("slow")
			    }, 5000);
			});
		}
	});

});