$('#editarPerfil').click(function (e){
	$('#modalEditarPerfil').modal('show');
	$.ajax({
		url:"/admin/usuario/getUsuarioEnSesion",
		type : "POST",
		success:
			function(jsonData){
			$('#estadoU').val(jsonData.estado);
        	$('#usuarioIdU').val(jsonData.usuarioId);
        	$('#userU').val(jsonData.user);
        	$('#emailU').val(jsonData.correo);
            $('#passU').val(jsonData.pass);
			}
	});
});

$('#btnGuardarU').click(function(e){
	if($('#userU').val()==''){
		$('#userU').focus();
		return 0;
	}
	if($('#emailU').val()==''){
		$('#emailU').focus();
		return 0;
	}
	if($('#passU').val()==''){
		$('#passU').focus();
		return 0;
	}
	var frm = $('#modalUsuario form');
	var path = $("#path").val();
	var creadorId;
	
	
	var enviarUsuario = {
			usuarioId : $('#usuarioIdU').val(),
			user : $('#userU').val(),
			pass:$('#passU').val(),
			correo:$('#emailU').val(),
			estado:$('#estadoU').val(),
		};
//	var dataResponse = validateForm('.modal-body input[type="text"][data-req]');
//	
//	if (dataResponse.estado === false) {
//        jsonToDivError(dataResponse, '#modalEditarPerfil #divMessage');
//        return;
//    }
	$.ajax({
		url : "/admin/usuario/modificarUsuario",
		data : JSON.stringify(enviarUsuario),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
//			if (jsonToDivError(dataResponse, '#modalEditarPerfil #divMessage', path)) {
//			}
		}
	});
	e.preventDefault();
});