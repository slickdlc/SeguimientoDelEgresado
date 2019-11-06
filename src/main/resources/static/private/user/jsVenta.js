$(document).ready(function(e) {
	$('#producto').click(function(e) {
		$('#modalProducto').modal("show");
	});
	$('.btn-producto').click(function(e) {
		$('#modalProducto').modal("hide");
		var btnProducto = $(e.target).closest(".btn");
		$('#producto').val($(btnProducto).find(".nombre").text());
		$('#PrecioProducto').val("$ " + $(btnProducto).find(".precio").text());
		$('#Cantidad').val(0);
		$('#idProd').val($(this).attr("id"));
	});

	$('#Cantidad').change(function(e) {
		precioU = parseFloat($('#PrecioProducto').val().split(" ")[1]);
		total = (precioU * $(this).val()).toFixed(2);
		$('#PrecioTotal').val('$ ' + total);
	});

});

$('#btnAnadir').click(
		function(e) {
			e.preventDefault();
			if ($('#producto').val() == "") {
				$('#producto').trigger("click");
				return;
			}
			if ($('#Cantidad').val() <= 0) {
				$('#Cantidad').trigger("focus");
				return;
			}
			addDetalle($('#producto').val(), $('#Cantidad').val(), $(
					'#PrecioProducto').val(), $('#PrecioTotal').val(), $(
					'#idProd').val());
			$('#idProd').val(0);
			
			precioU = parseFloat($('#PrecioProducto').val().split(" ")[1]);
			total = (precioU * $('#Cantidad').val()).toFixed(2);
			$('#totalVenta').val(parseFloat($('#totalVenta').val())+parseFloat(total));
			
			if($('#totalVenta').val().split(".")[1]==undefined)
				$('#totalVenta').val($('#totalVenta').val()+".00");
			else if(parseInt($('#totalVenta').val().split(".")[1])%5==0)
				$('#totalVenta').val($('#totalVenta').val().split(".")[0]+'.'+$('#totalVenta').val().split(".")[1]);
			else
				$('#totalVenta').val($('#totalVenta').val()+"0");
			
			$('#formDetalleVenta').trigger("reset");
		});
function addDetalle(descripcion, cantidad, precioUnitario, importe, id) {
	var html;
	html = "<tr>" + '<input type="hidden" value="' + id + '"/>' + "	<td>"
			+ descripcion + "	</td>" + "	<td>" + cantidad + "	</td>" + "	<td>"
			+ precioUnitario + "	</td>" + "	<td>" + importe + "	</td>"
			+ "</tr>";
	$('#tblDetalleVenta').find("tbody").html(
			$('#tblDetalleVenta').find("tbody").html() + html);
}
$('#btnVender').click(function(e) {
	$('#btnVender').attr("disabled",true);
	if ($('#inputFiltro').val() == "") {
		$('#inputFiltro').trigger("focus");
		$('#btnVender').attr("disabled",false);
		return;
	}
	var venta = {
		cliente : {
			idCliente : $('#inputFiltro').val()
		},
		metodopago : {
			idMetodoPago : $('#metodoPago').val()
		},
		tipoventa : {
			idTipoVenta : $('#tipoVenta').val()
		},
		detventas : [],
		estado : $('#tipoVenta').val()
	};
	$.each($('#tblDetalleVenta').find("tbody tr"), function(key, value) {

		var idProducto = $(value).find('input').val();
		var cantidad = parseInt($($(value).find('td')[1]).text());
		venta.detventas.push({
			producto : {
				idProducto : idProducto
			},
			cantidad : cantidad
		});
	});
	n=venta.detventas.length;
	for(var i=0; i<n-1;i++){
		var dv=venta.detventas[i];
		for(var j=i+1;j<n;j++){
			var dv2=venta.detventas[j];
			if(dv.producto.idProducto==dv2.producto.idProducto){
				dv.cantidad= dv.cantidad+dv2.cantidad;
				venta.detventas.splice(1,j);
				n-=1;
				j-=1;
			}
		}
	}
	$.ajax({
		url : 'venta/insertar',
		type : "POST",
		data : JSON.stringify(venta),
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			if (jsonToDivError(dataResponse, '#divMessage', "")) {
				$('#tblDetalleVenta').find("tbody").html("");
				$('#totalVenta').val(0);
				$('#btnVender').attr("disabled",false);
			}
		}
	});
});