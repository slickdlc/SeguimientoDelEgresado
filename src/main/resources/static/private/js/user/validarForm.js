$('#btnSubmit').click(function (e){
	var validado=true;
	var form=$('#btnSubmit').parent();
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
	return validado;
});




function validar(input){
	if($(input).val().trim()==""){
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