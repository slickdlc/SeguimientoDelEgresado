$('#hora').focus(function (e){
	$('#datetimepicker3').datetimepicker({
        format: 'LT',
        icons: {
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down",
        }
    });
});
$('#btnAgregar').click(function (e){
	var modalAlarma = $('#modalAlarma');
	modalAlarma.find('form').attr('action',"agregarAlarma");
	modalAlarma.find('.card-header .card-category').html($(this).attr('title'));
	modalAlarma.find('#btnGuardar').html("Guardar");
	
	$('#formAlarma').trigger("reset");
	var btnsDia=$('.btn-dia');
	for(var i=0;i<btnsDia.length;i++){
		$(btnsDia[i]).addClass("btn-default");
	}
	$('#btnCerrar').removeClass('btn-danger');
	$('#btnCerrar').addClass('btn-default');
	$('#btnCerrar').attr('click','');
	$('#btnCerrar').html("Cerrar");
	
	$('#alarmaId').val("0");
	$('#modalAlarma').modal('show');
});
$('.btn-dia').click(function (e){
	var btn=e.target;
	if($(btn).hasClass("btn-default")){
		$(btn).addClass("btn-primary");
		$(btn).removeClass("btn-default");
	}
	else{
		$(btn).removeClass("btn-primary");
		$(btn).addClass("btn-default");
	}
});
$(document).ready(function(e) {
	enviarPaginaAlarma(1);
});
$('#page-selection').bootpag({
	page : 1,
	leaps : true,
	firstLastUse : true,
	wrapClass : 'pagination',
	activeClass : 'active',
	disabledClass : 'disabled'
}).on("page", function(event, num) {
	enviarPaginaAlarma(num);
});
function enviarPaginaAlarma(pagina){
	$.ajax({
		url : "/user/alarma/alarmasJSON?pagina="+pagina,
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			//Para eliminar todos los setIntervals
			var interval_id =setInterval(function(){}, 5000);
			for (var i = 1; i < interval_id; i++)
			window.clearInterval(i);
			
			$("#content").html(renderizarDiv(dataResponse));
			$("#page-selection").bootpag({
				total : dataResponse.numeroPaginas,
				maxVisible : 5
			});
			$('#page-selection ul li a').addClass('page-link');
			$('#page-selection ul li').addClass("page-item");
			$('#page-selection ul li.next a').html("Siguiente");
			$('#page-selection ul li.prev a').html("Anterior");
		}
	});
}
function esperarAlarma(alarma){
	var today = new Date();
	var hora= toDate(alarma.hora,"h:m:s");

	if(today-hora>0){
		if(today-hora<1800000){
			esperarMicrobus(alarma);
		}
		else{
			setTimeout(function(){
				esperarMicrobus(alarma);	
			}, today-hora);
		}
	}
}

function esperarMicrobus(alarma){
	setInterval(function(){
		verificarCercaniaAjax(alarma,alarma.ruta);
	}, 5000);

}
function verificarCercaniaAjax(alarma,ruta){
	$.ajax({
		url : "/user/alarma/verificarCercania?alarmaId="+alarma.alarmaId+"&rutaId="+ruta.rutaId,
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			if(dataResponse!=null){
				alarmarAlUsuario(alarma,ruta,dataResponse);
			}
		}
	});
}
function alarmarAlUsuario(alarma,ruta,ubicacion){
	md.showNotification('bottom','left');
	$('.material-icons').html("");
	$('.material-icons').addClass("fas fa-times");
	$('.material-icons[data-notify="icon"]').removeClass("fa-times");
	$('.material-icons[data-notify="icon"]').addClass("fa-bell");
	$('span[data-notify="title"]').html("La ruta "+ruta.numeroRuta+" está cerca");
	$('span[data-notify="message"]').html(alarma.notaDeAlarma);
}
function renderizarDiv(dataResponse) {
	html = '';
	
	$.each(dataResponse.data,function(k,v) {
		var estado
		if(v.estado==1){
			estado ='checked';
			esperarAlarma(v);
		}
		else{
			estado='';
		}
		html+=
			'<div class="col-sm-12">'
				+'<div class="card btn btn-secondary my-1"title="Configurar Alarma" onclick="getAlarma('
					+ v.alarmaId
					+ ', event, this)">'
					+'<div class="card-body">'
						+'<div class="row">'
							+'<div class="col-sm-3 mr-auto text-left">'
								+'<h3 class="my-0">'
									+v.hora.substring(0,5)
								+'</h3>'
								+'<p3>'
									+'Ruta '+v.ruta.numeroRuta
								+'</p3>'
							+'</div>'
							+'<div class="col-sm-3 my-auto">'
								+'<div class="togglebutton "><label>'
								+'<input class="btnEstado" onchange="cambiarEstado('
									+ v.alarmaId
									+ ', event, this)"'
									+' type="checkbox" '+estado+'> <span class="toggle"></span>'
								+'</label></div>'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>'
			;
	});
	return html;

}
function getAlarma(id,e,element){
	if(e.target==$(element).find('span')[0]||e.target==$(element).find('input')[0]){
		return;
	}else{
		var btnsDia=$('.btn-dia');
		var modalAlarma = $('#modalAlarma');
		modalAlarma.find('form').attr('action',"modificarAlarma");
		modalAlarma.find('.card-header .card-category').html($(this).attr('title'));
		modalAlarma.find('#btnGuardar').html("Guardar");
		$.ajax({
			url : "getAlarma?id="+id,
			type : "POST",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataResponse) {
				$('#hora').val(dataResponse.hora.substring(0,5));
				$('#notificacionAlEmail').prop('checked',dataResponse.notificacionAlEmail==1? true:false);
				$('#notaDeAlarma').val(dataResponse.notaDeAlarma);
				$('#selectRuta').val(dataResponse.ruta.rutaId);
				$('#selectRuta').change();
				$('#alarmaId').val(dataResponse.alarmaId);
				$.each(dataResponse.alarmadias, function( index, value ) {
					$(btnsDia[value.dia.diaId-1]).removeClass(value.estado==0? "btn-primary":"btn-default");
					$(btnsDia[value.dia.diaId-1]).addClass(value.estado==1? "btn-primary":"btn-default");
				});
				$('#btnCerrar').removeClass('btn-default');
				$('#btnCerrar').addClass('btn-danger');
				$('#btnCerrar').attr('onclick','eliminarAlarma('+dataResponse.alarmaId+')');
				$('#btnCerrar').html("Eliminar");
				$(modalAlarma).modal('show');
			}
		});
	}

}

$('#btnGuardar').click(function (e){
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position){
			var frm=$('#formAlarma');
			var btnsDia=$('.btn-dia');
		
			
			
			var enviarAlarma={
					alarmaId:$('#alarmaId').val(),
					hora:toDate($('#hora').val(),"h:m"),
					notificacionAlEmail:($('#notificacionAlEmail').prop('checked')? 1:0),
					notaDeAlarma:$('#notaDeAlarma').val(),
					alarmadias:[],
					ruta:{
						rutaId:$('#selectRuta').val()
					}
				};
			enviarAlarma.latitud=position.coords.latitude;
			enviarAlarma.longitud=position.coords.longitude;
			
			for(var i=0;i<btnsDia.length;i++){
				enviarAlarma.alarmadias.push({
					dia:{
						diaId:$(btnsDia[i]).attr("value"),
					},
					estado:$(btnsDia[i]).hasClass("btn-primary")? "1":"0"
				});
			}
			$.ajax({
				url :  frm.attr("action"),
				data : JSON.stringify(enviarAlarma),
				type : "POST",
				dataType : 'json',
				contentType : 'application/json',
				success : function(dataResponse) {
					$('#formAlarma').trigger("reset");
					for(var i=0;i<btnsDia.length;i++){
						$(btnsDia[i]).addClass("btn-default");
					}
					$('#modalAlarma').modal("hide");
					enviarPaginaAlarma(1);
				}
			});
		});
	} else {
	  alert('Lo sentimos, tu navegador no soporta geolocation');
	  return;
	}
});
function toDate(dStr,format) {
	var now = new Date();
	if (format == "h:m") {
		

 		now.setHours(dStr.split(":")[0]);
 		if(dStr.split(" ")[1]=="PM"&& dStr.split(":")[0]!="12"){
 			now.setHours(now.getHours()+(12));
		}
 		if(dStr.split(" ")[1]=="AM"&& dStr.split(":")[0]=="12"){
 			now.setHours(now.getHours()-(12));
 		}
 		now.setMinutes(dStr.split(":")[1].split(" ")[0]);
 		now.setSeconds(0);
 		return now;
	}else{
		if(format=="h:m:s"){
			now.setHours(dStr.split(":")[0]);
	 		now.setMinutes(dStr.split(":")[1]);
	 		now.setSeconds(dStr.split(":")[2]);
	 		return now;
		}else
			return "Invalid Format";
	}
}
function cambiarEstado(id,e,element){
	$.ajax({
		url :  "cambiarEstado?id="+id,
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : 
			setTimeout(function(){
				enviarPaginaAlarma(1);
			}, 100)
			
	});
}
function eliminarAlarma(id){
	$.ajax({
		url :  "eliminarAlarma?alarmaId="+id,
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : 
			setTimeout(function(){
				enviarPaginaAlarma(1);
			}, 100)
	});
	$('#modalAlarma').modal("hide");
}
$('#modalAlarma').perfectScrollbar();