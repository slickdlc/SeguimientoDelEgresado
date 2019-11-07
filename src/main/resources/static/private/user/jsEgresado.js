$(document)
		.ready(
				function() {
					$('#tblEgresado')
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
					$('#tblAntecendentes')
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
		url : "egresado/cambiarEstado?id=" + id,
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
$('#btnAgregar').click(function(e) {
	e.preventDefault();
	$('#formEgresado').trigger("reset");
	$('#formEgresado').attr('action', 'egresado/insertar');
	$('#btnGuardar').text("Agregar");

	$('#rowEgresado').find('.card-title').text("Egresado");
	$('#rowEgresado').find('.card-category').text("Agregar Egresado");

	var rowEgresado = $('#rowEgresado');
	if (rowEgresado.hasClass("hidden")) {
		$(rowEgresado).removeClass("hidden");
	} else {
		$(rowEgresado).addClass("hidden");
	}
});

$('#btnGuardar').click(
		function(e) {
			$("#formEgresado").validate({
				submitHandler : function(form) {
					var editar = false;
					if ($('#btnGuardar').text() == "Guardar") {
						editar = true;
					} else if ($('#btnGuardar').text() == "Agregar") {
						editar = false;
					} else {
						return;
					}
					
					var egresado = {
						direccion:{
							departamento:{
								idDepartamento:$('#departamento').val()
							},
							nombreDireccion:$('#direccion').val(),
							referenciaDireccion:$('#refDir').val(),
							nombreProvincia:$('#provincia').val(),
							nombreDistrito:$('#distrito').val()
						},
						estadocivil:{
							idEstadoCivil:$('#estadoCivil').val()
						},
						perfilacademico:{
							motivosituacionegresado:null,
							carrera:{
								idCarrera:$('#carrera').val()
							},
							modalidadestudio:{
								idModalidadEstudio:$('#modalidadEstudio').val()
							},
							situacionegresado:{
								idSituacionEgresado:$('#situacionEgresado').val()
							},
							anoIngreso:$('#anoIngreso').val(),
							anoEgreso:$('#anoEgreso').val(),
							anoTitulacion:$('#anoTitulacion').val()
							
						},
						persona:{
							usuario:{
								perfil : {
									idPerfil : 2
								},
								usuario:$('#user').val(),
								pass : $('#pass').val(),
								estado : 1
							},
							nombres:$('#nombres').val(),
							apellidoPaterno:$('#apellidoPaterno').val(),
							apellidoMaterno:$('#apellidoMaterno').val(),
							dni:$('#dni').val()
						},
						sexo:{
							idSexo:$('#sexo').val()
						},
						fechaNacimiento: $('#fechaNacimiento').val(),
						numeroCelular: $('#numeroCelular').val(),
						email: $('#email').val(),
						facebook: $('#facebook').val()
					}
					$.ajax({
						url : $('#formEgresado').attr("action"),
						data : JSON.stringify(egresado),
						type : "POST",
						dataType : 'json',
						contentType : 'application/json',
						success : function(dataResponse) {
							if (jsonToDivError(dataResponse,
									'#rowEgresado #divMessage', "")) {
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
$('#btnAntecedenteLaboral').click(function(e){
	e.preventDefault();
	$('#formAntecedente').trigger("reset");
	$('#formAntecedente').attr('action', '/admin/egresado/insertarAL');
	$('#btnGuardarAntecedente').text("Agregar");

	$('#rowAntecedente').find('.card-title').text("Egresado");
	$('#rowAntecedente').find('.card-category').text("Agregar un empleo");
	
	var rowAntecedente = $('#rowAntecedente');
	if (rowAntecedente.hasClass("hidden")) {
		$(rowAntecedente).removeClass("hidden");
	} else {
		$(rowAntecedente).addClass("hidden");
	}
});
function cambiarDeColor(element){
	var btn= $(element);
	if(!$(btn).hasClass("btn-primary")){
		$(btn).removeClass("btn-secondary");
		$(btn).addClass("btn-primary");
	}else{
		$(btn).removeClass("btn-primary");
		$(btn).addClass("btn-secondary");
	}
}
$('#btnSi').click(function(e){
	if($('#btnNo').hasClass("btn-primary")){
		cambiarDeColor($('#btnNo'));
	}
	cambiarDeColor(this);
});
$('#btnNo').click(function(e){
	if($('#btnSi').hasClass("btn-primary")){
		cambiarDeColor($('#btnSi'));
	}
	cambiarDeColor(this);
});
function obtener(element,e,id){
	location.href="/admin/egresado/informacion?id="+id;
}
function obtenerAntecedente(element,e,id){
	location.href="/admin/egresado/antecedente?id="+id;
}
function eliminarAntecedente(element,e,id){
	$.ajax({
		url : "/admin/egresado/eliminarAL?id=" + id,
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			$(element).parents('tr').remove();
		}
	});
	e.preventDefault();

}
$('#btnGuardarAntecedente').click(
		function(e) {
			$("#formAntecedente").validate({
				submitHandler : function(form) {
					var editar = false;
					if ($('#btnGuardarAntecedente').text() == "Guardar") {
						editar = true;
					} else if ($('#btnGuardarAntecedente').text() == "Agregar") {
						editar = false;
					} else {
						return;
					}
					var rela=0;
					if($('#btnSi').hasClass("btn-primary")){
						rela=1;
					}
					var antecedente = {
						egresado:{
							idEgresado: $('#idEgresado').val()
						},
						sectorinstitucion:{
							idSectorInstitucion:$('#sectorInstitucion').val()
						},
						relacionadoConFormacion:rela,
						nombreInstitucion:$('#nombreInstitucion').val(),
						cargoEmpleo:$('#cargoEmpleo').val(),
						fechaInicio:$('#fechaInicio').val(),
						fechaTermino:$('#fechaTermino').val(),
						tipoContrato:$('#tipoContrato').val(),
						estado:1
					}
					$.ajax({
						url : $('#formAntecedente').attr("action"),
						data : JSON.stringify(antecedente),
						type : "POST",
						dataType : 'json',
						contentType : 'application/json',
						success : function(dataResponse) {
							if (jsonToDivError(dataResponse,
									'#rowAntecedente #divMessageAntecedente', "")) {
								$('#lista').addClass("hidden");
							}
						}
					});
					e.preventDefault();
				}
			});
		});