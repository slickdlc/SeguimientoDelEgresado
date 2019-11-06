$('#btnRegistro').click(function(e) {
	if(validarRegistro(this)===false){
		return false;
	}
		
	var path = $("#path").val();
	var frm = $('#formRegistro');
   

	var enviarUsuario = {
		usuarioId : 0,
		user : $('#inputUser').val(),
		correo:$('#inputEmail').val(),
		pass:$('#inputPassword').val(),
		estado: 1,
	
	};
	var dataResponse = validateForm('.card-body input[type="text"][data-req]');

	if (dataResponse.estado === false) {
	
        jsonToDivError(dataResponse, '#registro #divMessage');
        return;
   }
	
	$.ajax({
		url : frm.attr("action"),
		data : JSON.stringify(enviarUsuario),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			$('#formRegistro').trigger("reset");

			jsonToDivError(dataResponse, '#formRegistro #divMessage', path);
		}
	});
	e.preventDefault();
});
