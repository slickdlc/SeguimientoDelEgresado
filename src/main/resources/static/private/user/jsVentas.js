$(document)
		.ready(
				function() {
					$('#tblVenta')
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
					$('#tblDelivery')
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
					$('#tblCamion')
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
$('#btnVentas').click(function(e) {
	$('#rowVentas').removeClass('hidden');
	$('#rowCamion').addClass('hidden');
	$('#rowDelivery').addClass('hidden');
});
$('#btnDelivery').click(function(e) {
	$('#rowDelivery').removeClass('hidden');
	$('#rowCamion').addClass('hidden');
	$('#rowVentas').addClass('hidden');
});
$('#btnCamion').click(function(e) {
	$('#rowCamion').removeClass('hidden');
	$('#rowDelivery').addClass('hidden');
	$('#rowVentas').addClass('hidden');
});
function verVenta(element, e, id) {
	location.href = "/admin/ventas/ver?id=" + id;
}
function eliminarVenta(element, e, id) {
	location.href = "/admin/ventas/eliminarVenta?id=" + id;
}
function confirmarDelivery(element, e, id) {
	location.href = "/admin/ventas/confirmarDelivery?id=" + id;
}
function rechazarDelivery(element, e, id) {
	location.href = "/admin/ventas/rechazarDelivery?id=" + id;
}
function verCamion(element, e, id) {
	location.href = "/admin/ventas/verCamion?id=" + id;
}
$('table tbody input').attr("max", $('table tbody input').val());
$('table tbody input').change(
		function(e) {
			var total = ($(this).val() * parseFloat($(this).closest('td').prev(
					'td').text())).toFixed(2);
			$(this).closest('td').next('td').text(total);
		});
$('#btnDevolverProductos').click(function(e) {
	$('#btnDevolverProductos').attr("disabled", true);
	venta = {
		detventas : []
	};
	$.each($('#tblDetalleVenta').find("tbody tr"), function(key, value) {
		var idProducto = $($(value).find('td')[0]).text();
		var cantidad = $(value).find('input.cantidad').val();
		venta.detventas.push({
			producto : {
				idProducto : idProducto
			},
			cantidad : cantidad
		});
	});
	n = venta.detventas.length;
	for (var i = 0; i < n - 1; i++) {
		var dv = venta.detventas[i];
		for (var j = i + 1; j < n; j++) {
			var dv2 = venta.detventas[j];
			if (dv.producto.idProducto == dv2.producto.idProducto) {
				dv.cantidad = dv.cantidad + dv2.cantidad;
				venta.detventas.splice(1, j);
				n -= 1;
				j -= 1;
			}
		}
	}
	$.ajax({
		url : $('#formCamion').attr('action'),
		type : "POST",
		data : JSON.stringify(venta),
		dataType : 'json',
		contentType : 'application/json',
		success : function() {
			$('#btnDevolverProductos').attr("disabled", false);
			location.href = "/admin/ventas";
		}
	});
	e.preventDefault();

});