function validarRegistro(btn){
	var validado=true;
	var form=$(btn).parent().parent();
	var inputs=$(form).find('input');
	for(var i=0; i<inputs.length;i++){
		if(validar(inputs[i])){
			showAlert(inputs[i]);
			validado=false;
		}
	}
	$(inputs).each(function(){
	    $(this).focus(function(){
	       hideAlert(this);
	    });
	});
	if(validado){
		validado=igualarPasswords();
	}
	return validado;
}

function igualarPasswords(){
	if($('#inputPassword').val()!=$('#pass2').val()){
		showAlert($('#pass2'));
		return false;
	}
	
}


function validar(input){
	 if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
         if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
             return true;
         }
     }else if($(input).val().trim()==""){
		return true;
	}
}
function showAlert(input){
	 var thisAlert = $(input).parent();
     $(thisAlert).addClass('alert-validate');
}
function hideAlert(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}