$(document)
		.ready(
				function() {
					$('#tblPerfil')
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
		url : "perfil/cambiarEstado?id=" + id,
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
var frm=$('#formPerfil');
var row=$('#rowPerfil');
$('#btnAgregar').click(function(e) {
	e.preventDefault();
	frm.trigger("reset");
	frm.attr('action', 'perfil/insertar');
	$('#btnGuardar').text("Agregar");

	row.find('.card-title').text("Perfil");
	row.find('.card-category').text("Agregar Perfil");

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
					var editar = false;
					
					var perfil = {
							nombre:$('#nombrePerfil').val(),
							estado:1
					};
					perfil.permisos=[];
					$("input:checkbox").each(function() {
			            perfil.permisos.push({
			            	opcion:{
			            		idOpcion:$(this).attr("idopcion")
			            	},
			            	idPermiso:$(this).attr("idpermiso"),
			            	estado:$(this).prop("checked")? 1:0
			            });
			        });
					
					$.ajax({
						url : $(frm).attr("action"),
						data : JSON.stringify(perfil),
						type : "POST",
						dataType : 'json',
						contentType : 'application/json',
						success : function(dataResponse) {
							if (jsonToDivError(dataResponse,
									'#rowPerfil #divMessage', "")) {
								$('#lista').addClass("hidden");
							}
						}
					});
					e.preventDefault();
				}
			});
		});
function obtener(element,e,id){
	location.href="/admin/perfil/editar?id="+id;
}