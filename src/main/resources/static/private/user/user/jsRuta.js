//abrir modal de consultar personal
$('#btnConsultarPersonal').click(function(e) {
	$('#modalConsultarPersonal').modal("show");
	$('#formConsultaPersonal').trigger("reset");
	$('#respuesta').html('');
});
$('#btnEnviar').click(function(e) {
	if ($('#matricula').val().trim() == '') {
		$('#matricula').focus();
	} else {
		$.ajax({
			url : "getPersonal?query=" + $('#matricula').val(),
			type : "POST",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataResponse) {
				renderizarRespuesta(dataResponse);
			}
		});
	}
});
function renderizarRespuesta(data) {
	var htmlRespuesta='';
	if (data.length==0) {
		htmlRespuesta = '<div class="alert alert-danger alert-dismissible" role="alert"> '
				+ '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span> '
				+ '</button> '
				+ '<strong>No se ha encontrado ninguna ruta con esa matrícula</strong> '
				+ '</div>'
	} else {
		$.each(data, function(index, value) {
			htmlRespuesta += 
				'<div class="row">'+
				'<div class="col-sm-12">'+
					'<legend class="text-primary">C'+value.usuario.perfil.nombrePerfil.substring(6).toLowerCase()+'</legend>'+
					
						'<div class="form-group mt-3">'+
							'<label>Nombres y Apellidos:</label> <input '+
							'class="form-control" disabled value="'+
							value.nombres+' '+
							value.apellidoPaterno+' '+
							value.apellidoMaterno+'"/>'+
						'</div>'+
					'</div>'+
				'</div>';
		});

	}
	$('#respuesta').html(htmlRespuesta);

}
botonesR = $('.btn-recorrido');

botonesS = $('.btn-suscribirse');
for (i = 0; i < botonesR.length; i++) {
	$(botonesR[i]).attr(
			"onclick",
			"verRecorrido(\'" + $(botonesR[i]).attr("onclick")
					+ "\',event,this)");
}

function verRecorrido(id, e, element) {
	e.preventDefault();

	$('#iframe').attr(
			"src",
			"https://widgets.scribblemaps.com/sm/?d=true&z=true&l=true&id="
					+ id);

	$('#modalRecorrido').modal('show');
	e.preventDefault();

}
var cards = $('.card-stats');
for (var i = 0; i < cards.length; i++) {
	var buttons = $(cards[i]).find('button');
	if (buttons.length == 2) {
		$(buttons[1]).removeClass("d-none");
	}
}

function generarSuscripcion(id, e, element) {

	e.preventDefault();
	var path = $(location).attr("href");
	var frm = $('#modalRuta form');

	var enviarSuscripcion = {
		suscripcionId : 0,
		ruta : {
			rutaId : id
		}
	};

	$.ajax({
		url : "/user/suscripcion/generarSuscripcion",
		data : JSON.stringify(enviarSuscripcion),
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			var title;
			var iconClass;
			if (dataResponse.estado == "1") {
				title = 'Suscrito';
				iconClassARemover = 'far';
				iconClassAPoner = 'fas';
			} else {
				title = 'Suscribirse';
				iconClassARemover = 'fas';
				iconClassAPoner = 'far';
			}
			$(element).find('i').removeClass(iconClassARemover);
			$(element).find('i').addClass(iconClassAPoner);
			$(element).find('i').attr('title', title);
		}

	});
	e.preventDefault();

}
function doAjax(num) {
	$.ajax({
		url : "/admin/ruta/rutasJSONToUser",
		data : {
			'pagina' : num
		},
		type : "GET",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			$("#contentRutas").html(renderizarDivRuta(dataResponse));

			$("#page-selectionR").bootpag({
				total : dataResponse.numeroPaginas,
				maxVisible : 5
			});
			$('#page-selectionR ul li a').addClass('page-link');
			$('#page-selectionR ul li').addClass("page-item");
			$('#page-selectionR ul li.next a').html("Siguiente");
			$('#page-selectionR ul li.prev a').html("Anterior");
		}
	});
}
$(document).ready(function(e) {
	doAjax(1);
});
$('#page-selectionR').bootpag({
	page : 1,
	leaps : true,
	firstLastUse : true,
	first : '←',
	last : '→',
	wrapClass : 'pagination',
	activeClass : 'active',
	disabledClass : 'disabled',
	nextClass : 'next',
	prevClass : 'prev',
	lastClass : 'last',
	firstClass : 'first'
}).on("page", function(event, num) {
	var total;
	doAjax(num);
});

function renderizarDivRuta(dataResponse) {
	html = '';
	var imagen;
	
	$
			.each(
					dataResponse.data,
					function(k, v) {
						if(v.ruta.imagen!=null){
							imagen=v.ruta.imagen;
						}else{
							imagen='/private/img/sidebar-3.jpg';
						}
						html += '<div class="col-lg-6 col-md-6  ">'
							+ '<div class="rotating-card-container">'
								+ '<div class="card card-rotate card-background">'
								+ '<div class="front front-background"  style="background-image:url(\''
								+ imagen
								+ '\');">'
								+ '<div class="card-body">'
								+ '  <a href="#pablo">'
								+ '     <h3 class="card-title text-light">Ruta '+ v.ruta.numeroRuta+'</h3>'
			                        + ' </a>'
			                        + ' <p class="card-description">'
			                        + v.ruta.nombreEmpresa
			                        + ' </p>'
								+ '</div>'
								+ '</div>'
								+ '<div class="back back-background" style="background-image:url(\''
								+ '/private/img/sidebar-3.jpg'
								+ '\');">'
								+ '<div class="card-body">'
								+ '<h3 class="card-title">Ruta '
								+ v.ruta.numeroRuta
								+ '</h3>'
								+ '<div class="card-text">'
								
								+ '<button title="Ver Recorrido"class="btn btn-success btn-round btn-recorrido"'
								+ 'onclick="verRecorrido(\''
								+ v.ruta.recorrido.codigoMapa
								+ '\',event,this)">'
								+ '<i class="fas fa-eye text-light"></i>'
								+ ' Ver ' + 'Recorrido</button>';
						if (v.estado == "1") {
							html += '<button title="Suscrito"'
									+ 'class="btn btn-danger  btn-round btn-fab btn-suscribirse"'
									+ 'onclick="generarSuscripcion('
									+ v.ruta.rutaId
									+ ',event,this)">'
									+ '<i class="fas fa-heart fa-xs text-light"></i>'
									+ '<div class="ripple-container"></div>'
									+ '</button>';
						} else {
							html += '<button title="Suscribirse"'
									+ 'class="btn btn-danger  btn-round btn-fab btn-suscribirse"'
									+ 'onclick="generarSuscripcion('
									+ v.ruta.rutaId
									+ ',event,this)">'
									+ '<i class="far fa-heart fa-xs text-light"></i>'
									+ '<div class="ripple-container"></div>'
									+ '</button>';
						}
						html += '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
					});
	return html;

}
$('#modalConsultarPersonal').perfectScrollbar();