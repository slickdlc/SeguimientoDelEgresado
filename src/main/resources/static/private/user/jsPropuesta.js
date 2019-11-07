$(document)
		.ready(
				function() {
					$('#tblPropuesta')
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
										}
									});
				});
$('#btnAgregar').click(function(e) {
	e.preventDefault();
	$('#formPropuesta').trigger("reset");
	$('#formPropuesta').attr('action', 'propuesta/insertar');
	$('#btnGuardar').text("Agregar");

	$('#rowPropuesta').find('.card-title').text("Propuesta");
	$('#rowPropuesta').find('.card-category').text("Agregar Propuesta");

	var rowPropuesta = $('#rowPropuesta');
	if (rowPropuesta.hasClass("hidden")) {
		$(rowPropuesta).removeClass("hidden");
	} else {
		$(rowPropuesta).addClass("hidden");
	}
});

$('#btnGuardar').click(
		function(e) {
			$("#formPropuesta").validate({
				submitHandler : function(form) {
					var editar = false;
					if ($('#btnGuardar').text() == "Guardar") {
						editar = true;
					} else if ($('#btnGuardar').text() == "Agregar") {
						editar = false;
					} else {
						return;
					}
					var propuesta = {
						tipopropuesta:{
							idTipoPropuesta:$('#tipoPropuesta').val(),
						},
						descripcionPropuesta:$('#descripcionPropuesta').val()
					}

					$.ajax({
						url : $('#formPropuesta').attr("action"),
						data : JSON.stringify(propuesta),
						type : "POST",
						dataType : 'json',
						contentType : 'application/json',
						success : function(dataResponse) {
							if (jsonToDivError(dataResponse,
									'#rowPropuesta #divMessage', "")) {
								$('#lista').addClass("hidden");
							}
						}
					});
					e.preventDefault();
				}
			});
		});
$('#dni').change(function(e){
	$('#user').val($('#dni').val());
});
function obtener(element,e,id){
	location.href="/admin/propuesta/informacion?id="+id;
}