$('#btnVerViaje').click(function(e) {
	$('#rowVerViaje').removeClass("d-none");
	$('#rowMonitoreo').addClass("d-none");
	$('#rowUbicationsByViaje').addClass("d-none");
	$('#rowMapUbicacion').addClass("d-none");
});
$('#btnMonitorear').click(function(e) {
	$('#rowMonitoreo').removeClass("d-none");
	$('#rowVerViaje').addClass("d-none");
	$('#rowUbicationsByViaje').addClass("d-none");
	$('#rowMapUbicacion').addClass("d-none");

});
var tblViaje = document.getElementById('tblViaje');
$(document).ready(function() {
	listarViajes(0);
});


function recargarViajes() {
	$(tblViaje).DataTable().ajax.reload();
}

function listarViajes(rutaId) {
	/* Este método permite verificar si un table es un DataTable o no */
	if ($.fn.DataTable.isDataTable(tblViaje)) {
		$(tblViaje).DataTable().destroy();
	}

	var path = $("#path").val();

	var table = $(tblViaje)
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
						"sAjaxSource" : path + "/../viajesJSON?id=" + rutaId,
						"bServerSide" : true,
						"bProcessing" : true,
						"sDom" : "<'row'<'col-sm-12 d-flex flex-row-reverse'f>>t<'row'<'col-sm-5'><'col-sm-7 d-flex flex-row-reverse'p>>",
						"sPaginationType" : "simple_numbers",
						"bAutoWidth" : false,
						"aoColumns" : [
								{
									"sClass" : "td-actions showDetails",
									"orderable" : false,
									"data" : null,
									sWidth : "5%",
									"defaultContent" : '',
									"mRender" : function(data, type, row) {
										var showHTML = '';
										showHTML += '<button class="btn btn-success btn-sm m-1"'
												+ 'title="Ver Detalles"><i class="fas fa-plus"></i></button>';

										return showHTML;
									}
								},
								{
									mData : "viajeId",
									sWidth : "5%",

								},
								{
									mData : "microbus.ruta.numeroRuta",
									sWidth : "10%"
								},
								{
									mData : "microbus.matricula",
									sWidth : "15%"
								},
								{
									mData : "viajexpersonals",
									sWidth : "30%",
									"mRender" : function(data, type, row) {
										var datosConductorHTML = '';

										if (data[0].personal.usuario.perfil.perfilId == 3) {
											datosConductorHTML += ''
													+ data[0].personal.nombres;
											datosConductorHTML += ' '
													+ data[0].personal.apellidoPaterno;
										} else {
											datosConductorHTML += ''
													+ data[1].personal.nombres;
											datosConductorHTML += ' '
													+ data[1].personal.apellidoPaterno;
										}
										return datosConductorHTML;
									}
								},
								{
									mData : "viajexpersonals",
									sWidth : "30%",
									"mRender" : function(data, type, row) {
										var datosCobradorHTML = '';
										if (data[0].personal.usuario.perfil.perfilId == 4) {
											datosCobradorHTML += ''
													+ data[0].personal.nombres;
											datosCobradorHTML += ' '
													+ data[0].personal.apellidoPaterno;
										} else {
											datosCobradorHTML += ''
													+ data[1].personal.nombres;
											datosCobradorHTML += ' '
													+ data[1].personal.apellidoPaterno;
										}
										return datosCobradorHTML;
									}
								},
								{
									mData : "viajeId",
									sWidth : "10%",
									"bSortable" : false,
									"sClass" : "td-actions",
									"mRender" :

									function(data, type, row) {

										var seeHTML = '';

										seeHTML += '<button class="btn btn-success btn-sm m-1 btn-link" onclick="verUbicaciones('
												+ data
												+ ', event, this)" title="Editar Personal"><i class="fas fa-eye fa-lg"></i></button>';
										return seeHTML;
									}
								} ]
					});
	$('#tblViaje tbody').on('click', 'td.showDetails', function() {
		var tr = $(this).closest('tr');
		var row = table.api().row(tr);

		if (row.child.isShown()) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		} else {
			// Open this row
			row.child(format(row.data())).show();
			tr.addClass('shown');
		}
	});

}
function format(d) {
	var fechaFin = d.fechaFin == null ? 'Aún no ha llegado' : d.fechaFin;
	var horaFin = d.horaFin == null ? '' : d.horaFin;
	return '<table cellpadding="5" cellspacing="0" border="0" class="w-50 table-hover">'
			+ '<tr class="bg-success text-light">'
			+ '<td>Fecha y hora de Salida:</td>'
			+ '<td>'
			+ d.fechaInicio
			+ ' '
			+ d.horaInicio
			+ '</td>'
			+

			'</tr>'
			+ '<tr class="bg-success text-light">'
			+ '<td>Fecha y hora de Entrada:</td>'
			+ '<td>'
			+ fechaFin
			+ ' '
			+ horaFin + '</td>' + '</tr>';

}

var map;
var markerGroup;
function renderizarMapa(data) {
	if (!map) {
		$('#nap').attr("id", "map");
		map = new L.map('map').setView([ -13.165394499551137, -74.21713914373197 ],
				16);
		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom : 18
		}).addTo(map);
		L.control.scale().addTo(map);
//		map.off();
//		map.remove();
	}
	if(!markerGroup){
		markerGroup=L.layerGroup().addTo(map);
	}
	markerGroup.clearLayers();
	
	$.each(data,
			function(index, value) {
				var marker = L.marker([ value.latitud, value.longitud ]).addTo(markerGroup);
				marker.bindPopup("Placa:" + value.viaje.microbus.matricula)
						.openPopup();
			});
	
}
$('#selectRuta').change(function(e) {
	getAllLastUbicationsByRuta($('#selectRuta').val());
});
function getAllLastUbicationsByRuta(id) {
	$.ajax({
		url : "getAllLastUbicationsByRuta?id=" + id,
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			renderizarMapa(dataResponse);
		}
	});
}
setInterval(function() {
	if ($('#selectRuta').val() != null) {
		getAllLastUbicationsByRuta($('#selectRuta').val());
	}
}, 5000);
$('#selectRutaViaje').change(function(e) {
	listarViajes($('#selectRutaViaje').val());
});

function verUbicaciones(id, e, element) {
	listarUbicaciones(id);
	$('#rowUbicationsByViaje').removeClass("d-none");
	$('#rowMonitoreo').addClass("d-none");
	$('#rowVerViaje').addClass("d-none");
	$('#rowMapUbicacion').addClass("d-none");
}

var tblUbicaciones = document.getElementById('tblUbicaciones');
function listarUbicaciones(viajeId) {
	/* Este método permite verificar si un table es un DataTable o no */
	if ($.fn.DataTable.isDataTable(tblUbicaciones)) {
		$(tblUbicaciones).DataTable().destroy();
	}

	var path = $("#path").val();

	$(tblUbicaciones)
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
						"sAjaxSource" : path
								+ "/../getAllUbicationsByViaje?id=" + viajeId,
						"bServerSide" : true,
						"bProcessing" : true,
						"sDom" : "<'row'<'col-sm-12 d-flex flex-row-reverse'f>>t<'row'<'col-sm-5'><'col-sm-7 d-flex flex-row-reverse'p>>",
						"sPaginationType" : "simple_numbers",
						"bAutoWidth" : false,
						"aoColumns" : [
								{
									mData : "ubicacionId",
									sWidth : "5%",

								},
								{
									mData : "hora",
									sWidth : "10%"
								},
								{
									mData : "fecha",
									sWidth : "15%"
								},
								{
									mData : "ubicacionId",
									sWidth : "10%",
									"bSortable" : false,
									"sClass" : "td-actions",
									"mRender" :

									function(data, type, row) {

										var seeHTML = '';

										seeHTML += '<button class="btn btn-success btn-sm m-1 btn-link" onclick="verUbicacion('
												+ data
												+ ', event, this)" title="Ver En Mapa"><i class="fas fa-map-marked-alt"></i></i></button>';
										return seeHTML;
									}
								} ]
					});
}

function verUbicacion(id, e, element) {
	$
			.ajax({
				url : "getUbicacion?id=" + id,
				type : "POST",
				dataType : 'json',
				contentType : 'application/json',
				success : function(dataResponse) { 
					$('#rowMapUbicacion .card-category').text($(element).prop("title"));
					$('#rowMonitoreo').addClass("d-none");
					$('#rowVerViaje').addClass("d-none");
					$('#rowUbicationsByViaje').addClass("d-none");
					$('#rowMapUbicacion').removeClass("d-none");
					$('#rowMapUbicacion .card-body').css("height","500px");
					renderizarMapaPorUbicacion(dataResponse);
				}
			});

}

var mapUbicacion;
function renderizarMapaPorUbicacion(u) {
	if (mapUbicacion && mapUbicacion.remove) {
		mapUbicacion.off();
		mapUbicacion.remove();
	}
	mapUbicacion = new L.map('mapUbicacion').setView([u.latitud, u.longitud], 16);
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom : 18
	}).addTo(mapUbicacion);
	L.control.scale().addTo(mapUbicacion);
	var marker = L.marker([ u.latitud, u.longitud ]).addTo(mapUbicacion);
	marker.bindPopup("Hora:" + u.hora+"\n" +
			"Fecha:" + u.fecha+"\n" +
			"Placa:" + u.viaje.microbus.matricula+"\n").openPopup();
}