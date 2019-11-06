$(document).ready(function (e){
	$.ajax({
		url:"/admin/viaje/getViaje",
		type:"POST",
		success : function(dataResponse) {
			if(dataResponse.estado!=false){
				iniciarEnvio();
			}
		}
	});
});
var idEnvio;
function iniciarEnvio(){
	$('#btnGuardar').text("Cancelar");
	$('#btnGuardar').removeClass("btn-primary");
	$('#btnGuardar').addClass("btn-danger");
	if (navigator.geolocation) {
		enviarUbicacion;
		idEnvio=setInterval(enviarUbicacion,5000);
	} else {
	  alert('Lo sentimos, tu navegador no soporta geolocation');
	}
}
function cancelarViaje(){
	var path = $(location).attr("href");
	$.ajax({
		url : "/admin/viaje/cancelarViaje",
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			clearInterval(idEnvio);
			$('#btnGuardar').text("Iniciar");
			$('#btnGuardar').removeClass("btn-danger");
			$('#btnGuardar').addClass("btn-primary");
//			if (jsonToDivError(dataResponse, '#modalViaje #divMessage', path)) {
//			}
		}
	});
}
function enviarUbicacion(){
	navigator.geolocation.getCurrentPosition(function (position){
		
		var latitud=position.coords.latitude;
		var longitud=position.coords.longitude;
		
		var ubicacion={
					longitud:longitud,
					latitud:latitud
		};
		$.ajax({
			url :"/admin/viaje/generarUbicacion",
			data : JSON.stringify(ubicacion),
			type : "POST",
			dataType : 'json',
			contentType : 'application/json',
			success : function(dataResponse) {

			}
		});
		
	});
}



$('#btnIniciarViaje').click(function(e){
	e.preventDefault();
	
	var path = $(location).attr("href");
	
	var modalViaje = $('#modalViaje');
	
	modalViaje.find('form').attr('action', path + "agregarViaje");
	modalViaje.find('.card-header .card-category').html($(this).attr('title'));
	modalViaje.modal('show');
});

$('#btnGuardar').click(function(e) {
	if($(this).text()=="Iniciar"){
	var path = $("#path").val();
	var frm = $('#modalViaje form');
	
	var microbusId=$('#microbus').val();
	var personal1Id=$('#conductor').val();
	var personal2Id=$('#cobrador').val();

	var dataResponse = validateForm('.modal-body input[type="text"][data-req]');
	if (dataResponse.estado === false) {
        jsonToDivError(dataResponse, '#modalViaje #divMessage');
        return;
    }

	$.ajax({
		url : frm.attr("action")+'?personal1Id='+personal1Id
		+'&personal2Id='+personal2Id+'&microbusId='+microbusId,
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			if(dataResponse.estado==true)
			iniciarEnvio();
			if (jsonToDivError(dataResponse, '#modalViaje #divMessage', path)) {
			}
		}
	});
	}
	else if($(this).text()=="Cancelar"){
		cancelarViaje();
	}
	else{
		return false;
	}
	e.preventDefault();
});
