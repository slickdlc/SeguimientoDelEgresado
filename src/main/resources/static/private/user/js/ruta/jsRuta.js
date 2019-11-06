
var tblRuta = document.getElementById('tblRuta');

/*El método ready() se utiliza para hacer que una función esté disponible después 
 * de cargar el documento.*/
$(document).ready(function() {
	listarRutas();
});

function recargarPerfiles() {
	$(tblRuta).DataTable().ajax.reload();
}

function listarRutas() {
	/*Este método permite verificar si un table es un DataTable o no*/
	if ($.fn.DataTable.isDataTable(tblRuta)) {
		$(tblRuta).DataTable().destroy();
	}
	
	var path = $("#path").val();

	$(tblRuta)
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
						"sAjaxSource" : path + "/../rutasJSON/",
						"bServerSide" : true,
						"bProcessing" : true,
						"sDom" : "<'row'<'col-sm-6'l><'col-sm-6 d-flex flex-row-reverse'f>>t<'row'<'col-sm-5'><'col-sm-7 d-flex flex-row-reverse'p>>",
						"sPaginationType" : "simple_numbers",
						"bAutoWidth" : false,
						"aoColumns" : [
								{
									mData : "rutaId",
									sWidth : "10%",
									
								},
								{
									mData : "numeroRuta",
									sWidth : "15%"
								},
								{
									mData : "nombreEmpresa",
									sWidth : "25%"
								},
								{
									mData : "recorrido.codigoMapa",
									sWidth : "5%",
									"sClass": "td-actions",
									"mRender" : function(data, type, row) {
										recorridoHTML= '<button class="btn btn-success btn-link btn-sm" onclick="verRecorrido(\''
											+ data
											+ '\', event, this)" title="Ver Recorrido"><i class="fas fa-eye"></i></button>';
										return recorridoHTML;
									}
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
									mData : "rutaId",
									sWidth : "20%",
									"bSortable" : false,
									"sClass": "td-actions",
									"mRender" :
										
										function(data, type, row) {

										var editHTML = '';
										var stateHTML = '';
										var addPPHTML='';
										
										editHTML += '<button type="button" title="Editar Ruta" class="btn btn-primary btn-link btn-sm" onclick="obtenerRuta('
												+ data
												+ ', event, this)" ><i class="fas fa-pencil-alt fa-lg"></i></button>';
										stateHTML += '<button  class="btn btn-info btn-link btn-sm" onclick="cambiarEstado('
												+ data
												+ ', event, this)" title="Cambiar estado"><i class="fas fa-sync"></i></button>';
										addPPHTML += '<button class="btn btn-danger btn-link" onclick="getFoto('
											+ data
											+ ', event, this)" title="Subir o Cambiar Foto"><i class="fa fa-camera"></i></button>';
										return editHTML+ stateHTML+addPPHTML;
									}
								} ]
					});
}

$('#btnAgregar').click(function (e) {
	 e.preventDefault();
	 
	 $('#divMensaje').addClass('d-none');
	 
	$('#rutaId').val('0');
	$('#estado').val('1');
	$('#direccionId').val('0');
	var path = $(location).attr("href");
	
	var modalRuta= $('#modalRuta');
	
	modalRuta.find('form').attr('action', path + "crearRuta");
	modalRuta.find('.card-header .card-category').html($(this).attr('title'));
	modalRuta.find('#btnGuardar').html("Agregar");
	
	 $('#formRuta').trigger("reset");
	$('#tipoVia').val(0);
	
	
   modalRuta.modal('show');
});

$('#btnGuardar').click(function (e) {
	if($('#numeroRuta').val()==''){
		$('#numeroRuta').focus();
		return 0;
	}
	if($('#nombreEmpresa').val()==''){
		$('#nombreEmpresa').focus();
		return 0;
	}
	if($('#codigoMapa').val()==''){
		$('#codigoMapa').focus();
		return 0;
	}
	if($('#nombreVia').val()==0){
		$('#nombreVia').focus();
		return 0;
	}
	if($('#nombreDireccion').val()==''){
		$('#nombreDireccion').focus();
		return 0;
	}
	
	if($('#provinciaDireccion').val()==''){
		$('#provinciaDireccion').focus();
		return 0;
	}
	if($('#distritoDireccion').val()==''){
		$('#distritoDireccion').focus();
		return 0;
	}
	var isModificacion=false;
	if(!$('#divMensaje').hasClass("d-none")){
		isModificacion=true;
	}
	if(isModificacion&&$('#mensaje').val()==''){
		$('#mensaje').focus();
		return 0;
	}
	
	var path = $("#path").val();
	var frm = $('#modalRuta form');
	
	var ruta = {
		rutaId:$('#rutaId').val(),
		numeroRuta:$('#numeroRuta').val(),
		nombreEmpresa:$('#nombreEmpresa').val(),
		estado:$('#estado').val(),
		direccion:{
			nombre:$('#nombreDireccion').val(),
			distrito:$('#distritoDireccion').val(),
			provincia:$('#provinciaDireccion').val(),
			numero:$('#numeroDireccion').val(),
			manzana:$('#manzanaDireccion').val(),
			lote:$('#loteDireccion').val(),
			via:{
				viaId:$('#nombreVia').val()
			}
		},
		recorrido: {
			codigoMapa:$('#codigoMapa').val()
		}
	};
	//modificacion ruta;
	var mr={
			mensaje:$('#mensaje').val(),
			ruta: ruta
		}
	var dataResponse = validateForm('.modal-body input[type="text"][data-req]');
	
	if (dataResponse.estado === false) {
        jsonToDivError(dataResponse, '#modalRuta #divMessage');
        return;
    }
	$.ajax({
		url : frm.attr("action"),
		data : JSON.stringify(isModificacion? mr:ruta),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			if (jsonToDivError(dataResponse, '#modalRuta #divMessage', path)) {
				recargarPerfiles();
			}
		}
	});
	e.preventDefault();
	
});

function obtenerRuta(id,e,element){
	e.preventDefault();
    var path = $(location).attr("href");
    $('#divMensaje').removeClass('d-none');
    var modalRuta = $('#modalRuta');
    modalRuta.find('form').attr('action', path + "modificarRuta");
	modalRuta.find('.card-header .card-category').html($(element).attr('title'));
    modalRuta.find('#btnGuardar').html("Guardar");
    var enviarRuta = {
    		rutaId:id
    	};
    $('#mensaje').val("");

    $.ajax({
        url: path + "getRuta?rutaId="+id,
        type: 'POST',
        dataType: 'json',
        contentType : 'application/json',
        success: function(jsonData, status, metaData) {        	
        	$('#rutaId').val(jsonData.rutaId);
        	$('#estado').val(jsonData.estado);
        	$('#direccionId').val(jsonData.direccion.direccionId);
        	$('#numeroRuta').val(jsonData.numeroRuta);
        	$('#nombreEmpresa').val(jsonData.nombreEmpresa);
        	$('#nombreVia').val(jsonData.direccion.via.viaId);
        	$('#nombreDireccion').val(jsonData.direccion.nombre);
        	$('#numeroDireccion').val(jsonData.direccion.numero);
        	$('#manzanaDireccion').val(jsonData.direccion.manzana);
        	$('#codigoMapa').val(jsonData.recorrido.codigoMapa);
        	$('#loteDireccion').val(jsonData.direccion.lote);
        	$('#provinciaDireccion').val(jsonData.direccion.provincia);
        	$('#distritoDireccion').val(jsonData.direccion.distrito);
        	modalRuta.modal('show');
            }
    });
    
}




function cambiarEstado(id,e,element){
	e.preventDefault();
	var path = $(location).attr("href");
	var enviarRuta = {
		rutaId:id
	};
	$.ajax({
		url : path+"cambiarEstado",
		data : JSON.stringify(enviarRuta),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
				recargarPerfiles();
		}
	});
	e.preventDefault();
	
}
function verRecorrido(id,e,element){
	e.preventDefault();
	var path = $(location).attr("href");
	$('#iframe').attr("src","https://widgets.scribblemaps.com/sm/?d=true&z=true&l=true&id="+id);
	
	$('#modalRecorrido').modal('show');
	e.preventDefault();
	
}
function renderizarIcono(id,e,element){
	var path = $(location).attr("href");
	var enviarSuscripcion = {
			suscripcionId:0,
			usuario:{
				usuarioId:$('#idUsuarioLogeado').val(),
			},
			ruta:{
				rutaId:id
			}
		};
	var title='';
	var iconClass='';
	
	
	$.ajax({
		url : path+"getSuscripcion",
		data : JSON.stringify(enviarSuscripcion),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			if(dataResponse.estado=="1"){
				title='Suscrito';
				iconClass='far fa-heart';
			}
			else{
				title='Suscribirse';
				iconClass='far fa-heart';
			}
			$(element).find('i').attr('title',title);
			$(element).find('i').attr('class',iconClass);
			
		}
	
	});
	e.preventDefault();

}
function getFoto(id,e,element){
	$('#removeImg').click();
	$.ajax({
		url :"getRuta?rutaId="+id,
		type : "POST",
		success : function(dataResponse) {
			if(dataResponse.imagen!=null){
				$('#divFileInputNew').removeClass("fileinput-new");
				$('#divFileInputNew').addClass("fileinput-exists");
				$('#divFileInputNew .fileinput-preview.fileinput-exists.thumbnail.img-raised').html('<img>');
				$('#divFileInputNew img').attr("src",dataResponse.imagen);
			}
			else{
				$('#divFileInputNew').removeClass("fileinput-exists");
				$('#divFileInputNew').addClass("fileinput-new");
			}
			$('#rutaId').val(dataResponse.rutaId);
			$('#modalRutaPP').modal("show");
		}
	
	});

	
}
$("#file").change(function() {
    var file = this.files[0];
    if(file!=null){
    	var imagefile = file.type;
        var match= ["image/jpeg","image/png","image/jpg"];
        if(!((imagefile==match[0]) || (imagefile==match[1]) || (imagefile==match[2]))){
            alert('Please select a valid image file (JPEG/JPG/PNG).');
            $("#file").val('');
            return false;
        }
	}
});
$(function(){
	
	var dataResponse = validateForm('.modal-body input[type="text"][data-req]');
	
	if (dataResponse.estado === false) {
        jsonToDivError(dataResponse, '#modalRutaPP #divMessage');
        return;
    }
	$("#formRutaPP").on("submit",function (e){
		e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'addRutaPP?rutaId='+$('#rutaId').val(),
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData:false,
            success:function(dataResponse){
            	if (jsonToDivError(dataResponse, '#modalRutaPP #divMessage', "")) {
    			}
            }
        });
	});
});

$('#modalRuta').perfectScrollbar();
$('#modalRecorrido').perfectScrollbar();
$('#modalRutaPP').perfectScrollbar();
