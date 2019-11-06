
var tblMicrobus = document.getElementById('tblMicrobus');

/*El método ready() se utiliza para hacer que una función esté disponible después 
 * de cargar el documento.*/
$(document).ready(function() {
	listarMicrobuses(0);
});

function recargarMicrobuses() {
	$(tblMicrobus).DataTable().ajax.reload();
}

function listarMicrobuses(rutaId) {
	/*Este método permite verificar si un table es un DataTable o no*/
	if ($.fn.DataTable.isDataTable(tblMicrobus)) {
		$(tblMicrobus).DataTable().destroy();
	}
	var path = $("#path").val();
	
	var table=$(tblMicrobus)
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
						"sAjaxSource" : "/admin/microbus/microbusJSON?rutaId="+rutaId,
						"bServerSide" : true,
						"bProcessing" : true,
						"sDom" : "<'row'<'col-sm-12 d-flex flex-row-reverse'f>>t<'row'<'col-sm-5'><'col-sm-7 d-flex flex-row-reverse'p>>",
						"sPaginationType" : "simple_numbers",
						"bAutoWidth" : false,
						"aoColumns" : [
								{
									"sClass": "td-actions showDetails",
					                "orderable":      false,
					                "data":           null,
					                sWidth : "5%",
					                "defaultContent": '',
					                "mRender":function(data, type, row) {
					                	var showHTML='';
					                	showHTML += '<button class="btn btn-success btn-sm m-1"'+
					                		'title="Ver Detalles"><i class="fas fa-plus"></i></button>';
										
										return showHTML;
									}
					            },
								{
									mData : "microbusId",
									sWidth : "5%",
									
								},
								{
									mData : "matricula",
									sWidth : "20%"
								},
								{
									mData : "fechaCompra",
									sWidth : "20%"
								},
								{
									mData : "ruta.numeroRuta",
									sWidth : "20%",
									"mRender":function(data,type,row){
										var resultStatus=$.trim(data);
										return "Ruta "+data;
									}
								},
								{
									mData : "estado",
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
									mData : "microbusId",
									sWidth : "15%",
									"bSortable" : false,
									"sClass": "td-actions",
									"mRender" :

										function(data, type, row) {

										var editHTML = '';
										var stateHTML = '';

										editHTML += '<button class="btn btn-primary btn-sm m-1" onclick="obtenerMicrobus('
												+ data
												+ ', event, this)" title="Editar Personal"><i class="fas fa-pencil-alt"></i></button>';
										stateHTML += '<button  class="btn btn-info btn-sm m-1" onclick="cambiarEstado('
												+ data
												+ ', event, this)" ><i class="fas fa-sync"></i></button>';
										return editHTML+ stateHTML;
									}
								} ]
					});
	 $('#tblMicrobus tbody').off('click', 'td.showDetails');
	 $('#tblMicrobus tbody').on('click', 'td.showDetails', function () {
	        var tr = $(this).closest('tr');
	        var row = table.api().row(tr);
	        
	        if ( !row.child.isShown() ) {
	        	 // Open this row
	            row.child(format(row.data())).show();
	            tr.addClass('shown');
	        }
	        else {
	        	// This row is already open - close it
	            row.child.hide();
	            tr.removeClass('shown');
	        }
	    } );
}
function format ( d ) {
    return '<table cellpadding="5" cellspacing="0" border="0" class="w-50 table-hover">'+
    '<tr class="bg-success text-light">'+
	            '<td>Marca:</td>'+
	            '<td>'+d.marca+'</td>'+
            
	            '</tr>'+
	            '<tr class="bg-success text-light">'+
        '<td>Modelo:</td>'+
        '<td>'+d.modelo+'</td>'+
        '</tr>';
    
}
$('#btnCrear').click(function(e) {
    e.preventDefault();
    $('#formMicrobus').trigger("reset");
    
    $('#microbusId').val('0');
    var path = $(location).attr("href");

    var modalMicrobus = $('#modalMicrobus');
    
    modalMicrobus.find('form').attr('action', path + "agregarMicrobus");
    modalMicrobus.find('.card-header .card-category').html($(this).attr('title'));
    modalMicrobus.find('#btnGuardar').html("Agregar");
    modalMicrobus.modal('show');
});


function obtenerMicrobus(id, e, element) {
    e.preventDefault();
    
    var path = $(location).attr("href");
	
    var modalMicrobus = $('#modalMicrobus');
    modalMicrobus.find('form').attr('action', path + "modificarMicrobus");
    modalMicrobus.find('.card-header .card-category').html($(this).attr('title'));
    modalMicrobus.find('#btnGuardar').html("Guardar");
    
    var enviarId = {
			microbusId : id
		};

    $.ajax({
        url: path + "getMicrobus",
        data : JSON.stringify(enviarId),
        type: 'POST',
        dataType: 'json',
        contentType : 'application/json',
        success: function(jsonData, status, metaData) {
        	$('#microbusId').val(jsonData.microbusId);
        	$('#marca').val(jsonData.marca);
        	$('#modelo').val(jsonData.modelo);
        	$('#matricula').val(jsonData.matricula);
        	$('#fechaCompra').val(jsonData.fechaCompra);
        	$('#rutaId').val(jsonData.ruta.rutaId);
            modalMicrobus.modal('show');
            }
    });
}

$('#btnGuardar').click(function(e) {
	
	var path = $("#path").val();
	var frm = $('#modalMicrobus form');
	
	var enviarMicrobus = {
		microbusId:	$('#microbusId').val(),
		marca:$('#marca').val(),
		modelo:$('#modelo').val(),
		matricula:$('#matricula').val(),
		fechaCompra:$('#fechaCompra').val(),
		ruta:{
			rutaId:$('#rutaId').val(),
		}
	};
	
	
	var dataResponse = validateForm('.modal-body input[type="text"][data-req]');
	
	if (dataResponse.estado === false) {
        jsonToDivError(dataResponse, '#modalMicrobus #divMessage');
        return;
    }
	
	$.ajax({
		url : frm.attr("action"),
		data : JSON.stringify(enviarMicrobus),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			
			if (jsonToDivError(dataResponse, '#modalMicrobus #divMessage', path)) {
				recargarMicrobuses();
			}
		}
	});
	
	e.preventDefault();
});

function cambiarEstado(id, e, element) {
	var path = $("#path").val();
	var enviarId = {
			microbusId : id,
		};

	$.ajax({
		url : path + "/../cambiarEstado",
		data : JSON.stringify(enviarId),
		type : 'POST',
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			recargarMicrobuses();
		}
	});
	
}
$('#selectRuta').change(function(e) {
	listarMicrobuses($('#selectRuta').val());
});


