	$(document).ready(function (e){
	$.ajax({

		url : "getModificacionRutas",
		type : "POST",
		dataType : 'json',
		contentType : 'application/json',
		success : function(dataResponse) {
			renderizarFeed(dataResponse);
		}
	});
});

function renderizarFeed(data){
	
	contentHTML='';
	
	$.each(data,
			function(k, v) {
		
		var color=Math.floor(Math.random()*(4-1))+parseInt(1);
		switch (color) {
		  case 1:
			  color="primary";
		    break;
		  case 2:
			  color="info";
		    break;
		  case 3:
			  color="success";
		    break;
		  case 4:
			  color="warning";
			break;
		}
		var imagen="";
		if(v.ruta.imagen!=null){
			imagen=v.ruta.imagen;
		}
		contentHTML+=''
		+'<div class="row">'
		+'	<div class="col-sm-12">'
		+'		<div class="card bg-'+color+'">'
		+'			<div class="card-body">'
		+'				<h5 class="card-category card-category-social">'
		+'					<i class="fas fa-bus"></i> IsawU'
		+'				</h5>'
		+'				<h4 class="card-title">'
		+'					<p>'
		+'						'+v.mensaje+''
		+'					</ap>'
		+'				</h4>'
		+'				<div class="card-stats">'
		+'					<div class="author">'
		+'						<a href="#"> <img src="'+imagen+'" class="avatar img-raised"> <span>Ruta '+v.ruta.numeroRuta+'</span>'
		+'						</a>'
		+'					</div>'
		+'				</div>'
		+'			</div>'
		+'		</div>'
		+'	</div>'
		+'</div>'
	});
	$('#contentFeed').html(contentHTML);
}
