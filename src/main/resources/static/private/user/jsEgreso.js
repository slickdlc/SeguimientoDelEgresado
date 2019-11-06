/**
 * 
 */
$(document)
		.ready(
				function() {
					$('#tblEgreso')
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


function cambiarEstado(element, e, id) {
	$.ajax({
		url : "egreso/cambiarEstado?id=" + id,
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			var colorARemover;
			var colorAPoner;
			var text;
			if (dataResponse == "1") {
				colorARemover = "text-danger";
				colorAPoner = "text-success";
				text = "Activo";
			} else {
				colorARemover = "text-success";
				colorAPoner = "text-danger";
				text = "Inactivo";
			}
			var estado = $('#estado' + id);
			$(estado).text(text);
			$(estado).removeClass(colorARemover);
			$(estado).addClass(colorAPoner);
		}
	});
	e.preventDefault();
}
$('#cantidad').change(function(e){
	$('#total').val(($('#cantidad').val()*$('#precioUnitario').val()).toFixed(2));
});
var frm=$('#formEgreso');
var row=$('#rowEgreso');
$('#btnAgregar').click(function(e) {
	e.preventDefault();
	frm.trigger("reset");
	frm.attr('action', 'egreso/insertar');
	$('#btnGuardar').text("Agregar");

	row.find('.card-title').text("Egreso");
	row.find('.card-category').text("Agregar Egreso");

	if (row.hasClass("hidden")) {
		row.removeClass("hidden");
	} else {
		row.addClass("hidden");
	}
	
});

$('#btnGuardar').click(
		function(e) {
			$(frm).validate({
				submitHandler : function(form) {
					var egreso={
						descripcion:$('#descripcion').val(),
						categoriaegreso:{
							idCategoriaEgreso:$('#categoriaEgreso').val()
						},
						precioUnitario:$('#precioUnitario').val(),
						cantidad: $('#cantidad').val(),
						estado:1
					};
					
					$.ajax({
						url : $(frm).attr("action"),
						data : JSON.stringify(egreso),
						type : "POST",
						dataType : 'json',
						contentType : 'application/json',
						success : function(dataResponse) {
							if (jsonToDivError(dataResponse,
									'#rowEgreso #divMessage', "")) {
								$('#lista').addClass("hidden");
							}
						}
					});
					e.preventDefault();
				}
			});
		});
function obtener(element,e,id){
	location.href="/admin/egreso/editar?id="+id;
}