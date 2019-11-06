function jsonToDivError(json, divSelector, pathContext) {

    if (typeof pathContext === "undefined") {
        pathContext = '';
    }

    $(divSelector).html('');
    $(divSelector).removeAttr('style');
    var htmlDiv;
  
    if (json.estado) {
        //htmlDiv = '<div class="alert alert-success" style="margin-top: 15px;margin-bottom: 0px;"> <img src="' + pathContext + '/assets/admin/images/success.gif" width="15" /> ' + json.mensajesRepuesta[0] + '</div>';
        htmlDiv = '<div class="alert alert-success alert-dismissible w-100" role="alert"> '
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span> '
            + '</button> '
            + '<strong>' + json.mensajesRepuesta[0] + '</strong> '
            + '</div>';
        $(divSelector).html(htmlDiv);
        setTimeout(function() {
            $(divSelector).fadeOut();
        }, 6500);
      
        return true;
    } else {
    	htmlDiv = '<div class="alert alert-danger alert-dismissible w-100" role="alert"> '
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span> '
            + '</button> '
            + '<strong>' + json.mensajesRepuesta[0] + '</strong> '
            + '</div>';
        $(divSelector).html(htmlDiv);
        setTimeout(function() {
            $(divSelector).fadeOut();
        }, 6500);
        return false;
    }
}

function validateForm(selector) {

    var divsFrm = $(selector).parent();
    var elementFrm = $(selector);

    var dataResponse = new Object();
    dataResponse.estado = true;
    dataResponse.mensajesRepuesta = new Array();

    for (var i = 0; i <= divsFrm.length - 1; ++i) {

        var classTexto = $(divsFrm[i]).attr('class');
        classTexto = classTexto.replace(/ f_error/g, '');

        var isError = false;
        var tagNameElement = $(elementFrm[i]).prop("tagName").toLowerCase();

        if (tagNameElement === 'input') {
            if ($(elementFrm[i]).val().replace(/\s/g, '').length === 0) {
                isError = true;
            } else {
                isError = false;
            }
        }

        if (tagNameElement === 'select') {
            if ($(elementFrm[i]).val() === '-1') {
                isError = true;
            } else {
                isError = false;
            }
        }

        if (isError) {
            $(divsFrm[i]).attr('class', classTexto + ' f_error');
            dataResponse.estado = false;
        } else {
            $(divsFrm[i]).attr('class', classTexto);
        }
    }

    if (dataResponse.estado === false) {
        dataResponse.mensajesRepuesta.push('Complete campos requeridos.');
    }

    return dataResponse;
}