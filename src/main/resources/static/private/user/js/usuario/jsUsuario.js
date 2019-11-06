

$('#btnCrear').click(function(e) {
    e.preventDefault();
    
    var path = $(location).attr("href");

    var modalUsuario = $('#modalUsuario');
    
    modalUsuario.find('form').attr('action', path + "crearUsuario"); 
    modalUsuario.find('.card-header .card-category').html($(this).attr('title'));
    modalUsuario.find('#btnGuardar').html("Agregar");
    
    $('#formUsuario').trigger("reset");
    $('#estado').val('1');
    $('#usuarioId').val('0');
    $('#perfil').val('');
    $('#pass')[0].disabled=false;
    
    modalUsuario.modal('show');
    
    $('#user').focus();
});

function obtenerUsuario(id, e, element) {
    e.preventDefault();
    
    var path = $(location).attr("href");
	
    var modalUsuario = $('#modalUsuario');
    modalUsuario.find('form').attr('action', path + "modificarUsuario");
    modalUsuario.find('.card-header .card-category').html($(element).attr('title'));
    modalUsuario.find('#btnGuardar').html("Guardar");
    var enviarId = {
			usuarioId : id
		};


    $.ajax({
        url: path + "getUsuario",
        data : JSON.stringify(enviarId),
        type: 'POST',
        dataType: 'json',
        contentType : 'application/json',
        success: function(jsonData, status, metaData) {
        	$('#estado').val(jsonData.estado);
        	$('#usuarioId').val(jsonData.usuarioId);
        	$('#user').val(jsonData.user);
        	$('#email').val(jsonData.correo);
            $('#pass').val("[PROTECTED]");
            $('#pass')[0].disabled=true;
            $('#perfil').val(jsonData.perfil.perfilId);
            modalUsuario.modal('show');
            }
    });

}

$('#btnGuardar').click(function(e) {
	
	if($('#user').val()==''){
		$('#user').focus();
		return 0;
	}
	if($('#email').val()==''){
		$('#email').focus();
		return 0;
	}
	if($('#pass').val()==''){
		$('#pass').focus();
		return 0;
	}
	if($('#perfil').val()==null){
		$('#perfil').focus();
		return 0;
	}
	var frm = $('#modalUsuario form');
	var path = $("#path").val();
	var creadorId;
	
	
	var enviarUsuario = {
			usuarioId : $('#usuarioId').val(),
			user : $('#user').val(),
			pass:$('#pass').val(),
			correo:$('#email').val(),
			estado:$('#estado').val(),
			perfil:{
				perfilId:$('#perfil').val()
			}
		};

	var dataResponse = validateForm('.modal-body input[type="text"][data-req]');
	
	if (dataResponse.estado === false) {
        jsonToDivError(dataResponse, '#modalUsuario #divMessage');
        return;
    }
	
	$.ajax({
		url : frm.attr("action"),
		data : JSON.stringify(enviarUsuario),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			
			if (jsonToDivError(dataResponse, '#modalUsuario #divMessage', path)) {
				recargarUsuarios();
			}
		}
	});
	e.preventDefault();
});
function cambiarEstadoUsuario(id, e, element) {
	var path = $("#path").val();
	var enviarUsuario = {
			usuarioId : id,
			user: "none",
			estado: 1
		};

	$.ajax({
		url : path + "/../cambiarEstado",
		data : JSON.stringify(enviarUsuario),
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			recargarUsuarios();
		}
	});
	
	
}