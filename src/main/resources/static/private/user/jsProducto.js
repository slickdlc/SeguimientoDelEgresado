$(document)
		.ready(
				function() {
					$('#tblProducto')
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
		url : "producto/cambiarEstado?id=" + id,
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
var frm=$('#formProducto');
var row=$('#rowProducto');
$('#btnAgregar').click(function(e) {
	e.preventDefault();
	frm.trigger("reset");
	frm.attr('action', 'producto/insertar');
	$('#btnGuardar').text("Agregar");

	row.find('.card-title').text("Producto");
	row.find('.card-category').text("Agregar Producto");

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
					var producto = {
							inventario:{
								nombre:$('#nombre').val(),
								stock:$('#stock').val(),
								estado: 1
							},
							categoria:{
								idCategoria: $('#categoria').val()
							},
							precioVenta:$('#precioVenta').val()
					};
					$.ajax({
						url : $(frm).attr("action"),
						data : JSON.stringify(producto),
						type : "POST",
						dataType : 'json',
						contentType : 'application/json',
						success : function(dataResponse) {
							if (jsonToDivError(dataResponse,
									'#rowProducto #divMessage', "")) {
								$('#lista').addClass("hidden");
							}
						}
					});
					e.preventDefault();
				}
			});
		});
function obtener(element,e,id){
	location.href="/admin/producto/editar?id="+id;
}
function quitarStock(element,e,id){
	$('#modalStock').modal("show");
	$('#modalTittle').text("Quitar Stock");
	$('#btnEnviarStock').removeClass("btn-primary");
	$('#btnEnviarStock').addClass("btn-danger");
	$('#btnEnviarStock').text("Quitar");
	$('#formStock').attr("action","producto/quitarStock?id="+id);
	$('#formStock').trigger('reset');
}
function agregarStock(element,e,id){
	$('#modalStock').modal("show");
	$('#modalTittle').text("Agregar Stock");
	$('#btnEnviarStock').removeClass("btn-danger");
	$('#btnEnviarStock').addClass("btn-primary");
	$('#btnEnviarStock').text("Agregar");
	$('#formStock').attr("action","producto/agregarStock?id="+id);
	$('#formStock').trigger('reset');
}

$('#btnEnviarStock').click(function(e){
	$('#formStock').validate({
		submitHandler : function(form) {
			var id=$('#formStock').attr("action").split("id=")[1];
			var url= $('#formStock').attr("action")+'&stock='+$('#stockM').val();
			$.ajax({
				url :url,
				type : "POST",
				dataType : 'json',
				contentType : 'application/json',
				success : function(dataResponse) {
					if (jsonToDivError(dataResponse,
							'#modalStock #divMessage2', "")) {
					
						var stock = $('#stock' + id);
						var stockN;
						
						if($('#btnEnviarStock').text()=="Agregar"){
							stockN= parseInt($(stock).text(),10)-(-$('#stockM').val());
						}
						else{
							stockN= parseInt($(stock).text(),10)-$('#stockM').val();
						}
						var colorARemover;
						var colorAPoner;
						if (stockN>=10) {
							colorARemover = "text-danger";
							colorAPoner = "text-success";
						} else {
							colorARemover = "text-success";
							colorAPoner = "text-danger";
						}
						$(stock).text(stockN);
						$(stock).removeClass(colorARemover);
						$(stock).addClass(colorAPoner);
					}
				}
			});
			$('#formStock').trigger('reset');
			e.preventDefault();
		}
	});
});