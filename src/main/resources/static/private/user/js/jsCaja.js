$('#cajaLink').click(function(e){
	
	e.preventDefault();
	$('#modalAbrirCaja').modal("show");
	$('#formCaja').trigger("reset");
	if($('#btnEnviarCaja').text()=="Cerrar Caja"){
		$.ajax({
			url : "/admin/caja/getCaja",
			type : "POST",
			success : function(jsonResponse) {
				jsonResponse= " "+jsonResponse;
				if(jsonResponse.split(".")[1]==undefined)
					$('#saldoActual').val(jsonResponse+".00");
				else if(parseInt(jsonResponse.split(".")[1])%5==0)
					$('#saldoActual').val(jsonResponse.split(".")[0]+'.'+jsonResponse.split(".")[1]);
				else
					$('#saldoActual').val(jsonResponse+"0");
			}
		});
	}
});
$('#btnEnviarCaja').click(function(e){
	frm=$('#formCaja');
	frm.validate({
		submitHandler : function(form) {
			var url;
			var caja;
			if($('#btnEnviarCaja').text()=="Abrir Caja"){
				$(frm).attr("action","caja/abrirCaja");
				caja={
						saldoInicial:$('#saldoInicial').val(),
				};
			}else{
				$(frm).attr("action","caja/cerrarCaja");
				caja=$('#idCaja').val();
			}
			$.ajax({
				url : $(frm).attr("action"),
				data : JSON.stringify(caja),
				type : "POST",
				dataType : 'json',
				contentType : 'application/json',
				success : function(dataResponse) {
					if (jsonToDivError(dataResponse,
							'#divMessageCaja', "")) {
						location.reload();
					}
				}
			});
			e.preventDefault();
		}
	});
});