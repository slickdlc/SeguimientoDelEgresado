$('#modalPersonal').perfectScrollbar();
var tblPersonal = document.getElementById('tblPersonal');

/*El método ready() se utiliza para hacer que una función esté disponible después 
 * de cargar el documento.*/
$(document).ready(function() {
	listarPersonal(0);
	
});

function recargarPersonal() {
	$(tblPersonal).DataTable().ajax.reload();
}

function listarPersonal(rutaId) {
	/*Este método permite verificar si un table es un DataTable o no*/
	if ($.fn.DataTable.isDataTable(tblPersonal)) {
		$(tblPersonal).DataTable().destroy();
	}
	
	var path = $("#path").val();

	$(tblPersonal)
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
						"sAjaxSource" : "/admin/personal/personalJSON?rutaId="+rutaId,
						"bServerSide" : true,
						"bProcessing" : true,
						"sDom" : "<'row'<'col-sm-12 d-flex flex-row-reverse'f>>t<'row'<'col-sm-5'><'col-sm-7 d-flex flex-row-reverse'p>>",
						"sPaginationType" : "simple_numbers",
						"bAutoWidth" : false,
						"aoColumns" : [
								{
									mData : "personalId",
									sWidth : "5%",
									
								},
								{
									mData : "usuario.user",
									sWidth : "15%"
								},
								{
									mData : "nombres",
									sWidth : "20%"
								},
								{
									mData : "dni",
									sWidth : "5%"
								},
								{
									mData : "usuario.perfil.nombrePerfil",
									sWidth : "20%",
									"mRender": function(data,type,row){
										var resultStatus = $.trim(data);
										return resultStatus.substring(5);
									}
								},
								{
									mData : "usuario.estado",
									sWidth : "15%",
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
									mData : "personalId",
									sWidth : "30%",
									"bSortable" : false,
									"sClass": "td-actions",
									"mRender" :

										function(data, type, row) {

										var editHTML = '';
										var stateHTML = '';

										editHTML += '<button class="btn btn-primary btn-sm m-1" onclick="obtenerPersonal('
												+ data
												+ ', event, this)" title="Editar Personal"><i class="fas fa-pencil-alt"></i></button>';
										stateHTML += '<button  class="btn btn-info btn-sm m-1" onclick="cambiarEstadoPersonal('
												+ data
												+ ', event, this)" ><i class="fas fa-sync"></i></button>';
										return editHTML+ stateHTML;
									}
								} ]
					});
}

$('#btnCrear').click(function(e) {
    e.preventDefault();
    $('#formPersonal').trigger("reset");
    
    $('#personalId').val('0');
    $('#usuarioId').val('0');
    $('#estado').val('1');
    $('#pass')[0].disabled=false;
    var path = $(location).attr("href");

    var modalPersonal = $('#modalPersonal');
    
    modalPersonal.find('form').attr('action', path + "crearPersonal");
 
    modalPersonal.find('.card-header .card-category').html($(this).attr('title'));
    modalPersonal.find('#btnGuardar').html("Agregar");
    modalPersonal.modal('show');
});

function obtenerPersonal(id, e, element) {
    e.preventDefault();
    
    var path = $(location).attr("href");
	
    var modalPersonal = $('#modalPersonal');
    modalPersonal.find('form').attr('action', path + "modificarPersonal");
    modalPersonal.find('.card-header .card-category').html($(element).attr('title'));
    modalPersonal.find('#btnGuardar').html("Guardar");
    var enviarId = {
			personalId : id
		};

    $.ajax({
        url: path + "getPersonal",
        data : JSON.stringify(enviarId),
        type: 'POST',
        dataType: 'json',
        contentType : 'application/json',
        success: function(jsonData, status, metaData) {
        	$('#personalId').val(jsonData.personalId);
        	$('#nombres').val(jsonData.nombres);
        	$('#apellidoPaterno').val(jsonData.apellidoPaterno);
        	$('#apellidoMaterno').val(jsonData.apellidoMaterno);
        	$('#dni').val(jsonData.dni);
        	$('#tipoPersonal').val(jsonData.usuario.perfil.perfilId);
        	$('#usuarioId').val(jsonData.usuario.usuarioId);
        	$('#user').val(jsonData.usuario.user);
            $('#pass').val("[PROTECTED]");
            $('#pass')[0].disabled=true;
        	$('#correo').val(jsonData.usuario.correo);
        	$('#estado').val(jsonData.usuario.estado);
        	$('#ruta').val(jsonData.ruta.rutaId);
            modalPersonal.modal('show');
            }
    });
}
//
//
$('#btnGuardar').click(function(e) {
	
	var path = $("#path").val();
	var frm = $('#modalPersonal form');
	
	var enviarPersonal = {
		personalId:$('#personalId').val(),
		usuario:{
			user:$('#user').val(),
			pass:$('#pass').val(),
			correo:$('#correo').val(),
			perfil:{
				perfilId:$('#tipoPersonal').val()
			},
			estado:$('#estado').val()
		},
		nombres: $('#nombres').val(),
		apellidoPaterno:$('#apellidoPaterno').val(),
		apellidoMaterno:$('#apellidoMaterno').val(),
		dni:$('#dni').val(),
		ruta:{
			rutaId:$('#ruta').val()
		}
	};
	
	
	var dataResponse = validateForm('.modal-body input[type="text"][data-req]');
	
	if (dataResponse.estado === false) {
        jsonToDivError(dataResponse, '#modalPersonal #divMessage');
        return;
    }
	
	$.ajax({
		url : frm.attr("action"),
		data : JSON.stringify(enviarPersonal),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			
			if (jsonToDivError(dataResponse, '#modalPersonal #divMessage', path)) {
				recargarPersonal();
			}
		}
	});
	
	e.preventDefault();
});

function cambiarEstadoPersonal(id, e, element) {
	var path = $("#path").val();
	var enviarId = {
			personalId : id,
		};

	$.ajax({
		url : path + "/../cambiarEstado",
		data : JSON.stringify(enviarId),
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			recargarPersonal();
		}
	});
	
}
$('#selectRuta').change(function(e) {
	listarPersonal($('#selectRuta').val());
});

