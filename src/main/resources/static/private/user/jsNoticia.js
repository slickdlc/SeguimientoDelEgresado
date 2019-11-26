/**
 * 
 */$(document)
		.ready(
				function() {
					$('#tblNoticia')
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
	$('#formNoticia').trigger("reset");
	$('#formNoticia').attr('action', 'noticia/insertar');
	$('#btnGuardar').text("Agregar");

	$('#rowNoticia').find('.card-title').text("Noticia");
	$('#rowNoticia').find('.card-category').text("Agregar Noticia");

	var rowNoticia = $('#rowNoticia');
	if (rowNoticia.hasClass("hidden")) {
		$(rowNoticia).removeClass("hidden");
	} else {
		$(rowNoticia).addClass("hidden");
	}
});

$('#btnGuardar').click(
		function(e) {
			$("#formNoticia").validate({
				submitHandler : function(form) {
					$('#btnGuardar').attr("disabled",true);
					var editar = false;
					if ($('#btnGuardar').text() == "Guardar") {
						editar = true;
					} else if ($('#btnGuardar').text() == "Agregar") {
						editar = false;
					} else {
						return;
					}
					var noticia = {
						descripcionNoticia:$('#descripcionNoticia').val(),
						urlFoto:$('#urlFoto').val(),
						fechaDespublicacion:$('#fechaDespublicacion').val(),
					}

					$.ajax({
						url : $('#formNoticia').attr("action"),
						data : JSON.stringify(noticia),
						type : "POST",
						dataType : 'json',
						contentType : 'application/json',
						success : function(dataResponse) {
							$('#btnGuardar').attr("disabled",false);
							if (jsonToDivError(dataResponse,
									'#rowNoticia #divMessage', "")) {
								$('#lista').addClass("hidden");
							}
						}
					});
				
					e.preventDefault();
				}
			});
		});
function obtener(element,e,id){
	location.href="/admin/noticia/informacion?id="+id;
}
function cambiarEstado(element, e, id) {
	$.ajax({
		url : "noticia/cambiarEstado?id=" + id,
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