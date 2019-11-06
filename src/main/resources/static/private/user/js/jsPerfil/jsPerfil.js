/*El método getElementById() pertenece al objeto document.
 * Con él obtendremos el objeto que hace referencia al elemento con un id concreto.
 * Por ejemplo, queremos obtener el objeto del elemento 'tblPerfil'. */


var tblPerfil = document.getElementById('tblPerfil');

/*El método ready() se utiliza para hacer que una función esté disponible después 
 * de cargar el documento.*/
$(document).ready(function() {
	listarPerfiles();
});

function recargarPerfiles() {
	$(tblPerfil).DataTable().ajax.reload();
}

function listarPerfiles() {
	/*Este método permite verificar si un table es un DataTable o no*/
	if ($.fn.DataTable.isDataTable(tblPerfil)) {
		$(tblPerfil).DataTable().destroy();
	}
	
	var path = $("#path").val();

	$(tblPerfil)
			.dataTable(
					{
						"language" : {
							"sProcessing" : "Procesando...",
							"sLengthMenu" : "Mostrar _MENU_ registros",
							"sZeroRecords" : "No se encontraron resultados",
							"sEmptyTable" : "Ningún dato disponible en esta tabla",
							"sInfo" : "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
							"sInfoEmpty" : "Mostrando registros del 0 al 0 de un total de 0 registros",
							"sInfoFiltered" : "(filtrado de un total de _MAX_ registros)",
							"sInfoPostFix" : "",
							"sSearch" : "Buscar:",
							"sUrl" : "",
							"sInfoThousands" : ",",
							"sLoadingRecords" : "Cargando...",
							"oPaginate" : {
								"sFirst" : "Primero",
								"sLast" : "Último",
								"sNext" : "Siguiente",
								"sPrevious" : "Anterior"
							},
							"oAria" : {
								"sSortAscending" : ": Activar para ordenar la columna de manera ascendente",
								"sSortDescending" : ": Activar para ordenar la columna de manera descendente"
							}
						},
						"sAjaxSource" : path + "/../perfilesJSON/",
						"bServerSide" : true,
						"bProcessing" : true,
						"sDom" : "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-5'><'col-sm-7'p>>",
						"sPaginationType" : "simple_numbers",
						"bAutoWidth" : false,
						"aoColumns" : [
								{
									mData : "perfilId",
									sWidth : "10%",
									
								},
								{
									mData : "nombrePerfil",
									sWidth : "50%"
								},
								{
									mData : "estado",
									sWidth : "10%",
									"mRender" : function(data, type, row) {
										var resultStatus = $.trim(data);
										var statusText = '';
										var statusHTML='';
										if (resultStatus === "1") {
											statusText = "Activo";
											statusHTML='<b class="text-success">'+statusText+'</b>';
										} else {
											statusText = "Inactivo";
											statusHTML='<b class="text-danger">'+statusText+'</b>';
										}
										return statusHTML;
									}
								},
								{
									mData : "perfilId",
									sWidth : "30%",
									"bSortable" : false,
									"mRender" :

										function(data, type, row) {

										var editHTML = '';
										var stateHTML = '';
										var configPermisosHTML = '';

										editHTML += '<button class="btn btn-primary m-2" onclick="obtenerPerfil('
												+ data
												+ ', event, this)" title="Editar Perfil"><i class="fas fa-pencil-alt"></i></button>';
										stateHTML += '<button  class="btn btn-info m-2" onclick="cambiarEstadoPerfil('
												+ data
												+ ', event, this)" title="Cambiar estado"><i class="fas fa-sync"></i></button>';
										configPermisosHTML += '<button  class="btn btn-success m-2" onclick="obtenerPermisos('
												+ data
												+ ', event, this)" title="Configurar Permisos"><i class="fas fa-user-cog"></i></button>';
										
										return editHTML+ stateHTML
												+ configPermisosHTML;
									}
								} ]
					});
}

function pulsar(e) { 
	  tecla = (document.all) ? e.keyCode :e.which; 
	  return (tecla!=13); 
	}
$('#btnCrear').click(function(e) {
    e.preventDefault();
    $('#perfilId').val('0');
    $('#estado').val('1');
    var path = $(location).attr("href");

    var modalPerfil = $('#modalPerfil');
    
    modalPerfil.find('form').attr('action', path + "crearPerfil");
 
    modalPerfil.find('.modal-header .modal-title').html($(this).attr('title'));
    modalPerfil.find('#btnGuardar').html("Agregar");
    
    $('#nombrePerfil').val('');
    
    modalPerfil.modal('show');
});

function obtenerPerfil(id, e, element) {
    e.preventDefault();
    
    var path = $(location).attr("href");
	
    var modalPerfil = $('#modalPerfil');
    modalPerfil.find('form').attr('action', path + "modificarPerfil");
    modalPerfil.find('.modal-header .modal-title').html($(element).attr('title'));
    modalPerfil.find('#btnGuardar').html("Guardar");
    var enviarId = {
			perfilId : id
		};


    $.ajax({
        url: path + "getPerfil",
        data : JSON.stringify(enviarId),
        type: 'POST',
        dataType: 'json',
        contentType : 'application/json',
        success: function(jsonData, status, metaData) {
        	$('#estado').val(jsonData.estado);
        	$('#perfilId').val(jsonData.perfilId);
            $('#nombrePerfil').val(jsonData.nombrePerfil);
            modalPerfil.modal('show');
            }
         
        
    });

}


$('#btnGuardar').click(function(e) {
	
	if($('#nombrePerfil').val()==''){
		$('#nombrePerfil').focus();
		return 0;
	}
	var path = $("#path").val();
	var frm = $('#modalPerfil form');
	
	var enviarPerfil = {
		perfilId : $('#perfilId').val(),
		nombrePerfil : $('#nombrePerfil').val(),
		estado: $('#estado').val()
	};
	
	var dataResponse = validateForm('.modal-body input[type="text"][data-req]');
	
	if (dataResponse.estado === false) {
        jsonToDivError(dataResponse, '#modalPerfil #divMessage');
        return;
    }
	
	$.ajax({
		url : frm.attr("action"),
		data : JSON.stringify(enviarPerfil),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			if (jsonToDivError(dataResponse, '#modalPerfil #divMessage', path)) {
				recargarPerfiles();
			}
		}
	});
	e.preventDefault();
});

function cambiarEstadoPerfil(id, e, element) {
	var path = $("#path").val();
	var enviarPerfil = {
			perfilId : id,
			nombrePerfil : "none",
			estado: 1,
		};

	$.ajax({
		url : path + "/../cambiarEstado",
		data : JSON.stringify(enviarPerfil),
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			recargarPerfiles();
		}
	});
	
}
function configurarPermiso(e,element){
	 e.preventDefault();
	 var path = $(location).attr("href");
	 var estadoObj= element.checked? "1":"0";
	 var opcionIdObj= element.id.substring(6);
	 var enviarPermiso = {
				permisoId : $('#permiso'+opcionIdObj).val(),
				perfil:{
					perfilId:$('#perfilId').val()
				} ,
				opcion:{
					opcionId:opcionIdObj
				},
				estado:estadoObj,
			};

		$.ajax({
			url : path + "/../cambiarEstadoPermiso",
			data : JSON.stringify(enviarPermiso),
			type : 'POST',
			dataType : 'json',
			contentType : 'application/json',
//			success : function(dataResponse) {
//				alert("hola");
//			}
		});
}
function obtenerPermisos(id, e, element) {
    e.preventDefault();
    
    var path = $(location).attr("href");
	
    var modalPermisos = $('#modalPermisos');
    modalPermisos.find('form').attr('action', path + "configurarPermisos");
    modalPermisos.find('.modal-header .modal-title').html($(element).attr('title'));
    modalPermisos.find('#btnGuardar').html("Guardar");
    
    $('#perfilId').val(id);
    var enviarId = {
			perfilId : id
		};
    

    $.ajax({
        url: path + "getPermisos",
        data : JSON.stringify(enviarId),
        type: 'POST',
        dataType: 'json',
        contentType : 'application/json',
        success: function(jsonData, status, metaData) {
        	$('#perfil').html("Nombre de perfil: "+jsonData[1].perfil.nombrePerfil);
        	for(var p in jsonData) {
        		var estado= jsonData[p].estado;
        		$('#modalPermisos #permiso'+jsonData[p].opcion.opcionId).val(jsonData[p].permisoId);
        		$('#modalPermisos #opcion'+jsonData[p].opcion.opcionId).prop('checked',estado=="1"? true:false);
        		}
        	modalPermisos.modal('show');
            }
         
        
    });

}